const ObjGlobal = {
    data: {
        yearList: [],
        monthlyList: [],
        dayList: [],
        yearValue: "",
        monthValue: "",
        dateFailValue: ""
    },
    init() {
        this.methods.createDate();
    },
    methods: {
        createDate() {
            //生成日期
            let calendar = document.querySelector(".calendar");
            if (!!calendar) {
                calendar.innerHTML = `
                        <header class="calendar_header">
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
        },
        createYear() {
            //生成年份（十年）
            let date = new Date();
            let year = date.getFullYear();
            let yearMax = year + 5;
            let yearMin = year - 5;
            let html = "";
            let calendar_year = document.querySelector(".calendar_year");
            for (var i = yearMin; i < yearMax; i++) {
                html += `<li><span>${i}</span>年</li>`;
                ObjGlobal.data.yearList.push(i);
            }
            calendar_year.innerHTML = html;
            let chooceLi = document.querySelectorAll(".calendar_year li")[0];
            chooceLi.setAttribute("class", "calendar_active");
            ObjGlobal.data.yearValue = document.querySelector(".calendar_year .calendar_active span").innerText;
            calendar_year = null;
            chooceLi = null;
            return false;
        },
        createMonth() {
            //生成月份
            var html = "";
            let calendar_month = document.querySelector(".calendar_month");
            for (var i = 1; i < 13; i++) {
                html += `<li><span>${i}</span>月</li>`;
                ObjGlobal.data.monthlyList.push(i);
            }
            calendar_month.innerHTML = html;
            let chooceLi = document.querySelectorAll(".calendar_month li")[0];
            chooceLi.setAttribute("class", "calendar_active");
            ObjGlobal.data.monthValue = document.querySelector(".calendar_month .calendar_active span").innerText;
            calendar_month = null;
            this.createDay();
            return false;
        },
        createDay() {
            //获取天数
            let year = ObjGlobal.data.yearValue;
            let month = ObjGlobal.data.monthValue;
            let dayLength = this.getDay(year, month);
            let html = "";
            for (var i = 0; i < dayLength; i++) {
                var week = this.getWeek(year, month, i);
                html += `<div>
                            <p>
                                <span class ="calendar_fail">
                                    <b>${i + 1}</b>
                                    <b>${week}</b>
                                </span>
                                <span><font>调班</font></span>
                            </p>
                            <p><span><font>调休</font></span><span><font>补签</font></span></p>
                            <p>正常班</p>
                        </div>`;
                ObjGlobal.data.dayList.push(i);
            }
            document.querySelector(".calendar_content").innerHTML = html;
            document.querySelector(".year_val").value = ObjGlobal.data.yearValue + "年";
            document.querySelector(".month_val").value = ObjGlobal.data.monthValue + "月";
            ObjGlobal.data.dateFailValue = `${ObjGlobal.data.yearValue}年-${ObjGlobal.data.monthValue}月`;
        },
        getDay(year, month) {
            //获取天数
            let d = new Date(year, month, 0);
            let day = d.getDay();
            return d.getDate();
        },
        getWeek(year, month, week) {
            //获取星期
            let d = new Date(year, month, week);
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
        },
        changeYear() {
            //切换年份事件
            let ulYearLi = document.querySelectorAll(".calendar_year li");
            let This = this;
            ulYearLi.forEach(li => {
                li.addEventListener("click", function (e) {
                    ulYearLi.forEach(removeClassLi => {
                        removeClassLi.setAttribute("class", "");
                    });
                    ObjGlobal.data.yearValue = this.childNodes[0].innerText;
                    this.setAttribute("class", "calendar_active");
                    This.createDay();
                });
            });
        },
        changeMonth() {
            //切换年份事件
            let ulMonthLi = document.querySelectorAll(".calendar_month li");
            let This = this;
            ulMonthLi.forEach(li => {
                li.addEventListener("click", function (e) {
                    ulMonthLi.forEach(removeClassLi => {
                        removeClassLi.setAttribute("class", "");
                    });
                    ObjGlobal.data.monthValue = this.childNodes[0].innerText;
                    this.setAttribute("class", "calendar_active");
                    This.createDay();
                });
            });
        },
        changeEvent() {
            //切换显示事件
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
                let ulList = document.querySelectorAll(".calendar_header ul");
                ulList.forEach(ul => {
                    ul.style.display = 'none';
                });
            };
            this.changeYear();
            this.changeMonth();
        }
    }
};
ObjGlobal.init();