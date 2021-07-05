// pages/account/register.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
import WxValidate from '../../utils/validate';

var inputContent = {};//输入内容
Page({

    /**
     * 页面的初始数据
     */
    data: {
        paracont: "获取验证码",//验证码文字
        vcdisabled: true,//验证码按钮状态
        verifycode: "",//返回的验证码
        usertype: [  //用户类型
            {value: 1, name: '信息供应者', checked: 'true'},
            /*         {value: 2, name: '回收商'}*/
        ],
        utitem: [ //用户类型数组
            {value: 2, name: '上门回收者'},
            {value: 3, name: '货场'},
            {value: 4, name: '二手商家'},
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    /**
     * radio发生change事件
     */
    radioChange: function (e) {
        if (e.target.dataset.current == 0) {
            console.log('用户类型radio发生change事件，携带value值为：', e.detail.value)
        } else if (e.target.dataset.current == 1) {
            console.log('回收商类型radio发生change事件，携带value值为：', e.detail.value)
        }
    },
    /**
     * 获取用户输入
     */
    bindChange: function (e) {
        inputContent[e.currentTarget.id] = e.detail.value;
        util.verifyCodeBtn(e, this);
    },
    /**
     * 获取验证码
     */
    getVerifyCode: function (e) {
        var that = this;
        util.getVerifyCode(inputContent['user'], this, function (data) {
            that.setData({
                verifycode: data.data
            })
        })

    },
    /**
     * 注册提交
     */
    registerSubmit: function (e) {
        var that = this;
        //验证表单
        that.WxValidate = new WxValidate({
                user: {  //验证规则 input name值
                    required: true,
                    tel: true
                },
                password: {
                    required: true,
                    minlength: 6
                },
                confirmpassword: {
                    required: true,
                    minlength: 6
                },
                verifycode: {
                    required: true,
                },
                invitecode: {
                    required: true,
                }
            },
            {
                user: { //提示信息
                    required: "请填写真实手机号码",
                },
                password: { //提示信息
                    required: "请填写密码",
                    minlength: "密码至少输入6个字符"
                },
                confirmpassword: { //提示信息
                    required: "请填写确认密码",
                    minlength: "确认密码至少输入6个字符"
                },
                verifycode: { //提示信息
                    required: "请填写验证码"
                },
                invitecode: { //提示信息
                    required: "请填写邀请码"
                }
            })


        util.wxValidate(e, that, function () {
            /*     console.log(wx.getSystemInfoSync().platform);*/
            if (inputContent.confirmpassword != inputContent.password) {
                util.toolTip(that, "两次输入的密码不一致")
                return;
            }
            if (that.data.verifycode != inputContent.verifycode) {
                util.toolTip(that, "验证码输入不正确")
                return;
            }
            util.https(app.globalData.api + "/api/user/regnew", "POST", {
                    account: inputContent.user,
                    password: inputContent.password,
                    confirmpassword: inputContent.confirmpassword,
                    code: inputContent.verifycode,
                    client: 0,
                    openID: wx.getStorageSync("openid"),
                    invitecode: inputContent.invitecode,
                    services: [1]
                },
                function (data) {
                    if (data.code == 1001) {
                        wx.setStorageSync("userid", data.data.userid);
                        wx.setStorageSync("usersecret", data.data.usersecret);
                        //接口API授权 type 1.是公共授权  2.登录授权
                        util.authorization(2, function () {
                            //根据会员ID获取会员账号基本信息
                            util.getUserInfo(function (data) {
                                wx.navigateTo({ //完善资料
                                    url: 'organizingdata'
                                })
                            })
                        }, true);

                    } else {
                        util.toolTip(that, data.message);
                    }
                }
            )
        })


    }
})