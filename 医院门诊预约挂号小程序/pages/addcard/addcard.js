// pages/addcard/addcard.js
const { $Message } = require('../../iview/base/index');
const urlApi = require('../../utils/server.api.js');
const util = require("../../utils/util.js")
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    card: '',
    phone: '',
    addrs: '',
    fruit: [{
      id: 0,
      name: '女',
    }, {
      id: 1,
      name: '男'
    }],
    position: 'left',
    animal: '熊猫',
    sex:"",
    checked: false,
    disabled: false,
    update:"",
    yesButton:"立即添加"
  },

  //姓名验证发放
  nameVerifyFun: function ({ detail }){
    var name = detail.detail.value
    if (name == undefined || name == "" || name == null){
      $Message({
        content: "名字不能为空"
      });
    }else{
      this.name = name
    }
  },

  //身份证验证发放
  cardVerifyFun: function ({ detail }) {
    var card = detail.detail.value
    if (card == undefined || card == "" || card == null) {
      $Message({
        content: "身份证不能为空"
      });
    } else {
      this.card = card
    }
    var bool = util.isInObject(app.globalData.sickList,this.card,"IDCARD");
    if (bool) {
      $Message({
        content: "身份证号码已经被使用过了继续绑定将是更新",
        duration: 5
      });
      this.setData({
        update: bool,
        yesButton:"确定更新"
      })
    }else{
      this.setData({
        update: "",
        yesButton: "立即添加"
      })
    }
  },

  //电话验证发放
  phoneVerifyFun: function ({ detail }) {
    var phone = detail.detail.value
    if (phone == undefined || phone == "" || phone == null) {
      $Message({
        content: "电话不能为空"
      });
    } else {
      this.phone = phone
    }
  },

  //地址验证发放
  addrVerifyFun: function ({ detail }) {
    var addrs = detail.detail.value
    if (addrs == undefined || addrs == "" || addrs == null) {
      $Message({
        content: "详细地址不能为空"
      });
    } else {
      console.log("地址",addrs);
      this.addrs = addrs;
    }
  },

  //获取性别
  handleFruitChange({ detail = {} }) {
    this.setData({
      current: detail.value
    });
  },

  handleDisabled() {
    this.setData({
      disabled: !this.data.disabled
    });
  },

  handleClick:function(){
    var sex = this.sex === "女"?"0":"1";
    var obj = {
      WID: app.globalData.openid,
      NAME: this.name,
      IDCARD: this.card,
      SEX: sex,
      PHONE: this.phone,
      ADDRESS: this.addrs,
      DEFAULT: 0
    }

    console.log("查看石灰粉", this.data.update)
    var obj2 = {
      WID: app.globalData.openid,
      UID: this.data.update.UID,
      NAME: this.name,
      IDCARD: this.card,
      SEX: sex,
      PHONE: this.phone,
      ADDRESS: this.addrs,
      DEFAULT: 0,
      BR_ID: this.data.update.BR_ID
      
    }
    
    var ask = this.data.update == "" ? obj : obj2;
    wx.request({
      url: urlApi.getRegisterUrl(),
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        BODY: JSON.stringify(ask)
      },
      success: function (reponse) {
        var data = reponse.data
        if (data.DATAPARAM != undefined){
          if (app.globalData.sickList.length == 0){
            app.globalData.sickName = data.NAME;
            app.globalData.BRID = data.BR_ID;
            app.globalData.SFZH = data.IDCARD;
            app.globalData.sickCard = data.PATIENT_ID;
          }
          wx.showToast({
            title: '成功',
            icon: 'success',
            complete: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/home/home',
                })
              }, 1000)
            }
          })
        } else{
          wx.showToast({
            title: '失败',
            icon: 'none',
          })
        }  
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("身份证列表", app.globalData.SFZlist)
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

  }
})