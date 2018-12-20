 require("./index.css");

 class CreateDateControl {
     constructor() {
         this.yearList = [];
         this.monthlyList = [];
         this.dayList = [];
         this.statusContext="正常班";
         this.yearValue = "";
         this.monthValue = "";
         this.attendArray = []; //返回排班内容,status什么班,shiftsRule班次规则
         this.dateRange = 5; //年份范围默认是上下各加减5年
         this.isNoDisabledBtn = true; //是否禁用按钮事件
         this.btnOneMethods = null; //按钮一点击回调
         this.btnTwoMethods = null; //按钮二点击回调
         this.btnThreeMethods = null; //按钮三点击回调
         this.btnFourMethods = null; //按钮四点击回调
         this.changeEventCallback = null; //切换事件的成功回调
         this.choiceObj = {}; //某一项卡片返回的内容,包含年月日星期几，和"正常班"的dom元素，可供修改
         this.currentObj = {}; //当前的年月日
         this.cardShelves = null; //卡片
         this.statusContent = ""; //返回卡片状态
         this.dateFailValue = "";
         this.currentDate();
     }
     init() {
         this.currentDate();
         this.createDate();
         return this;
     }

     currentDate() {
         //当前的年月日
         let date = new Date();
         let currentYear = date.getFullYear();
         let currentMonth = date.getMonth();
         let currentDate = date.getDate();
         this.currentObj.year = currentYear;
         this.currentObj.month = currentMonth + 1;
         this.currentObj.day = currentDate;
         if (!this.yearValue) this.yearValue = this.currentObj.year;
         if (!this.monthValue) this.monthValue = this.currentObj.month;
     }

     createDate() {
         //生成日期
         let calendar = document.querySelector(".calendar");
         if (!!calendar) {
             calendar.innerHTML = `<header class="calendar_header">
                            <div class="calendar_select">
                                <input type="text" readonly placeholder="请选择年份" class="calendar_input year_val" />
                                <ul class="calendar_year"></ul>
                            </div>
                            <div class="calendar_select">
                                <input type="text" readonly placeholder="请选择年份" class="calendar_input month_val" />
                                <ul class="calendar_month"></ul>
                            </div>
                        </header>
                        <div class="calendar_content"></div>`;

             this.createYear();
             this.createMonth();
             this.changeEvent();
         }
     }
     createYear() {
         //生成年份（十年）
         let date = new Date();
         let year = date.getFullYear();
         let yearMax = year + this.dateRange;
         let yearMin = year - this.dateRange;
         let html = "";
         let calendar_year = document.querySelector(".calendar_year");
         for (var i = yearMin; i < yearMax; i++) {
             if (!!this.yearValue && this.yearValue == i) {
                 html += `<li class='calendar_active'><span>${i}</span>年</li>`;
             } else {
                 html += `<li><span>${i}</span>年</li>`;
             }
             this.yearList.push(i);
         }
         calendar_year.innerHTML = html;
         if (!this.yearValue) {
             let chooceLi = document.querySelectorAll(".calendar_year li")[0];
             chooceLi.setAttribute("class", "calendar_active");
             this.yearValue = document.querySelector(".calendar_year .calendar_active span").innerText;
             chooceLi = null;
         }
         calendar_year = null;
         return false;
     }
     createMonth() {
         //生成月份
         var html = "";
         let calendar_month = document.querySelector(".calendar_month");
         for (var i = 1; i < 13; i++) {
             if (!!this.monthValue && this.monthValue == i) {
                 html += `<li class="calendar_active"><span>${i}</span>月</li>`;
             } else {
                 html += `<li><span>${i}</span>月</li>`;
             }
             this.monthlyList.push(i);
         }
         calendar_month.innerHTML = html;
         if (!this.monthValue) {
             let chooceLi = document.querySelectorAll(".calendar_month li")[0];
             chooceLi.setAttribute("class", "calendar_active");
             this.monthValue = document.querySelector(".calendar_month .calendar_active span").innerText;
             chooceLi = null;
         }
         calendar_month = null;
         this.createDay();
         return false;
     }
     createDay() {
         //获取天数
         let year = this.yearValue;
         let month = this.monthValue;
         let dayLength = this.getDay(year, month);
         let html = "";
         this.dayList = [];
         for (let i = 0; i < dayLength; i++) {
             let disabledBtn = "";
             let calendar_current = "";
             let week = this.getWeek(year, month, i + 1);
             let attendIndex = this.attendArray[i];
             let shiftsRule = "";
             let card_special = " card_special";
             let attendStatus = !!attendIndex && attendIndex.status ? attendIndex.status : this.statusContext;
             if (!!attendIndex && attendIndex.shiftsRule) {
                 shiftsRule = `<b class="card_shifts" title="${attendIndex.shiftsRule}">${attendIndex.shiftsRule}</b>`;
                 card_special = "";
             }
             if (this.isNoDisabledBtn && this.currentObj.year >= year) {
                 if (this.currentObj.year == year && this.currentObj.month >= month) {
                     if (this.currentObj.month == month) {
                         if( this.currentObj.day > i + 1){
                            disabledBtn = " disabledBtn";
                         }
                     } else{
                        disabledBtn = " disabledBtn";
                     }
                 } else {
                     disabledBtn = " disabledBtn";
                 }
             }
             if (this.currentObj.year == year && this.currentObj.month == month && this.currentObj.day == i + 1) {
                 calendar_current = " calendar_current";
             }
             html += `<div class="calendar_card${calendar_current}">
                        <p>
                           <span class ="calendar_fail">
                                <b>${i + 1}</b>
                                <b>${week}</b>
                            </span>
                            <span><font class="card_btnOne">补签</font></span>
                        </p>
                        <p>
                            <span><font class="card_btnTwo${disabledBtn}">调休</font></span>
                            <span><font class="card_btnThree${disabledBtn}">调班</font></span>
                            <span><font class="card_btnFour${disabledBtn}">请假</font></span>
                        </p>
                        <p class="card_text">
                        ${shiftsRule}
                        <b class="card_status${card_special}">${attendStatus}</b>
                        </p>
                    </div>`;
             this.dayList.push(i + 1);
         }
         document.querySelector(".calendar_content").innerHTML = html;
         document.querySelector(".year_val").value = this.yearValue + "年";
         document.querySelector(".month_val").value = this.monthValue + "月";
         this.dateFailValue = `${this.yearValue}年-${this.monthValue}月`;
         this.elementCreateComplete();
     }
     getDay(year, month) {
         //获取天数
         let d = new Date(year, month, 0);
         let day = d.getDay();
         return d.getDate();
     }
     getWeek(year, month, week) {
         //获取星期
         let weekVal = year + "/" + month + "/" + week;
         let d = new Date(weekVal);
         let day = d.getDay();
         let text = "";
         switch (day) {
             case 0:
                 text = "星期日";
                 break;
             case 1:
                 text = "星期一";
                 break;
             case 2:
                 text = "星期二";
                 break;
             case 3:
                 text = "星期三";
                 break;
             case 4:
                 text = "星期四";
                 break;
             case 5:
                 text = "星期五";
                 break;
             case 6:
                 text = "星期六";
                 break;
         }
         return text;
     }
     changeYear() {
         //切换年份事件
         let ulYearLi = document.querySelectorAll(".calendar_year li");
         let This = this;
         ulYearLi.forEach(li => {
             li.addEventListener("click", function (e) {
                This.changenClick=true;
                 ulYearLi.forEach(removeClassLi => {
                     removeClassLi.setAttribute("class", "");
                 });
                 This.yearValue = parseInt(this.childNodes[0].innerText);
                 this.setAttribute("class", "calendar_active");
                 if (!!This.changeEventCallback) {
                    This.changeEventCallback(This);
                }else{
                    This.createDay();
                }
             });
         });
     }
     changeMonth() {
         //切换年份事件
         let ulMonthLi = document.querySelectorAll(".calendar_month li");
         let This = this;
         ulMonthLi.forEach(li => {
             li.addEventListener("click", function (e) {
                 This.changenClick=true;
                 ulMonthLi.forEach(removeClassLi => {
                     removeClassLi.setAttribute("class", "");
                 });
                 This.monthValue = parseInt(this.childNodes[0].innerText);
                 this.setAttribute("class", "calendar_active");
                 
                if (!!This.changeEventCallback) {
                    This.changeEventCallback(This);
                }else{
                    This.createDay();
                }
             });
         });
     }
     changeEvent() {
         //下拉显示事件
         let header_inputList = document.querySelectorAll(".calendar_header input");
         header_inputList.forEach(header_input => {
             header_input.addEventListener("click", function (e) {
                 let event = e || window.e;
                 let ulList = document.querySelectorAll(".calendar_header ul");
                 let input_ul = this.nextElementSibling;
                 ulList.forEach(ul => {
                     ul.style.display = 'none';
                 });
                 if (input_ul.style.display == "block") {
                     input_ul.style.cssText += "display:none;top:70px;";
                 } else {
                     input_ul.style.cssText += "display:block;top:55px;";
                 }
                 if (event.stopPropagation) {
                     event.stopPropagation();
                 } else {
                     event.cancelBubble = true;
                 }
             });
         });
         document.onclick = () => {
            this.changenClick=false;
             let ulList = document.querySelectorAll(".calendar_header ul");
             ulList.forEach(ul => {
                 ul.style.display = 'none';
             });

         };
         this.changeYear();
         this.changeMonth();
     }

     elementCreateComplete() {
         //元素创建完成之后的事件处理
         let _this = this;
         Array.from(document.querySelectorAll(".calendar_content .calendar_card")).forEach(div => {
             let divCard = div;
             div.addEventListener("click", function (e) {
                 let ev = e || window.e;
                 let target = ev.target || ev.srcElement;
                 _this.choiceObj.year = _this.yearValue;
                 _this.choiceObj.month = _this.monthValue;
                 _this.choiceObj.week = divCard.querySelectorAll(".calendar_fail b")[1].innerText;
                 _this.choiceObj.day = divCard.querySelectorAll(".calendar_fail b")[0].innerText;
                 _this.choiceObj.changeTextDom = divCard.querySelector(".card_text");
                 if (target.className.toLowerCase() == 'card_btnone') {
                     _this.choiceObj.btnDom = target;
                     if (!!_this.btnOneMethods) _this.btnOneMethods(_this.choiceObj);
                     return false;
                 } else if (target.className.toLowerCase() == 'card_btntwo') {
                     _this.choiceObj.btnDom = target;
                     if (!!_this.btnTwoMethods) _this.btnTwoMethods(_this.choiceObj);
                     return false;
                 } else if (target.className.toLowerCase() == 'card_btnthree') {
                     _this.choiceObj.btnDom = target;
                     if (!!_this.btnThreeMethods) _this.btnThreeMethods(_this.choiceObj);
                     return false;
                 } else if (target.className.toLowerCase() == 'card_btnfour') {
                     _this.choiceObj.btnDom = target;
                     if (!!_this.btnFourMethods) _this.btnFourMethods(_this.choiceObj);
                     return false;
                 }
                 return false;
             });
         });
     }
 }
 window.CreateDateControl = CreateDateControl;