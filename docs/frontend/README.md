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

## 变量提升

JS中，函数及变量的声明都将被提升到函数的最顶部。变量可以在使用后声明，也就是变量可以先使用再声明。

```js
a = "hello"; // 变量 a 设置为 "hello"
console.log(a); // "hello"
sayHi(); // "say hi"

// 以下声明都会提升
var a; // 声明 a
function sayHi() {
  console.log("say hi");
}
```

**JavaScript 仅提升声明，而不提升初始化**。如果你先使用的变量，再声明并初始化它，变量的值将是 undefined。

```js
var x = 1;                 // 声明 + 初始化 x
console.log(x + " " + y);  // '1 undefined'
var y = 2;                 // 声明 + 初始化 y


//上面的代码和下面的代码是一样的 
var x = 1;                 // 声明 + 初始化 x
var y;                     //声明 y
console.log(x + " " + y);  //y 是未定义的
y = 2;                     // 初始化  y 
```

需要注意的是严格模式(strict mode)不允许使用未声明的变量，所以养成良好的习惯，**在头部声明你的变量**。

## 闭包

`闭包`是函数和声明该函数的词法环境的组合。**这个环境包含了这个闭包创建时所能访问的所有局部变量**。

例如函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。

```js
function A() {
  let a = 1;
  function B() {
    console.log(a);
  };
  return B;
};
```

经典面试题，循环中使用闭包解决 `var` 定义函数的问题。

```js
for ( var i = 1; i <= 5; i++) {
	setTimeout(function timer() {
		console.log(i);
	}, i*1000);
}
```

首先因为 `setTimeout` 是个异步函数，所有会先把循环全部执行完毕，这时候 `i` 就是 6 了，所以会输出一堆 6。

解决办法两种，第一种使用`闭包`:

```js
for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

第二种就是使用 `setTimeout` 的**第三个参数**:

```js
for (var i = 1; i <= 5; i++) {
	setTimeout(function timer(j) {
		console.log(j);
	}, i*1000, i);
}
```

第三种就是使用 `let` 定义 `i` 了:

```js
for (let i = 1; i <= 5; i++) {
	setTimeout(function timer() {
		console.log(i);
	}, i*1000 );
}
```

下面是一个更有意思的示例 — `makeAdder` 函数：

```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

在这个示例中，我们定义了 `makeAdder(x)` 函数，它接受一个参数 `x` ，并返回一个新的函数。返回的函数接受一个参数 `y`，并返回`x+y`的值。

从本质上讲，`makeAdder` 是一个函数工厂 — 他创建了将指定的值和它的参数相加求和的函数。在上面的示例中，我们使用函数工厂创建了两个新函数 — 一个将其参数和 5 求和，另一个和 10 求和。

`add5` 和 `add10` 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。在 `add5` 的环境中，`x` 为 5。而在 `add10` 中，`x` 则为 10。

这也是经典面试题实现 `add(2)(5) // => 7`的实现方法。

## 原型和原型链

### 理解原型对象
无论什么时候，只要创建一个新函数，就会根据一组特定的规则为该函数创建一个`prototype`属性，这个属性指向函数的的原型对象。默认情况下，所有原型对象都会自动获得一个`constructor`（构造函数）属性，这个属性包含一个指向prototype属性所在函数的指针。

实例无法访问到`[[Prototype]]`，但可以通过isPrototypeOf()方法可以去确定对象之间是否存在这种关系。从本质上说，如果`[[Prototype]]`指向调用`isPrototypeOf()`方法的对象(`Person.prototype`),那么这个方法返回true,如下：
```js
alert(Person.prototype.isPrototype(person1)); //true
alert(Person.prototype.isPrototype(person2)); //true
```

每当代码读取某个对象的属性时，都会执行一次搜索，目标是具有给定名字的属性。搜索首先从对象实例本身开始。如果所在实例中找到了具有给定名字的属性，则返回该属性的值；如果没有找到，则据需搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。如果在原型对象中找到了这个属性，则返回该属性的值。

虽然可以通过实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。如果我们在实例中添加一个属性，而该属性与实例原型中的一个属性同名，那我们就在实例中创建该属性，该属性将会屏蔽原型中的那个属性。如下：
```js
function Person(){}

Person.prototype.name = "Max";
Person.prototype.age = 26;
Person.prototype.job = "Web Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

person1.name = "Greg";
alert(person1.name);   //"Greg"  ----来自实例
alert(person2.name);   //"Max"  ----来自原型
```

`delete`操作符可以删除实例中的属性，删除之后，就恢复对原型中该属性的链接。

`hasOwnPrototype()`方法可以检测一个属性是是否存在于实例中。

```js
function Person(){}

Person.prototype.name = "Max";
Person.prototype.age = 26;
Person.prototype.job = "Web Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

alert(person1.hasOwnPrototype("name"));   //false

person1.name = "Greg";
alert(person1.name);   //"Greg"  ----来自实例
alert(person1.hasOwnPrototype("name"));   //true
```

### 原型与in操作符
有两种方式使用in操作符：单独使用和在`for-in`循环中使用。
- 在单独使用时，`in`操作符会在通过对象能够访问给定属性时返回true,无论该属性存在于实例中还是原型中。
- 在使用`for-in`循环时，返回的是所有能够通过对象访问的、可枚举(`enumerated`)属性，其中包括存在于实例中的属性，也包括存在于原型中的属性。屏蔽了原型中不可枚举属性(即将`[[Enumerable]]`标记为false的属性)的实例属性也会在for-in循环中返回，因为根据规定，所有开发人员定义的属性都是可枚举的----只有在IE8及更早版本例外。

要取得对象上所有可枚举的实例属性，可以使用ECMAScript 5的`Object.keys()`方法。这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组：
```js
function Person(){}

Person.prototype.name = "Max";
Person.prototype.age = 26;
Person.prototype.job = "Web Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var keys = Object.keys(Person.prototype);
alert(keys);    //"name,age,job,sayName"

var p1 = new Person();
p1.name = "Rob";
p1.age = "31";
var p1keys = Object.keys(p1);
alert(pikeys);    //"name,age"
```

如果你想要得到所有实例属性，无论它是否可枚举，可以使用`Object.getOwnPropertyNames()`方法。
```js
var keys = Object.getOwnPropertyNames(Person.prototype);
alert(keys);    //"constructor,name,age.job,sayName"
```
这两个方法都可以用来代替for-in循环。

### 更简单的原型语法

用对象字面量重写整个原型对象：
```js
function Person(){};

Person.prototype = {
    name: "Max",
    age: 26,
    job: "Web Engineer",
    sayName: function(){
        alert(this.name);
    }
};
```

最后导致的结果有一个不同的地方是，`constructor`属性不再指向`Person`了。

如果c`onstructor`的值很重要，可以特意将它设置回适当的值：

```js
function Person(){};

Person.prototype = {
    constructor: Person,
    name: "Max",
    age: 26,
    job: "Web Engineer",
    sayName: function(){
        alert(this.name);
    }
};
```
注意，以这种方式重设`constructor`属性会导致它的`[[Enumerable]]`特性被设置为`true`。默认情况下，原生的`constructor`属性是不可枚举的，因此如果你使用兼容ECMAScript 5的Javascript引擎，可以试试`Object.defineProperty()`。
```js
function Person(){};

Person.prototype = {
    name: "Max",
    age: 26,
    job: "Web Engineer",
    sayName: function(){
        alert(this.name);
    }
};

//重设构造函数，只适用于ECMAScript 5兼容的浏览器
Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
    });
```

### 原型的动态性
由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来----即使是先创建了实例后修改原型也照样如此。
```js
var friend = new Person();

Person.prototype.sayHi = function(){
    alert('Hi');
}

friend.sayHi();     //"Hi"(没有问题！)
```

但是如果是**重写**整个原型对象，情况就不一样了。我们知道，调用构造函数会为实例添加一个指向最初原型的`[[Prototype]]`指针，而把原型修改为另一个对象就等于切断了构造函数与最初原型之间的联系。
**请记住：实例中的指针仅指向原型，而不指向构造函数。**
```js
function Person(){};

var friend = new Person();

Person.prototype = {
    constructor: Person,
    name: "Max",
    age: 26,
    job: "Web Engineer",
    sayName: function(){
        alert(this.name);
    }
}; 
friend.sayName();   //error
```

### 原型对象的问题
首先，它忽略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。但这还不是最大的问题，最大的问题是由其共享的本性所导致的。
```js
function Person(){};

Person.prototype = {
    constructor: Person,
    name: "Max",
    age: 26,
    job: "Web Engineer",
    friends: ["Shelby","Court"]
    sayName: function(){
        alert(this.name);
    }
}; 

var person1 = new Person();
var person2 = new Person();

person1.friends.push("Van");

alert(person1.friends);     //"Shelby,Court,Van"
alert(person2.friends);     //"Shelby,Court,Van"
alert(person1.friends === person2.friends);     //true
```
修改`person1.friends`引用的数组，向数组中添加一个字符串。由于`friends`数组存在于`Person.prototype`中，所以修改也会通过`person2.friends`反映出来。

### 组合使用构造函数模式和原型模式
构造函数模式用于定义实例属性，而原型模式用于定义方法和共享属性。
```js
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Sheldy","Court"];
}
Person.prototype = {
    constructor: Person,
    sayName: function(){
        alert(this.name);
    }
}; 
```

### 动态原型模式
把所有信息都封装在构造函数中，而通过在构造函数中初始化原型（仅在必要的情况下），又保持了同事使用构造函数和原型的优点。
```js
function Person(name,age,job){
    //属性
    this.name = name;
    this.age = age;
    this.job = job;
    //方法
    if(typeof this.sayName != "funciton"){
        Person.prototype.sayName = function(){
            alert(this.name);
        };
    }
}
```
这里只有在`sayName()`方法不存在的情况下，才会将它添加到原型中。

### `__proto__`

为什么在构造函数的 `prototype` 中定义了属性和方法，它的实例中就能访问呢？

那是因为当调用构造函数创建一个新实例后，该实例的内部将包含一个指针 `__proto__`，指向构造函数的原型。

```js
function Person(){}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```

既然，`__proto__` 确实是指向 `Person.prototype`，那么使用 `new` 操作符创建对象的过程可以演变为，为实例对象的 `__proto__` 赋值的过程。如下代码所示：

```js
function Person(){}

// var person = new Person(); 
// 上一行代码等同于以下过程 ==> 
var person = {};
person.__proto__ = Person.prototype;
Person.call(person);
```

这个例子中，我先创建了一个空对象 `person`，然后把 `person.__proto__` 指向了 `Person` 的原型对象，便继承了 `Person` 原型对象中的所有属性和方法，最后又以 `person` 为作用域执行了 `Person` 函数，`person` 便就拥有了 `Person` 的所有属性和方法。这个过程和 `var person = new Person()`; 完全一样。

简单来说，当我们访问一个对象的属性时，如果这个属性不存在，那么就会去 `__proto__` 里找，这个 `__proto__` 又会有自己的 `__proto__`，于是就这样一直找下去，直到找到为止。在找不到的情况下，搜索过程总是要一环一环地前行到原型链末端才会停下来。

### 原型链

JavaScript 中描述了原型链的概念，并将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

那么，假如我们让原型对象等于另一个类型的实例，结果会怎么样呢？显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓原型链的基本概念。

上面这段话比较绕口，代码更容易理解，让我们来看看实现原型链的基本模式。如下代码所示：

```js
function Father(){
    this.value = true;
}
Father.prototype.getValue = function(){
    return this.value;
};

function Son(){
    this.value2 = false;
}

// 继承了 Father
Son.prototype = new Father();

Son.prototype.getValue2 = function (){
    return this.value2;
};

var son = new Son();
console.log(son.getValue());  // true
```

以上代码定义了两个类型：`Father` 和 `Son`。每个类型分别有一个属性和一个方法。它们的主要区别是 `Son` 继承了 `Father`，而继承是通过创建 `Father` 的实例，并将该实例赋给 `Son.prototype` 实现的。实现的本质是重写原型对象，代之以一个新类型的实例。换句话说，原来存在于 `Father` 的实例中的所有属性和方法，现在也存在于 `Son.prototype` 中了。在确立了继承关系之后，我们给 `Son.prototype` 添加了一个方法，这样就在继承了 `Father` 的属性和方法的基础上又添加了一个新方法。

我们再用 `__proto__` 重写上面代码，更便于大家的理解：

```js
function Father(){
    this.value = true;
}
Father.prototype.getValue = function(){
    return this.value;
};

function Son(){
    this.value2 = false;
}

// 继承了 Father
// Son.prototype = new Father(); ==>
Son.prototype = {};
Son.prototype.__proto__ = Father.prototype;
Father.call(Son.prototype);

Son.prototype.getValue2 = function (){
    return this.value2;
};

// var son = new Son(); ==>
var son = {};
son.__proto__ = Son.prototype;
Son.call(son);

console.log(son.getValue()); // true
console.log(son.getValue === son.__proto__.__proto__.getValue); // true
```

从以上代码可以看出，实例 son 调用 getValue() 方法，实际是经过了 son.__proto__.__proto__.getValue 的过程的，其中 son.__proto__ 等于 Son.prototype，而 Son.prototype.__proto__ 又等于 Father.prototype，所以 son.__proto__.__proto__.getValue 其实就是 Father.prototype.getValue。

事实上，前面例子中展示的原型链还少一环。我们知道，所有引用类型默然都继承了 Obeject，而这个继承也是通过原型链实现的。大家要记住，所有函数的默认原型都是 Object 的实例，因此默认原型都会包含一个内部指针 __proto__，指向 Object.prototype。这也正是所有自定义类型都会继承 toString()、valueOf() 等默认方法的根本原因。

- `Object.prototype` 是**顶级对象**，所有对象都继承自它。
- `Object.prototype.__proto__ === null` ，说明原型链到 `Object.prototype` 终止。
- `Function.__proto__` 指向 `Function.prototype`。