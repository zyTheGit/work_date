"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var CreateDateControl = function () {
    function CreateDateControl() {
        _classCallCheck(this, CreateDateControl);

        this.yearList = [];
        this.monthlyList = [];
        this.dayList = [];
        this.statusContext = "正常班";
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
        this.arrayFormOrforEach();
    }

    _createClass(CreateDateControl, [{
        key: "init",
        value: function init() {
            this.currentDate();
            this.createDate();
            return this;
        }
    }, {
        key: "currentDate",
        value: function currentDate() {
            //当前的年月日
            var date = new Date();
            var currentYear = date.getFullYear();
            var currentMonth = date.getMonth();
            var currentDate = date.getDate();
            this.currentObj.year = currentYear;
            this.currentObj.month = currentMonth + 1;
            this.currentObj.day = currentDate;
            if (!this.yearValue) this.yearValue = this.currentObj.year;
            if (!this.monthValue) this.monthValue = this.currentObj.month;
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
                var disabledBtn = "";
                var calendar_current = "";
                var week = this.getWeek(year, month, i + 1);
                var attendIndex = this.attendArray[i];
                var shiftsRule = "";
                var card_special = " card_special";
                var attendStatus = !!attendIndex && attendIndex.status ? attendIndex.status : this.statusContext;
                if (!!attendIndex && attendIndex.shiftsRule) {
                    shiftsRule = "<b class=\"card_shifts\" title=\"" + attendIndex.shiftsRule + "\">" + attendIndex.shiftsRule + "</b>";
                    card_special = "";
                }
                if (this.isNoDisabledBtn && this.currentObj.year >= year) {
                    if (this.currentObj.year == year && this.currentObj.month >= month) {
                        if (this.currentObj.month == month) {
                            if (this.currentObj.day > i + 1) {
                                disabledBtn = " disabledBtn";
                            }
                        } else {
                            disabledBtn = " disabledBtn";
                        }
                    } else {
                        disabledBtn = " disabledBtn";
                    }
                }
                if (this.currentObj.year == year && this.currentObj.month == month && this.currentObj.day == i + 1) {
                    calendar_current = " calendar_current";
                }
                html += "<div class=\"calendar_card" + calendar_current + "\">\n                        <p>\n                           <span class =\"calendar_fail\">\n                                <b>" + (i + 1) + "</b>\n                                <b>" + week + "</b>\n                            </span>\n                            <span><font class=\"card_btnOne\">\u8865\u7B7E</font></span>\n                        </p>\n                        <p>\n                            <span><font class=\"card_btnTwo" + disabledBtn + "\">\u8C03\u4F11</font></span>\n                            <span><font class=\"card_btnThree" + disabledBtn + "\">\u8C03\u73ED</font></span>\n                            <span><font class=\"card_btnFour" + disabledBtn + "\">\u8BF7\u5047</font></span>\n                        </p>\n                        <p class=\"card_text\">\n                        " + shiftsRule + "\n                        <b class=\"card_status" + card_special + "\">" + attendStatus + "</b>\n                        </p>\n                    </div>";
                this.dayList.push(i + 1);
            }
            document.querySelector(".calendar_content").innerHTML = html;
            document.querySelector(".year_val").value = this.yearValue + "年";
            document.querySelector(".month_val").value = this.monthValue + "月";
            this.dateFailValue = this.yearValue + "\u5E74-" + this.monthValue + "\u6708";
            this.elementCreateComplete();
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
            var day = new Date(weekVal).getDay();
            switch (day) {
                case 0:
                    return "星期日";
                case 1:
                    return "星期一";
                case 2:
                    return "星期二";
                case 3:
                    return "星期三";
                case 4:
                    return "星期四";
                case 5:
                    return "星期五";
                case 6:
                    return "星期六";
            }
        }
    }, {
        key: "changeYear",
        value: function changeYear() {
            //切换年份事件
            var ulYearLi = document.querySelectorAll(".calendar_year li");
            var This = this;
            Array.from(ulYearLi).forEach(function (li) {
                li.addEventListener("click", function (e) {
                    This.changenClick = true;
                    Array.from(ulYearLi).forEach(function (removeClassLi) {
                        removeClassLi.setAttribute("class", "");
                    });
                    This.yearValue = parseInt(this.childNodes[0].innerText);
                    this.setAttribute("class", "calendar_active");
                    !!This.changeEventCallback ? This.changeEventCallback(This) : This.createDay();
                });
            });
        }
    }, {
        key: "changeMonth",
        value: function changeMonth() {
            //切换年份事件
            var ulMonthLi = document.querySelectorAll(".calendar_month li");
            var This = this;
            Array.from(ulMonthLi).forEach(function (li) {
                li.addEventListener("click", function (e) {
                    This.changenClick = true;
                    Array.from(ulMonthLi).forEach(function (removeClassLi) {
                        removeClassLi.setAttribute("class", "");
                    });
                    This.monthValue = parseInt(this.childNodes[0].innerText);
                    this.setAttribute("class", "calendar_active");
                    !!This.changeEventCallback ? This.changeEventCallback(This) : This.createDay();
                });
            });
        }
    }, {
        key: "changeEvent",
        value: function changeEvent() {
            var _this2 = this;

            //下拉显示事件
            var header_inputList = document.querySelectorAll(".calendar_header input");
            Array.from(header_inputList).forEach(function (header_input) {
                header_input.addEventListener("click", function (e) {
                    var event = e || window.e;
                    var ulList = document.querySelectorAll(".calendar_header ul");
                    var input_ul = this.nextElementSibling || this.nextSibling;
                    Array.from(ulList).forEach(function (ul) {
                        ul.style.display = 'none';
                    });
                    if (input_ul.style.display == "block") {
                        input_ul.style.cssText += "display:none;top:70px;";
                    } else {
                        input_ul.style.cssText += "display:block;top:55px;";
                    }
                    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
                });
            });
            document.addEventListener("click", function () {
                _this2.changenClick = false;
                let ulList = document.querySelectorAll(".calendar_header ul");
                Array.from(ulList).forEach(function (ul) {
                    ul.style.display = 'none';
                });
            });
            this.changeYear();
            this.changeMonth();
        }
    }, {
        key: "elementCreateComplete",
        value: function elementCreateComplete() {
            //元素创建完成之后的事件处理
            var _this = this;
            Array.from(document.querySelectorAll(".calendar_content .calendar_card")).forEach(function (div) {
                var divCard = div;
                div.addEventListener("click", function (e) {
                    var ev = e || window.e;
                    var target = ev.target || ev.srcElement;
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
    }, {
        key: "arrayFormOrforEach",
        value: function arrayFormOrforEach() {
            if (!Array.prototype.forEach) {

                Array.prototype.forEach = function (callback, thisArg) {

                    var T, k;

                    if (this == null) {
                        throw new TypeError(' this is null or not defined');
                    }
                    var O = Object(this);
                    var len = O.length >>> 0;

                    if (typeof callback !== "function") {
                        throw new TypeError(callback + ' is not a function');
                    }
                    if (arguments.length > 1) {
                        T = thisArg;
                    }

                    k = 0;

                    while (k < len) {

                        var kValue;
                        if (k in O) {
                            kValue = O[k];
                            callback.call(T, kValue, k, O);
                        }
                        k++;
                    }
                };
            }
            if (!Array.from) {
                Array.from = function () {
                    var toStr = Object.prototype.toString;
                    var isCallable = function isCallable(fn) {
                        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
                    };
                    var toInteger = function toInteger(value) {
                        var number = Number(value);
                        if (isNaN(number)) {
                            return 0;
                        }
                        if (number === 0 || !isFinite(number)) {
                            return number;
                        }
                        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
                    };
                    var maxSafeInteger = Math.pow(2, 53) - 1;
                    var toLength = function toLength(value) {
                        var len = toInteger(value);
                        return Math.min(Math.max(len, 0), maxSafeInteger);
                    };

                    // The length property of the from method is 1.
                    return function from(arrayLike /*, mapFn, thisArg */ ) {
                        // 1. Let C be the this value.
                        var C = this;

                        // 2. Let items be ToObject(arrayLike).
                        var items = Object(arrayLike);

                        // 3. ReturnIfAbrupt(items).
                        if (arrayLike == null) {
                            throw new TypeError("Array.from requires an array-like object - not null or undefined");
                        }

                        // 4. If mapfn is undefined, then let mapping be false.
                        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                        var T;
                        if (typeof mapFn !== 'undefined') {
                            // 5. else      
                            // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                            if (!isCallable(mapFn)) {
                                throw new TypeError('Array.from: when provided, the second argument must be a function');
                            }

                            // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                            if (arguments.length > 2) {
                                T = arguments[2];
                            }
                        }

                        // 10. Let lenValue be Get(items, "length").
                        // 11. Let len be ToLength(lenValue).
                        var len = toLength(items.length);

                        // 13. If IsConstructor(C) is true, then
                        // 13. a. Let A be the result of calling the [[Construct]] internal method 
                        // of C with an argument list containing the single item len.
                        // 14. a. Else, Let A be ArrayCreate(len).
                        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

                        // 16. Let k be 0.
                        var k = 0;
                        // 17. Repeat, while k < len… (also steps a - h)
                        var kValue;
                        while (k < len) {
                            kValue = items[k];
                            if (mapFn) {
                                A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                            } else {
                                A[k] = kValue;
                            }
                            k += 1;
                        }
                        // 18. Let putStatus be Put(A, "length", len, true).
                        A.length = len;
                        // 20. Return A.
                        return A;
                    };
                }();
            }
        }
    }]);

    return CreateDateControl;
}();

window.CreateDateControl = CreateDateControl;