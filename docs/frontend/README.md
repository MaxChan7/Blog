# JS

## 内置类型

JS中内置的类型有两种：**基本类型**和**引用类型**。

- 基本类型：`Undefined`、`null`、`Boolean`、`Number`、`String`和`symbol`。这6种基本数据类型是按值访问的，因为可以操作保存在变量中的实际值。
- 引用类型：`Object`。引用类型的值的值是保存在内存中的对象。而Js是不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。操作对象时，实际上是操作对象的引用而非实际对象。

### 动态的属性

只能给引用类型值动态地添加属性。

```js
// 引用类型
var person = new Object();
person.name = "Max";
console.log(person.name);    // "Max"

// 基本类型
var name = "Max";
name.age = 27;
console.log(name.age);      // Undefined 
```

### 复制变量值

从一个变量向另一个变量复制基本类型值和引用类型值时，也存在不同。

- 首先我们来看基本类型值的情况，在下面的例子里，num1保存的值是5，用num1的值初始化num2时，num2也保存了值5，但是num2中的5跟num1中的5是完全独立的，该值只是num1中5的一个副本。此后，两个变量参与任何操作都不会相互影响。

```js
var num1 = 5;
var num2 = num1;
```

- 接着我们来看引用类型值的情况，从下面例子我们可以看出，如果用obj1去初始化obj2的时候，修改obj1的属性时，同样会影响到obj2。
首先，obj1保存了一个对象实例，然后用obj1的值赋给obj2时，其实这里跟基本类型值一样也会复制一个副本分配到空间中，但是不同的是，这个值的副本实际上是一个指针，指向存储在堆中的一个对象。复制操作结束后，两个变量实际上引用的是同一个对象。因此改变一个变量，就会影响另一个变量。

```js
var obj1 = new Object();
var obj2 = obj1;
obj1.name = "Max";
console.log(obj2.name);    // "Max"
```

## 类型转换

### 转Boolean

在条件判断时，除了以下7个falsy值：`undefined`、`null`、`false`、`NaN`、`''`、`0`和`-0`以外，其他所有值都转为`true`，包括所有对象。

### 对象转基本类型

对象在转换基本类型时，首先会调用`valueOf`然后调用`toString`。并且这两个方法你是可以重写的。

```js
let a = {
  valueOf() {
    return 0
  }
};
```

当然你也可以重写`Symbol.toPrimitive`，该方法在转基本类型时调用优先级最高。

```js
let a = {
  valueOf() {
    return 0;
  },
  toString() {
    return '1';
  },
  [Symbol.toPrimitive]() {
    return 2;
  }
}
1 + a // 3
'1' + a // '12'
```

### 四则运算符

- 遇到`-` 、`*` 、`/` 和 `%`这四个运算符的时候，会在运算之前将参与运算的双方转换成数字。

- 只有遇到`+`时，其中一方是字符串类型，就会把另一个也转为字符串类型。其他运算只要其中一方是数字，那么另一方就转为数字。并且加法运算会触发三种类型转换：将值转换为原始值，转换为数字，转换为字符串。

```js
1 + '1' // '11'
2 * '2' // 4
[1, 2] + [2, 1] // '1,22,1'
// [1, 2].toString() -> '1,2'
// [2, 1].toString() -> '2,1'
// '1,2' + '2,1' = '1,22,1'
```

对于加号需要注意这个表达式 `'a' + + 'b'`

```js
'a' + + 'b' // "aNaN"
// 因为 + 'b' -> NaN
// 你也许在一些代码中看到过 + '1' -> 1
```

### `==`操作符

![==操作符](../.vuepress/assets/img/frontend/==.jpg)

上图中的`toPrimitive`就是对象转基本类型。

这里来解析一道题目`[] == ![] // -> true`，下面是这个表达式为何为`true`的步骤

```js
// [] 转成 true，然后取反变成 false
[] == false
// 根据第 8 条得出
[] == ToNumber(false)
[] == 0
// 根据第 10 条得出
ToPrimitive([]) == 0
// [].toString() -> ''
'' == 0
// 根据第 6 条得出
0 == 0 // -> true
```

### 比较运算符

1. 如果是对象，就通过`toPrimitive`转换对象
2. 如果是字符串，就通过`unicode`字符索引来比较

## typeof 和 instanceof

### typeof

`typeof`几乎不可能得到它们想要的结果。`typeof`只有一个实际应用场景，就是用来检测一个对象是否已经定义或者是否已经赋值。而这个应用却不是来检查对象的类型。

`typeof`对于基本类型，除了`null`都可以显示正确的类型（历史遗留[bug](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#null)）

```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b 没有声明，但是还会显示 undefined
typeof null // 'object'
```

`typeof`对于对象，除了函数都会显示`object`

```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

所以我们发现`typeof`判断数据类型并不准确，所以我们想获得一个变量的正确类型，我们需要利用`Object.prototype.toString.call()`方法来判断数据类型，通过该方法，我们可以获得类似`[Object, Type]`这样的字符串。

```js
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call('hi') // "[object String]"
Object.prototype.toString.call({a:'hi'}) // "[object Object]"
Object.prototype.toString.call([1,'a']) // "[object Array]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(() => {}) // "[object Function]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
```

### instanceof

`instanceof`可以用来判断某个构造函数的`prototype`属性是否存在于要检测对象的`原型链`上。

```js
// 定义构造函数
function C(){} 
function D(){} 

var o = new C();

o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype

o instanceof D; // false，因为 D.prototype不在o的原型链上

o instanceof Object; // true,因为Object.prototype.isPrototypeOf(o)返回true
C.prototype instanceof Object // true,同上

C.prototype = {};
var o2 = new C();

o2 instanceof C; // true

o instanceof C; // false,C.prototype指向了一个空对象,这个空对象不在o的原型链上.

D.prototype = new C(); // 继承
var o3 = new D();
o3 instanceof D; // true
o3 instanceof C; // true 因为C.prototype现在在o3的原型链上
```

需要注意的是，如果表达式 `obj instanceof Foo` 返回`true`，则并不意味着该表达式会永远返回`true`，因为`Foo.prototype`属性的值有可能会改变，改变之后的值很有可能不存在于obj的原型链上，这时原表达式的值就会成为`false`。另外一种情况下，原表达式的值也会改变，就是改变对象obj的原型链的情况，虽然在目前的ES规范中，我们只能读取对象的原型而不能改变它，但借助于非标准的`__proto__`伪属性，是可以实现的。比如执行`obj.__proto__ = {}`之后，`obj instanceof Foo`就会返回`false`了。