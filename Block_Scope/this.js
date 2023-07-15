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

console.log('-------- set ---------');

var value = 0
var obj = {
  value: 1,
  setValue: function () {
    var self = this
    self.value = 2;
    (function () {
      self.value = 3
    })()
  }
}
obj.setValue()
console.log(value)
console.log(obj.value)

console.log('-------- call ---------');

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

console.log('-------- apply ---------');

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

console.log('-------- bind ---------');

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

console.log('-------- block scope ---------');

var value = 0
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2;
    {
      this.value = 3
    }
  }
}
obj.setValue()
console.log(value) // 0
console.log(obj.value) //3