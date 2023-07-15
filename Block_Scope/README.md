# Block Scope

- 스코프 (Scope) : 범위, 유효공간, 살수있는공간, 허용공간, 허용범위...
- 함수 스코프(Function Scope) : 함수에 의해서 생기는 범위

- ES5 까지는 함수에 의해서만 범위가 생겼다.
    - 뭐의 범위? -> 변수의 유효범위
    - 즉 변수의 유효범위가 함수에 의해서만 생길 수 있었다.

```
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

```
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

```
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
