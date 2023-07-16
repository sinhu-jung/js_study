# Block Scoped Variables

## 반복문 내에서의 함수 실행

```js
var funcs = []
for (var i = 0; i < 10; i++) {
  funcs.push(function () {
    console.log(i)
  })
}
funcs.forEach(function (f) {
  f()
})
```
위의 코드를 실행하면 10이 10번이 나온다.
이유는 다음과 같다
1. funcs 배열에 함수가 10개가 들어간다.
2. for문을 다 돌고 난뒤 forEach를 돌 때 배열이 실행 된다.
3. 배열이 실행 될 때의 i 값을 찾아 보면 전역 변수로 선언 된 i 는 10이다.
4. 따라서 10이 10번 출력 된다.

위와 같은 코드를 예상할 수 있도록 실행 하는 방법은 2가지가 있다.
- 즉시실행 함수로 만든 상태에서 i의 값을 넘긴뒤 클로저로 함수를 리턴하여 값을 가지고 있는 방법
```js
var funcs = []
for (var i = 0; i < 10; i++) {
  funcs.push((function (v) {
    return function () {
      console.log(v)
    }
  })(i))
}
funcs.forEach(function (f) {
  f()
})
```

- 변수를 let으로 선언
```js
let funcs = []
for (let i = 0; i < 10; i++) {
  funcs.push(function () {
	  console.log(i)
  })
}
funcs.forEach(function (f) {
  f()
})
```

첫번 째 방법으로는 클로저를 이용하기 때문에 메모리를 지속적으로 잡아 먹을 수 밖에 없다.
그렇기 때문에 ES6에서 나온 블록스코프 개념이 이를 해결 해준다.

## const

const (constant variables) : 상수 변수?
- 프로그래밍 언어에서는 변수를 선언한 뒤 부터 상수이다.
상수는 선언과 동시에 값을 할당하고 재할당은 안된다.

- 참조 타입 데이터일 경우
```js
const OBJ = {
  prop1 : 1,
  prop2 : 2
}
OBJ.prop1 = 3
console.log(OBJ.prop1)
```
위의 코드에서 OBJ 는 변경이 안되지만 OBJ.prop1 은 변경이 된다.
이는 OBJ에 접근한게 아니라 OBJ 안에 있는 prop1 이라는 property 에 접근 한 것이다.
해당 프로퍼티들은 OBJ 에 저장된게 아니라 다른 공간에 저장 돼 있다.

const 로 선언된 객채의 내부에 있는 데이터도 상수로 만들고 싶을 때는 
Object.freeze, Object.defineProperty를 사용하면 된다.

- Object.freeze
```js
const OBJ = {
    prop1 : 1
};
Object.freeze(OBJ);
OBJ.prop1 = 5;
console.log(OBJ); // {prop1:1}
```
freeze 를 이용하여 상수로 바꾼뒤 값을 변경해보면 에러가 안 나오는 것을 볼 수 있다.
freeze는 es5에서 나와서 에러가 친절하지 않아 에러를 발생 시키지 않고 그냥 넘어가기 때문이다.

freeze 의 문제는 이것 뿐만이 아니라
OBJ 내부에 prop2 = [1 , 2, 3];
을 선언하면 prop2는 직접적으로 바꿀 수 없지만 내부 배열은 참조하고 있기 때문에
내부 배열에 또 freeze 를 사용해야 한다.
이것을 DeepFreezing 이라고 부른다.

- 얕은복사: 객체의 프로퍼티들을 복사(depth 1단계 까지만)
- 깊은복사: 객체의 프로퍼티들을 복사(모든 depth)
  1. 프로퍼티들을 복사한다.
  2. 프로퍼티들 중에 참조형이 있으면 1번 반복 --> 재귀

깊은복사를 해야만 immutable 하다 

### for문 내에서 const 선언
```js
var obj = {
    prop1: 1,
    prop2: 2,
    prop3: 3
  }
  for (const prop in obj) {
    console.log(prop)
  }
```
위의 코드를 실행 시키면 에러 없이 동작을 하는 것을 볼 수 있다.
for in 문 쪽을 코드로 변경해보면 아래와 같이 동작 하기 때문이다.
```js
{
    let keys = Object.keys(obj);
    for(let i = 0; i < keys.length; i++) {
        const prop = obj[keys[i]];
        console.log(prop);
    }
}
```

하지만 for in 문이 아니라 그냥 for 문은 동작하지 않는다.
```js
  for (const i = 0; i < 5; i++) {
    console.log(i)
  }
```
이는 i 는 객체가 아니라 number 상수로 선언되기 때문이다.

### let과 const의 공통사항
1. 유효범위가 존재한다.
  - 블록스코프
2. 재선언
  ```js
  let b = 2
  let b = 3
  console.log(b)

  const c = 4
  const c = 5
  console.log(c)
  ```
  - 이전에 정의한 변수명이 있으면 에러를 발생 시킨다.
3. 초기화 되기 전에 호출하면 에러 발생
4. TDZ
5. 전역 객체의 프로퍼티
  - let과 const 를 사용시 전역 객체의 공간과 변수가 분리 됐다.
  -> var를 사용하지 말것