//  引入函数库
var Utils = require("../../utils/util.js");

var data = {           // 数据
    time: "发送验证码",                          // 发送验证码按钮的txt
    iponeVal: "",                                        // 手机号码Val
    pasdVal: "",                                         // 密码号码Val
    Verification_Code: "",                          // 验证码的input
    disabled: true                                    // 验证码按钮的点击状态
};
var wait = 60;            // 设置全局变量的time
var loginJson = {       // 存储登陆返回的信息
    image: "",
    nickname: "",
    sdk: "",
    status: "",
    telphone: "",
    types: "",
    uid: "",
}
Page({   // 整个page文件
    data: data,
    formSubmit:function(e){
        var _this = this;

        var formVal = e.detail.value;
        var iponeVal = formVal.ipone;           // 手机号码
        var Verification = formVal.Verification; // 验证码
        var pasd = formVal.pasd;             // 密码
       
        // 点击提交的时候 验证一次手机号码
        var doIpone = this.VerificationIponeFn(iponeVal); 
        
        var doPasd = this.VerificationPasd(pasd);

        if (!doIpone){
            Utils.showModal("手机号码不正确");
            return false;
        }
        if (!doPasd){
            Utils.showModal("密码最少是6位");
            return false;
        }
        var login = wx.getStorageSync("login");
        var sdk;
        if (login){
                sdk = login.sdk;
        }
        Utils.requestFn({   // 接口
            url:'/index.php/movepass?server=1', 
            method: "POST",
            data: {
                userphone: _this.data.iponeVal,
                passwd: formVal.pasd,
                code: _this.data.Verification_Code,
                sdk: sdk
            },
            success: function (res) {
                var dats = res.data.data;
                if (res.data.status){
                    loginJson = {    // 存储登陆状态      
                        image: dats.image,
                        nickname: dats.nickname,
                        sdk: dats.sdk,
                        status: dats.status,
                        telphone: dats.telphone,
                        types: dats.type,
                        uid: dats.uid
                    }
                    Utils.setStorage("login", loginJson);  // 存储到本地缓存
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                wx.redirectTo({
                                        url: '/pages/myList/myList'
                                })
                            }
                        }
                    })
                }else{
                    Utils.showModal(res.data.message);
                    return false;
                }
            }
        })

    },
    verIpneVal:function(e){     // 输入的验证返回的值
        var doVal = this.VerificationIponeFn(e.detail.value);
        if (doVal){
            this.setData({
                disabled:false
            })
        }
    },
    VerificationIponeFn:function(value){            // 验证手机号函数
        var checkVal = Utils.Verification.phone;
        var _this = this;
        this.setData({
            iponeVal: value
        })
        if (checkVal.test(_this.data.iponeVal)) {
         return true;
        }
        return false;
    },
    VerificationPasd:function(value){               // 验证密码
        var _this = this;
        _this.setData({
            pasdVal: value
        });
        if (_this.data.pasdVal.length < 6){
            return false
        }
        return true;
    },
    verificationCode:function(e){       // 输入验证码
        var Code = e.detail.value;
        this.setData({
            Verification_Code: Code
        });
    },
    delivery:function(){        // 点击调取倒计时函数
        var _this = this;
        _this.Countdown();
        Utils.requestFn({           // 发送验证码接口
            url: '/index.php/code?server=1',
            method: "POST",
            data: {
                userphone: _this.data.iponeVal
            },
            success: function (res) { // 返回状态维未写
            }
        })
    },
    Countdown: function (e) {             // 发送验证码的倒计时fn
        var _this = this;
        if (wait == 0) {
            this.setData({
                time: "发送验证码",
                disabled: false
            })
            wait = 12;
        } else {
            if (wait < 10) {
                this.setData({
                    time: "重新发送(0" + wait + ")",
                    disabled: true
                })
                wait--;
                setTimeout(function () {
                    _this.Countdown()
                }, 1000);
            } else {
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
 })