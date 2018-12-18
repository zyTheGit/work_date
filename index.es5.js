
require("./index.css");
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var CreateDateControl = function () {
    function CreateDateControl() {
        var yearValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var monthValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var dateRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

        _classCallCheck(this, CreateDateControl);

        this.yearList = [];
        this.monthlyList = [];
        this.dayList = [];
        this.yearValue = yearValue;
        this.monthValue = monthValue;
        this.dateRange = dateRange;
        this.dateFailValue = "";
    }

    _createClass(CreateDateControl, [{
        key: "init",
        value: function init() {
            this.createDate();
            return this.dateFailValue;
        }
    }, {
        key: "createDate",
        value: function createDate() {
            //生成日期
            var calendar = document.querySelector(".calendar");
            if (!!calendar) {
                calendar.innerHTML = "<header class=\"calendar_header\">\n                            <div class=\"calendar_select\">\n                                <input type=\"text\" readonly placeholder=\"\u8BF7\u9009\u62E9\u5E74\u4EFD\" class=\"calendar_input year_val\" />\n                                <ul class=\"calendar_year\"></ul>\n                            </div>\n                            <div class=\"calendar_select\">\n                                <input type=\"text\" readonly placeholder=\"\u8BF7\u9009\u62E9\u5E74\u4EFD\" class=\"calendar_input month_val\" />\n                                <ul class=\"calendar_month\"></ul>\n                            </div>\n                        </header>\n                        <div class=\"calendar_content\"></div>";

                this.createYear();
                this.createMonth();
                this.changeEvent();
            }
        }
    }, {
        key: "createYear",
        value: function createYear() {
            //生成年份（十年）
            var date = new Date();
            var year = date.getFullYear();
            var yearMax = year + this.dateRange;
            var yearMin = year - this.dateRange;
            var html = "";
            var calendar_year = document.querySelector(".calendar_year");
            for (var i = yearMin; i < yearMax; i++) {
                if (!!this.yearValue && this.yearValue == i) {
                    html += "<li class='calendar_active'><span>" + i + "</span>\u5E74</li>";
                } else {
                    html += "<li><span>" + i + "</span>\u5E74</li>";
                }
                this.yearList.push(i);
            }
            calendar_year.innerHTML = html;
            if (!this.yearValue) {
                var chooceLi = document.querySelectorAll(".calendar_year li")[0];
                chooceLi.setAttribute("class", "calendar_active");
                this.yearValue = document.querySelector(".calendar_year .calendar_active span").innerText;
                chooceLi = null;
            }
            calendar_year = null;
            return false;
        }
    }, {
        key: "createMonth",
        value: function createMonth() {
            //生成月份
            var html = "";
            var calendar_month = document.querySelector(".calendar_month");
            for (var i = 1; i < 13; i++) {
                if (!!this.monthValue && this.monthValue == i) {
                    html += "<li class=\"calendar_active\"><span>" + i + "</span>\u6708</li>";
                } else {
                    html += "<li><span>" + i + "</span>\u6708</li>";
                }
                this.monthlyList.push(i);
            }
            calendar_month.innerHTML = html;
            if (!this.monthValue) {
                var chooceLi = document.querySelectorAll(".calendar_month li")[0];
                chooceLi.setAttribute("class", "calendar_active");
                this.monthValue = document.querySelector(".calendar_month .calendar_active span").innerText;
                chooceLi = null;
            }
            calendar_month = null;
            this.createDay();
            return false;
        }
    }, {
        key: "createDay",
        value: function createDay() {
            //获取天数
            var year = this.yearValue;
            var month = this.monthValue;
            var dayLength = this.getDay(year, month);
            var html = "";
            this.dayList = [];
            for (var i = 0; i < dayLength; i++) {
                var week = this.getWeek(year, month, i + 1);
                html += "<div><p><span class =\"calendar_fail\">\n                                <b>" + (i + 1) + "</b>\n                                <b>" + week + "</b>\n                            </span>\n                            <span><font>\u8C03\u73ED</font></span>\n                        </p>\n                        <p><span><font>\u8C03\u4F11</font></span><span><font>\u8865\u7B7E</font></span></p>\n                        <p>\u6B63\u5E38\u73ED</p></div>";
                this.dayList.push(i + 1);
            }
            document.querySelector(".calendar_content").innerHTML = html;
            document.querySelector(".year_val").value = this.yearValue + "年";
            document.querySelector(".month_val").value = this.monthValue + "月";
            this.dateFailValue = this.yearValue + "\u5E74-" + this.monthValue + "\u6708";
        }
    }, {
        key: "getDay",
        value: function getDay(year, month) {
            //获取天数
            var d = new Date(year, month, 0);
            var day = d.getDay();
            return d.getDate();
        }
    }, {
        key: "getWeek",
        value: function getWeek(year, month, week) {
            //获取星期
            var weekVal = year + "/" + month + "/" + week;
            var d = new Date(weekVal);
            var day = d.getDay();
            var text = "";
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
    }, {
        key: "changeYear",
        value: function changeYear() {
            //切换年份事件
            var ulYearLi = document.querySelectorAll(".calendar_year li");
            var This = this;
            ulYearLi.forEach(function (li) {
                li.addEventListener("click", function (e) {
                    ulYearLi.forEach(function (removeClassLi) {
                        removeClassLi.setAttribute("class", "");
                    });
                    This.yearValue = this.childNodes[0].innerText;
                    this.setAttribute("class", "calendar_active");
                    This.createDay();
                });
            });
        }
    }, {
        key: "changeMonth",
        value: function changeMonth() {
            //切换年份事件
            var ulMonthLi = document.querySelectorAll(".calendar_month li");
            var This = this;
            ulMonthLi.forEach(function (li) {
                li.addEventListener("click", function (e) {
                    ulMonthLi.forEach(function (removeClassLi) {
                        removeClassLi.setAttribute("class", "");
                    });
                    This.monthValue = this.childNodes[0].innerText;
                    this.setAttribute("class", "calendar_active");
                    This.createDay();
                });
            });
        }
    }, {
        key: "changeEvent",
        value: function changeEvent() {
            //切换显示事件
            var header_inputList = document.querySelectorAll(".calendar_header input");
            header_inputList.forEach(function (header_input) {
                header_input.addEventListener("click", function (e) {
                    var event = e || window.e;
                    var ulList = document.querySelectorAll(".calendar_header ul");
                    var input_ul = this.nextElementSibling;
                    ulList.forEach(function (ul) {
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
            document.onclick = function () {
                var ulList = document.querySelectorAll(".calendar_header ul");
                ulList.forEach(function (ul) {
                    ul.style.display = 'none';
                });
            };
            this.changeYear();
            this.changeMonth();
        }
    }]);

    return CreateDateControl;
}();

window.CreateDateControl = CreateDateControl;