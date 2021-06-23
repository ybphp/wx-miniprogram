Page({
  data: {
    imgUrls: [
      'http://aiworks.oss-cn-beijing.aliyuncs.com/online/1.png',
      'http://aiworks.oss-cn-beijing.aliyuncs.com/online/2.png',
      'http://aiworks.oss-cn-beijing.aliyuncs.com/online/3.png'
    ],
    list: ['🎉“互联网+电力”创新基地开园', '🎉AiWorks上线', '敬请期待'],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    interval2: 11000,
    duration: 1000,
    duration2: 2000,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    btnSize: 0,
    token: wx.getStorageSync('token'),
    status: 2,
  },
  onLoad() {
    console.log('999' + this.data.token);
    var that = this;
    this.setData({
      btnSize: 0.8 * 0.32 * this.data.windowHeight,
    })
    const token = wx.getStorageSync('token')
    if (token == '') {
      wx.navigateTo({
        url: '../login/login',
      })
    }
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Common/getUserByToken?userId=admin&passWord=0192023a7bbd73250516f069df18b500',
      data: {
        token: that.data.token
      },
      method: 'GET',
      success(res) {
        console.log(res.data)
        // 1代表未审核，0代表已审核
        that.setData({
          status: res.data.data
        })
        wx.setStorage({
          key: "status",
          data: that.data.status
        })
      },
      fail(res) {
        wx.setStorage({
          key: 'status',
          data: '2',
        })
      }
    })
  },
  onShow() {
    var that = this;
    that.setData({
      token: wx.getStorageSync('token')
    })
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Common/getUserByToken',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        token: that.data.token
      },
      method: 'GET',
      success(res) {
        console.log(res.data.data)
        // 1代表未审核，0代表已审核
        that.setData({
          status: res.data.data
        })
        wx.setStorage({
          key: "status",
          data: that.data.status
        })
      },
      fail() {
        wx.setStorage({
          key: 'status',
          data: '2',
        })
      }
    })
  },
  onHide: function () {
    this.setData({
      status: 2
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  toEntrance() {
    if (this.data.status == 1 || this.data.status == 2) {
      wx.showToast({
        title: '未审核',
        icon: 'loading',
        duration: 2000,
        mask: true,
      })
    } else {
      wx.navigateTo({
        url: '../entrance/entrance',
      })
    }
  },
  toGuest() {
    if (this.data.status == 1 || this.data.status == 2) {
      wx.showToast({
        title: '未审核',
        icon: 'loading',
        duration: 2000,
        mask: true,
      })
    } else {
      wx.navigateTo({
        url: '../guest/guestdetail/guestdetail',
      })
    }
  },
  toGroup() {
    if (this.data.status == 1 || this.data.status == 2) {
      wx.showToast({
        title: '未审核',
        icon: 'loading',
        duration: 2000,
        mask: true,
      })
    } else {
      wx.navigateTo({
        url: '../group/group',
      })
    }
  },
  toPark() {
    wx.navigateTo({
      url: '../park/park',
    })
  },
  toUser() {
    wx.navigateTo({
      url: '../user/user',
    })
  }
  // test0(){
  //   wx.navigateTo({
  //     url: '../user/user',
  //   })
  // },
  // test1(){
  //   wx.navigateTo({
  //     url: '../guest/guest',
  //   })
  // },
  // test2() {
  //   wx.navigateTo({
  //     url: '../entrance/entrance',
  //   })
  // }
})