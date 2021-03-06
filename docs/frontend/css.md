# CSS

## 水平并垂直居中的N种姿势

**敲黑板**！！！**面试必考题**！！！也是一道送分题~

这里我总结了一下，并分成**已知宽高**和**未知宽高**两种情况，介绍两种情况下各自的实现方法：

- **已知宽高**：
1. absolute + 负margin
2. absolute + margin auto
3. absolute + calc

- **未知宽高**：
1. absolute + transform
2. table
3. flex
4. grid
5. lineheight
6. [writing-mode](https://www.zhangxinxu.com/wordpress/2016/04/css-writing-mode/)

```html
<!-- 公用html部分 -->
<div class="wrap">
  <div class="box"></div>
</div>
```

```css
// 公用css
.wrap {
  width: 300px;
  height: 300px;
  background-color: red;
}
.box {
  width: 100px;
  height: 100px;
  background-color: green;
}
```

### 已知宽高
```css
// absolute + 负margin
.wrap {
  position: relative;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}

// absolute + margin auto
.wrap {
  position: relative;
}
.box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

// absolute + calc
.wrap {
  position: relative;
}
.box {
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
```

### 未知宽高

```css
// absolute + transform
.wrap {
  position: relative;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

// table
.wrap {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.box {
  display: inline-block;
}

// flex
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

// grid 兼容性差，不如flex，不推荐使用。
.wrap {
  display: grid;
}
.box {
  align-self: center;
  justify-self: center;
}

// lineheight 适用于行内元素
.wrap {
  text-align: center;
  font-size: 0px;
}
.box {
  display: inline-block;
  vertical-align: middle;
  line-height: 300px; // 行高等于父元素高度
}

// writing-mode 不常用，作为一个扩展，了解一下就行
.wrap {
  writing-mode: vertical-lr;
  text-align: center;
}
.wrap-inner {
  writing-mode: horizontal-tb;
  display: inline-block;
  text-align: center;
  width: 100%;
}
.box {
  display: inline-block;
  margin: auto;
  text-align: left;
}
```

```html
// writing-mode用到的html
<div class="wrap">
    <div class="wrap-inner">
        <div class="box">123123</div>
    </div>
</div>
```

水平并垂直居中的方法暂时就分享以上几种方法，想到其他的再补充...
