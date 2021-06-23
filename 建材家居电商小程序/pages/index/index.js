//index.js
//获取应用实例
const app = getApp();
const IMGURL = app.globalData.imgUrl;
const WXURL = app.globalData.wxUrl;

Page({
  data: {
    advs: [],
    decorate:[],
    duration: 1000,
    interval: 3000,
    indicatorColor: '#fff',
    indicatorActiveColor: '#d1a87a',
    autoplay: true,
    circular: true,
    message: '公益验房',
    indicatorDots: true,
    IMGURL:IMGURL
  },
  
  onLoad: function () {
    this.getAdvs();
    this.getDecorate();
  },
  getAdvs() {
    var that =this;
    wx.request({
      url: WXURL + 'ad/index',
      success: (res)=> {
        that.setData({
          advs: res.data.data
        })
      }
    })
  },
  getDecorate() {
    var that = this;
    wx.request({
      url: WXURL + 'article/index_show',
      success: (res) => {
        that.setData({
          decorate: res.data.data
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
