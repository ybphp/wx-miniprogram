
var Utils = require("../../utils/util.js");
// 加载地图
var map = require('../../map/mappos.js');  

var commData = {
    image:"/images/user.png",       // 头像
    usrename:"路人",            // 姓名
    positions:"" ,      // 位置
    pos: 1,      // 判断是不是定位中的状态
    sex:"男",     //性别
    news:"0"       // 是否有消息
} 
Page({
data: commData,
onLoad: function () {
    this.getStorage();          // 加载登陆的信息
    this.newsFn();          // 请求登陆信息 获取消息中心的推送
    this.posFn();           // 获取本地存储的位置
},
onShow:function(){  // 显示的时候加载数据
    this.PersonalCenter();
    this.newsFn();          // 请求登陆信息 获取消息中心的推送
},
posFn:function(){
    var pos = wx.getStorageSync("position-type");
    if (pos){
        
        this.setData({
            positions: pos.split("-")[0]
        })
    }else{
        this.setData({
            positions: "定位失败"
        })
    }
},
getStorage:function(){
    var _this = this;
    var commDatas = _this.data;
    var loginData = wx.getStorageSync("login");
    var imageSrc = loginData.image != null ? Utils.url +loginData.image : commDatas.image;
    var nickname = loginData.nickname != null ? loginData.nickname : commDatas.usrename

    this.setData({
        image: imageSrc,
        usrename: nickname
    })
},
JumpFn:function(){            // 跳转
        wx.redirectTo({
                url: '/pages/Consultation/Consultation'
        })
},
xgUserFn:function(){   // 跳转
    wx.navigateTo({
        url: '/pages/myListModify/myListModify'
    })
},
PersonalCenter:function(){  // 获取修改的个人信息
    var loginData = wx.getStorageSync("login");
    var _this = this;
    Utils.requestFn({
        url: '/index.php/modifygetuser?server=1', 
        data: {
            sdk: loginData.sdk,
            uid: loginData.uid
        },
        success: function (res) {
            var res = res.data.data.user;
            var imageSrc = res.image != null ? Utils.url + res.image : _this.data.image;

            if (res.email != null){
               _this.setData({
                    image: imageSrc,
                    usrename:res.nickname,
                    sex: res.sex_txt
                })
            }
            
        }
    })
},
onNews:function(){
    wx.navigateTo({
        url: '/pages/myListStatic/news/news'
    })
},
newsFn:function(){  // 请求登陆消息接口的推送
    var _this = this;
    var loginData = wx.getStorageSync("login");
    Utils.requestFn({
        url: '/index.php/profile?server=1', 
        data: {
            sdk: loginData.sdk,
            uid: loginData.uid
        },
        success: function (res) {
            var resData = res.data.data.msgcount;
           _this.setData({
               news: resData
           })
        }
    })
},
onOrder:function(){   // 跳转到咨询的订单列表
    wx.navigateTo({
        url: '/pages/myListStatic/order/order'
    })
}
})