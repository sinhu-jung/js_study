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