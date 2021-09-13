// 走起 我的函数库~
var Utils = require("../../utils/util.js");
var datalist = {
    time:"发送验证码",                           // 发送验证码按钮的txt
    disabled: true,                                     // 验证码按钮的点击状态
    iponeVal: "",                                        // 手机号码Val
    pasdVal: "",                                         // 密码号码Val
    dopasdVal: '',                                      // 确认密码号码Val
    Verification_Code:"",                          // 验证码的input
    checkedVal:"0",                                 // 同意阅读的勾选
    Code: true                                          // 同意阅读的勾选的状态
}
var wait = 60;            // 设置全局变量的time

Page({                  // 配置项
    data: datalist,
    formSubmit: function (e) {
        var formVal = e.detail.value;
        this.verSubmit(formVal);
    },
    verSubmit: function (formVal){                  // 提交
        var _this = this; 
        var valList = _this.verConfirmPasd(formVal) && _this.verPassd(formVal);
        var checkVal = Utils.Verification.phone;
        var loginArr = {};  // 记住登陆名 密码
        if (!checkVal.test(_this.data.iponeVal)) {          // 提交判断手机号码
            Utils.showModal("手机号码不正确");
            return false;
        }
        if (_this.data.Verification_Code == "") {           // 提交判断验证码
            Utils.showModal("验证码不能为空");
            return false;
        }
        if (!_this.data.Code){         // 提交判断勾选用户注册
            Utils.showModal("请勾选用户协议");
            return false;
        }
        if (valList){
            Utils.requestFn({
                url: '/index.php/register?server=1',
                method: "POST",
                data: {         // 传递的参数
                    userphone: _this.data.iponeVal,
                    passwd: _this.data.pasdVal,
                    code: _this.data.Verification_Code
                },
                success: function (res) {           // 成功、返回的数据
                    if(res.data.status){
                        loginArr = {        // 本地存储的手机号、密码
                            phone: _this.data.iponeVal,
                            pasd: _this.data.pasdVal
                        }
                        Utils.setStorage('success', loginArr);
                        wx.redirectTo({
                            url: '/pages/login/login'
                        })
                    }else{
                        Utils.showModal(res.data.message);
                        return false;
                    }
                },
                fail: function () {                      // 失败、调取状态 
                    console.log("请求失败")
                    _this.failFn();
                }
            })
        }
    },
    verPassd: function (formVal){                                   // 验证密码
        var thisVal = formVal.pasd
        if (thisVal.length < 6) {
            Utils.showModal("请输入至少6位的密码");
            return false;
        } 
        this.setData({
            pasdVal: thisVal
        })
        return true;
    },
    verConfirmPasd: function (formVal) {                 // 确认密码
        var pasdVal = formVal.pasd;
        var confirmPasd = formVal.dopasd;
        if (confirmPasd != pasdVal) {
            Utils.showModal("两次密码输入不一致");
            return false;
        }
        this.setData({
            dopasdVal: confirmPasd
        });
        return true;
    },
 verIpneVal:function(e){                 // 失去焦点验证手机号
   var thisVal  = null;
   if (e.type == 'input'){
            thisVal = e.detail.value;
        }else{
            thisVal = e.ipone;
        }
        var checkVal = Utils.Verification.phone;
        if (checkVal.test(thisVal)) {
            this.setData({
                time: "发送验证码",
                disabled: false,
                iponeVal: thisVal
            })
        }else{
            this.setData({
                time: "发送验证码",
                disabled: true,
                iponeVal: thisVal
            })
        }
    },
 delivery:function(){
        var _this = this;
      
        Utils.requestFn({           // 发送验证码接口
            url: '/index.php/regcode?server=1', 
            method: "POST",
            data: {
                userphone: _this.data.iponeVal
            },
            success: function (res) {
                if (!res.data.status){
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel:false,
                        success: function (res) {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: '/pages/login/login'
                                })
                            } 
                        }
                    })
                }else{
                      _this.Countdown();      // 触发倒计时
                }
            }
        })
    },
    Countdown:function(e){             // 发送验证码的倒计时
        var _this = this;
        if (wait  ==  0) {
            this.setData({
                time: "发送验证码",
                disabled:false
            })
            wait = 12;
        }else {
            if (wait < 10){
                this.setData({
                    time: "重新发送(0" + wait + ")",
                    disabled: true
                })
                wait--;
                setTimeout(function () {
                    _this.Countdown()
                }, 1000);
            }else {
                this.setData({
                    time: "重新发送(" + wait + ")",
                    disabled: true
                })
                wait--;
                setTimeout(function () {
                    _this.Countdown()
                }, 1000)
            }
        }
    },
    verificationCode: function (ev){
        var thisVal = ev.detail.value;
        if (thisVal == "") {
            Utils.showModal("验证码不能为空");
        }
        this.setData({
            Verification_Code: thisVal
        });
    },
    hrefFn:function(){                      // 用户注册的协议
        wx.redirectTo({
            url: '../Agreement/Agreement'
        })
    },
    checkboxFn:function(e){
        var thisVal = e.detail.value;
        if (thisVal.length){
            this.setData({
                Code:true
            })
        }else{
            this.setData({
                Code: false
            })
        }
    }
})