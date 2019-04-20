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
6. writing-mode

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
  display: table;
}
.box {
  display: table-cell;
  vertical-align: middle;
}
```