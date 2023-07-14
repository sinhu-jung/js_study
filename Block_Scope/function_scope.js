(function () {
    var a = 10;
    (function (){
        var a = 20;
        console.log(a); // 20
    })();
    console.log(a); // 10
})()
console.log(a); // ReferenceError: a is not defined