# work_date
考勤日期控件

![Image text](https://github.com/zyTheGit/work_date/blob/master/img/date_img.png)

![Image text](https://github.com/zyTheGit/work_date/blob/master/img/chioceStyle.png)

### 实用步骤
### 页面直接引用 `dist/bundle.js`
+ body部门
```
<body>
    <div class="calendar"></div>//装日期的盒子
    <!-- <script src="./index.js"></script> -->
    <script src="./dist/bundle.js"></script>
</body>
```
+ js部分
```
  //createDateControl返回插件所有的方法
  let createDateControl = new CreateDateControl("2018", "12").init();
  createDateControl.btnOneMethods = function (a) {
    //第一个按钮的点击事件
    a.changeTextDom.innerHTML = "迁到";//可修改插件内容
  };
  createDateControl.changeEventCallback = function (e) {
    //切换成功回调事件
  }
```

