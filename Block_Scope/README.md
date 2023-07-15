# Block Scope

- 스코프 (Scope) : 범위, 유효공간, 살수있는공간, 허용공간, 허용범위...
- 함수 스코프(Function Scope) : 함수에 의해서 생기는 범위

- ES5 까지는 함수에 의해서만 범위가 생겼다.
    - 뭐의 범위? -> 변수의 유효범위
    - 즉 변수의 유효범위가 함수에 의해서만 생길 수 있었다.

```js
(function () {
    var a = 10;
    (function (){
        var a = 20;
        console.log(a); // 20
    })();
    console.log(a); // 10
})()
console.log(a); // ReferenceError: a is not defined
```

- 하지만 ES6 부터 블락스코프(Block Scope) 가 생겼다.
    - 블락({})에 의해 생기는 유효범위가 결정된다.

```js
{
    let a = 10;
    {
        let a= 20;
        console.log(a); //20
    }
    console.log(a); // 10
}
console.log(a); // ReferenceError: a is not defined
```

- var 로 선언한 변수는 블록스코프에 영향을 받지않으며 블록스코프에 영향을 받으려면 let, const를 사용 해야한다.

### Hoisting
- hoisting은 블록스코프에 영향을 받을까?

- if, for, while, switch -> 문단
    - 문단은 결과를 리턴하지 않는다.
    - 따라서 문 자체는 하나의 블록 스코프가 된다.
- 값이 될 수 있는 경우 -> 식
- 값

```js
if (true) {
    let a = 10
    if (true) {
      console.log(a) // ReferenceError
      const a = 20
    }
    console.log(a)
  }
  console.log(a)
```

위의 코드를 실행하면 ReferenceError 가 발생한다. 그 이유는 TDZ 라는게 있는데 TDZ를 설명하면 다음과 같다.
TDZ: Temporal Dead Zone (임시 사망 지역, 임시 사각 지대)
TDZ는 Ecamascript에서 정의한 개념은 아니다.
이 구간에서는 레퍼런스 에러가 발생하는 것의 명칭을 정의 해놓지 않아 개발자들이 TDZ라고 부르게 됐다.

TDZ는 let이나 const에 대해서 해당 변수를 선언한 위치에 오기 전 까지는 해당 변수를 호출 할 수 없다는 개념이다.
다시 호이스팅의 개념부터 보면

- 호이스팅
    - 기존 var 였을 때: 변수명만 위로 끌어 올리고 undefind를 할당한다.
    - let, const : 변수명만 위로 끌어 올리고 끝. -> 레퍼런스 에러

따라서 블록스코프 일 때도 호이스팅은 하고 있다.
다만 tdz 라는게 있어서 레퍼런스 에러를 띄워 준다.

### this

```js
var value = 0
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2;
    (function () {
      this.value = 3
    })();
  }
}
obj.setValue()
console.log(value) // 3
console.log(obj.value) //2
```

위의 코드를 보면 생각 하던 방식과 다르게 동작 하는 것을 볼 수 있다.
왜냐 하면 javascript 에서는 메서드 혹은 함수가 호출 될 때 현재 호출하는 메서드를 보유한 객체가 this로 연결된다.
현재 호출중인 메서드를 보유한 객체가 없다면 전역객체가 연결된다.

따라서 위의 코드에서 첫번째 this를 가지고 있는 함수는 obj에서 보유하고 있으므로 해당 this는 obj를 가리키지만
두번째 this는 보유한 객체가 없기 때문에 전역(window) 객체를 가리키기 때문이다.

위의 this를 원하는 방식으로 실행하는 방법은 여러가지가 있다.

1. 변수에 this를 할당하여 사용하는 방법
```js
var value = 0
var obj = {
  value: 1,
  setValue: function () {
    var self = this
    this.value = 2;
    (function () {
      this.value = 3
    })();
  }
}
obj.setValue()
console.log(value) // 0
console.log(obj.value) //3
```

2. call을 사용하는 방법
```js
var value = 0
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2;
    (function () {
      this.value = 3
    }).call(this);
  }
}
obj.setValue()
console.log(value) // 0
console.log(obj.value) //3
```

3. apply를 사용하는 방법
```js
var value = 0
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2;
    (function () {
      this.value = 3
    }).apply(this);
  }
}
obj.setValue()
console.log(value) // 0
console.log(obj.value) //3
```
4. bind를 사용하는 방법
```js
var value = 0
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2;
    (function () {
      this.value = 3
    }).bind(this)();
  }
}
obj.setValue()
console.log(value) // 0
console.log(obj.value) //3
```

- call, bind, apply 차이점 
    - call, apply 는 둘다 함수를 실행하는 함수이다.
    - call 과 apply의 차이점은 두번째 인자를 배열로 넣어주는지의 차이가 있다.
    - bind는 call과 apply 와 다르게 함수를 실행하지 않고 bound 함수를 리턴한다.