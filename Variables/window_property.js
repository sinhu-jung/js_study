var a = 10
console.log(window.a)
console.log(a)
delete a
console.log(window.a)
console.log(a)

window.b = 20
console.log(window.b)
console.log(b)
delete b
console.log(window.b)
console.log(b)

let c = 30
console.log(window.c)
console.log(c)
delete c
console.log(window.c)
console.log(c)

const d = 40
console.log(window.d)
console.log(d)
delete d
console.log(window.d)
console.log(d)