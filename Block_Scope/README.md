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
