// pages/user/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    index: 0,
    list: [],
    content: '',
    characterNum: 0,
    phoneNo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  wx.request({
    
    url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Common/queryCode?userId=admin&passWord=0192023a7bbd73250516f069df18b500',
    data: {
      codeType: 'feedbackType'
    },
    method: 'GET',
    success(res){
      console.log(res.data)
      let list = [];
      list.push("必填")
      for (let i=0; i<res.data.length; i++) {
        console.log(res.data[i].value)
        list.push(res.data[i].value)
      }
      console.log(list)
      that.setData ({
          list: list
      })
    }
  })
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
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  textareaInput(e) {
    var that = this;
    console.log(e)
    if (e.detail.value.length>140) {
      wx.showToast({
        title: '字数超限',
        duration: 1000,
        mask: true
      })
      setTimeout(function() {
        that.setData({
          content: ''
        })
      }.bind(that), 1000)
    }else {
      that.setData({
        content: e.detail.value,
        characterNum: e.detail.value.length
      })
    }

  },
  phoneInput(e) {
    this.setData({
      phoneNo: e.detail.value
    })
  },
  makePhoneCall(){
    wx.makePhoneCall({
      phoneNumber: '18857191951' 
    })
  },
  submit() {
    var that = this;
    if (that.data.characterNum == 0) {
      wx.showToast({
        title: '未输入内容',
        duration: 2000,
        icon: 'loading'
      })
      return;
    }
    else if (that.data.index == 0) {
      wx.showToast({
        title: '未选择类型',
        duration: 2000,
        icon: 'loading'
      })
      return;
    } else {
      wx.request({
        url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_feedback/sumbitFeedback?userId=admin&passWord=0192023a7bbd73250516f069df18b500',
        data: {
          content: that.data.content,
          feedbackType: that.data.index - 1,
          phoneNo:that.data.phoneNo
        },
        method: 'GET',
        success(res) {
          if(res.data.data == "提交成功"){
            wx.showToast({
              title: '提交成功',
              duration: 2000,
              icon: 'success'
            })
            setTimeout(function(){
              wx.navigateBack({
                url: '../../user/user',
              })
            }.bind(this), 2000)
          }
        }
      })
    }
  }
  
})