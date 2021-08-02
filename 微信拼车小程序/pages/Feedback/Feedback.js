// pages/Feedback/Feedback.js

var imglength = 9;
var urlArr = [];
var formSubmitdata;
var imgneturl = [];

Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  // 输入事件
  bindinput: function (e) {
    // console.log(e.detail.value);
    if (e.detail.value >= 12) {
      this.setData({
        submit: "submit"
      })
    }
  },
  // 选择图片
  addimg: function () {
    var that = this;
    wx.chooseImage({
      count: imglength, // 默认9
      sizeType: ['original '], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths);
        var imgfill = res.tempFilePaths;
        for (var i = 0; i < imgfill.length; i++) {
          urlArr.push(imgfill[i]);
        }

        // console.log(urlArr)
        imglength = 9 - urlArr.length;
        that.setData({
          urlArr: urlArr
        })

      }
    })
  },
  // 删除图片
  removeimg: function (e) {
    // console.log(e.target.id);
    var imgid = e.target.id
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否移除这张图片',
      success: function (res) {
        if (res.confirm) {
          urlArr.splice(imgid, 1)
          that.setData({
            urlArr: urlArr
          })

        } else if (res.cancel) {

        }
      }
    })
  },
  // 表单
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var feedback = e.detail.value.feedback;
    formSubmitdata = e.detail.value
    if (feedback.length > 12) {
      this.imgudata()
    }

  },

 
  lodingto: function () {
    wx.showLoading({
      title: lodingtitile,
      icon: 'loading',

    })
  },
  closeloding: function () {
    wx.hideLoading()
  },
  tishikuang: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '网络错误，确认重试',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定');
          that.requirenet()
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  }
})