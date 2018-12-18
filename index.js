require("./index.css");

class CreateDateControl {
    constructor(yearValue = "", monthValue = "", dateRange = 5) {
        this.yearList = [];
        this.monthlyList = [];
        this.dayList = [];
        this.yearValue = yearValue;
        this.monthValue = monthValue;
        this.dateRange = dateRange;//年份范围默认是上下5年
        this.dateFailValue = "";
    }
    init() {
        this.createDate();
        return this.dateFailValue;
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
        for (var i = 0; i < dayLength; i++) {
            var week = this.getWeek(year, month, i + 1);
            html += `<div><p><span class ="calendar_fail">
                                <b>${i + 1}</b>
                                <b>${week}</b>
                            </span>
                            <span><font>调班</font></span>
                        </p>
                        <p><span><font>调休</font></span><span><font>补签</font></span></p>
                        <p>正常班</p></div>`;
            this.dayList.push(i + 1);
        }
        document.querySelector(".calendar_content").innerHTML = html;
        document.querySelector(".year_val").value = this.yearValue + "年";
        document.querySelector(".month_val").value = this.monthValue + "月";
        this.dateFailValue = `${this.yearValue}年-${this.monthValue}月`;
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
                ulYearLi.forEach(removeClassLi => {
                    removeClassLi.setAttribute("class", "");
                });
                This.yearValue = this.childNodes[0].innerText;
                this.setAttribute("class", "calendar_active");
                This.createDay();
            });
        });
    }
    changeMonth() {
        //切换年份事件
        let ulMonthLi = document.querySelectorAll(".calendar_month li");
        let This = this;
        ulMonthLi.forEach(li => {
            li.addEventListener("click", function (e) {
                ulMonthLi.forEach(removeClassLi => {
                    removeClassLi.setAttribute("class", "");
                });
                This.monthValue = this.childNodes[0].innerText;
                this.setAttribute("class", "calendar_active");
                This.createDay();
            });
        });
    }
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
window.CreateDateControl = CreateDateControl;