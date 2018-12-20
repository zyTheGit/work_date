
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
> 没有必填项
+ `statusContext`//`String`设置每天卡片底部内容名称，默认是=正常班=
+ `yearValue`  //`String`设置那一年
+ `monthValue`  //`String`设置那一月
+ `dateRange`  //`int`年份范围默认是上下各加减5年,默认是五年，可在new CreateDateControl(yearValue,monthValue,dateRange)
+ `isNoDisabledBtn` // `bool`是否禁用按钮事件
+ `choiceObj` //某一项卡片返回的内容,包含年月日星期几，和"正常班"的dom元素，可供修改
+ `currentObj` //`Object`当前的年月日
+ `btnOneMethods` //`function`按钮一点击回调
+ `btnTwoMethods` //`function`按钮二点击回调
+ `btnThreeMethods` //`function`按钮三点击回调
+ `btnFourMethods` //`function`按钮四点击回调
+ `changeEventCallback` //`function`切换时事件的成功回调
+ `attendArray` //`Array`返回排班内容,status什么班,shiftsRule班次规则{status,shiftRule}（必须是当月有多少天，数组长度就对应多少）

### `new CreateDateControl().init(option)`方法返回`this`所有的方法
