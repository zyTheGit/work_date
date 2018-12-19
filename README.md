[TOC]
# work_date
考勤日期控件

![Image text](https://github.com/zyTheGit/work_date/blob/master/img/date_img.png)

![Image text](https://github.com/zyTheGit/work_date/blob/master/img/chioceStyle.png)

### 实用步骤
### 页面直接引用 `dist/bundle.js`
+ body部门
```
<body>
    <!--装日期的盒子-->
    <div class="calendar"></div>
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
  createDateControl.changeEventCallback = function (This) {
    //This返回插件的所有的方法
    //切换成功回调事件
  }
```
### API
+ `yearValue`  //设置那一年
+ `monthValue`  //设置那一月
+ `dateRange`  //年份范围默认是上下各加减5年,默认是五年，可在new CreateDateControl(yearValue,monthValue,dateRange)
+ `isNoDisabledBtn` //是否禁用按钮事件
+ `choiceObj` //某一项卡片返回的内容,包含年月日星期几，和"正常班"的dom元素，可供修改
+ `currentObj` //当前的年月日
+ `btnOneMethods` //按钮一点击回调
+ `btnTwoMethods` //按钮二点击回调
+ `btnThreeMethods` //按钮三点击回调
+ `btnFourMethods` //按钮四点击回调
+ `changeEventCallback` //切换时事件的成功回调


