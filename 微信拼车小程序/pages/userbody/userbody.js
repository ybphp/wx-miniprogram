// pages/userbody/userbody.js
// pages/user/user.js
var app = getApp();


var tel
Page({
  data: {
    huoquyanzhengma: "",
    submit: "",

  },
  onLoad: function (options) {

    var that = this
    wx.getStorage({
      key: 'tel',
      success: function (res) {
        console.log(res.data);
        tel = parseInt(res.data);
        that.setData({
          tel: tel
        })
      },
      fail: function (res) {
        tel = ""
        that.setData({
          tel: tel
        })
      },
      complete: function (res) {
        that.indexRequest();
        that.lodingto()
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    //这里写用户下拉的时候你执行的动作，如：发起wx.request请求一次，或者其他请求
    this.indexRequest();
  },
  // 进入详情页
  tocaruser: function (e) {

    var id = e.target.id
    wx.navigateTo({
      url: '../userto/userto?id=' + id + ''
    })
  },
  // 请求服务器
  indexRequest: function () {
    // console.log(options1)
    var that = this;
    var objectid = [];
    // console.log("请求服务器")
    

  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    tel = e.detail.value.tel;
    this.indexRequest();
    this.lodingto()
    wx.setStorage({
      key: "tel",
      data: tel
    })
  },
  bindinput: function (e) {
    console.log(e.detail.value);
    if (e.detail.value.length == 11) {
      this.setData({
        submit: "submit"
      })
    } else {
      this.setData({
        submit: ""
      })
    }
  },
  lodingto: function () {
    wx.showLoading({
      title: '正在加载',
      icon: 'loading',
     
    })
  },
  closeloding: function () {
    wx.hideLoading()
  }
})