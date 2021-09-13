//  引入函数库
var Utils = require("../../utils/util.js");

var data = {           // 数据
    time: "发送验证码",                          // 发送验证码按钮的txt
    iponeVal: "",                                        // 手机号码Val
    pasdVal: "",                                         // 密码号码Val
    Verification_Code: "",                          // 验证码的input
    disabled: true,                                    // 验证码按钮的点击状态
    code: "",   // 获取login的code 
    ztBool: false   // 点击一键微信登陆按钮的点击状态
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
var loginArr = {};      //修改密码之后 记住登陆手机号跟密码

Page({   // 整个page文件
data: data,
onLoad:function(){
    this.loginFn();
},
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
    Utils.requestFn({   // 接口
        url: '/index.php/movepass?server=1', 
        method: "POST",
        data: {
            userphone: _this.data.iponeVal,
            passwd: formVal.pasd,
            code: _this.data.Verification_Code
        },
        success: function (res) {
            var dats = res.data.data;
            var Reset = wx.getStorageSync("Reset");
            
            if (res.data.status){
                if (Reset) {
                    wx.redirectTo({   // 跳转别的页面，关闭当前页面
                        url: Reset
                    })
                } else {
                    wx.redirectTo({   // 跳转别的页面，关闭当前页面
                        url: "/pages/Consultation/Consultation"
                    })
                }
                loginArr = {        // 存储手机号 密码
                    phone: iponeVal,
                    pasd: pasd
                }
                loginJson = {                // 存储登陆状态      
                    image: dats.image,
                    nickname: dats.nickname,
                    sdk: dats.sdk,
                    status: dats.status,
                    telphone: dats.telphone,
                    types: dats.type,
                    uid: dats.uid
                }
                Utils.setStorage("login", loginJson);     // 存储到本地缓存
                Utils.setStorage('success', loginArr);
            }else{
                // 登陆失败的话 现在的处理就是放在本页面
                Utils.showModal(res.data.message);
                return false;
            }
        }
    })

},
verIpneVal:function(e){     // 输入的验证返回的值
    var doVal = this.VerificationIponeFn(e.detail.value);

    console.log(doVal)
    if (doVal){
        this.setData({
            disabled:false
        })
    }else{
        this.setData({
            disabled: true
        })
    }
},
VerificationIponeFn:function(value){            // 验证手机号函数
    var checkVal = Utils.Verification.phone;
    var _this = this;
    this.setData({
        iponeVal: value
    })
   return checkVal.test(_this.data.iponeVal)
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
loginFn: function () {     // 判断是否是登陆的状态
    var _this = this;
    wx.login({
        success: function (res) {
            if (res.code) {
                _this.setData({
                    code: res.code
                })
            } else {
                Utils.showModal("获取用户登录态失败！");
            }
        }
    });
},
hrefFn: function () {  // 点击页面记录跳转
    var Reset = wx.getStorageSync("Reset");
    if (Reset) {
        wx.redirectTo({               // 跳转别的页面，关闭当前页面
            url: Reset
        })
    } else {
        wx.redirectTo({               // 跳转别的页面，关闭当前页面
            url: "/pages/Consultation/Consultation"
        })
    }
},
getPhoneNumber: function (e) {     // 取得授权的手机号码
    this.loginFn();     // 每次点击的获取最新的code

    this.setData({      // 点击的时候过程中不让点击
        ztBool: true
    })
    var iv = e.detail.iv;       // 获取权限的加密iv信息
    var encryptedData = e.detail.encryptedData;  // 获取权限的加密用户信息
    var code = this.data.code;  // 获取login的登陆返回的code
   
    if (typeof encryptedData == "undefined" && typeof iv == "undefined") {
        Utils.showModal("授权失败");
        this.setData({      // 点击的时候过程中不让点击
            ztBool: false
        })
    } else {
        this.getPhoneRequest(iv, encryptedData, code);  // 执行
    }

},
getPhoneRequest: function (iv, encryptedData, code) {    // 请求接口解密用户信息
    var _this = this;
    Utils.requestFn({
        url: '/index.php/wxencrypt?server=1',
        data: {
            content: encryptedData,
            iv: iv,
            code: code
        },
        success: function (res) {
            console.log(res)
            if (res.data.status) {
                var userphone = res.data.data.phoneNumber;
                _this.getPhoneLoginFn(userphone);   // 穿参请求登录接口
            } else {
                Utils.showModal(res.data.message);
            }
            _this.setData({      // 点击的时候过程中不让点击
                ztBool: false
            })
        }
    })

},
getPhoneLoginFn: function (mun) {     // 获取登陆手机完成登陆
    var _this = this;
    Utils.requestFn({
        url: '/index.php/phonelogin?server=1',
        method: "POST",
        data: {
            userphone: mun
        },
        success: function (res) {

            if (res.data.status) {
                _this.hrefFn();
                loginJson = {                // 存储登陆状态      
                    image: res.data.data.image,
                    nickname: res.data.data.nickname,
                    sdk: res.data.data.sdk,
                    status: res.data.data.status,
                    telphone: res.data.data.telphone,
                    types: res.data.data.type,
                    uid: res.data.data.uid
                }
                Utils.setStorage("login", loginJson);     // 存储到本地缓存
            } else {
                Utils.showModal(res.data.message);
            }
        }
    })
}
 })