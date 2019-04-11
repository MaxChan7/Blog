# JS

## 内置类型

JS中内置的类型有两种：**基本类型**和**引用类型**。

- 基本类型：Undefined、Null、Boolean、Number、String和symbol。这6种基本数据类型是按值访问的，因为可以操作保存在变量中的实际值。
- 引用类型：Object。引用类型的值的值是保存在内存中的对象。而Js是不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。操作对象时，实际上是操作对象的引用而非实际对象。

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
