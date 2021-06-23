var utilMd5 = require("../../utils/md5.js")

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat: 0,
    log: 0,
    controls: [],
    doorSyscode: '',
    token: wx.getStorageSync('token')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: function (res) {
    //     console.log(res);
    //     that.setData({
    //       lat: res.latitude,
    //       log: res.longitude
    //     })
    //   },
    // })  

    // wx.showLoading({
    //   title: '加载中',
    // })
    // setTimeout(function(){
    //   wx.hideLoading()
    // },1500)


    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log(res);
    //     var height = res.windowHeight;
    //     var width = res.windowWidth;
    //     that.setData({
    //       controls: [
    //         {
    //           id: 1,
    //           iconPath: '../../images/location.png',
    //           position: {
    //             width: 20,
    //             height: 35,
    //             left: width / 2 - 10,
    //             top: height / 2 - 35
    //           },
    //           clickable: true
    //         },
    //         {
    //           id: 2,
    //           iconPath: '../../images/location-2.png',
    //           position: {
    //             width: 40,
    //             height: 40,
    //             left: 20,
    //             top: height - 60
    //           },
    //           clickable: true
    //         },
    //         {
    //           id: 3,
    //           iconPath: '../../images/scan.png',
    //           position: {
    //             width: 100,
    //             height: 40,
    //             left: width / 2 - 50,
    //             top: height - 55
    //           },
    //           clickable: true
    //         }
    //       ]
    //     })
    //   },
    // })
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

  tokeGenerate: function () {
    var d = new Date();
    var callTime = parseInt(d.getTime() / 1000);
    var s = callTime.toString();
    console.log(utilMd5.md5(s));


  },

  scanCode: function () {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        var result = res.result;
        var resJson = JSON.parse(result);
        console.log(resJson);
        console.log(resJson.doorSyscode);
        that.setData({
          doorSyscode: resJson.doorSyscode
        })

        console.log('hello' + that.data.doorSyscode);

        // token
        var api = '/webapi/service/acs/doDoorControlByPersonCode';
        var timestamp = new Date().getTime();
        var rawZero = '{"doorSyscode":"'
        var rawOne = '","personCode":"17091913331828103180","type":2,"appkey":"bcdaea42","time":'
        var rawTwo = '}1f9b756ba5884349a2083f49c5412cbe'
        var raw = rawZero + resJson.doorSyscode + rawOne + timestamp + rawTwo;
        var token = api + raw;
        var s = token.toString();

        console.log('66666666' + s);
        var tokenMd5 = utilMd5.md5(s);
        console.log(tokenMd5);
        wx.request({
          // url: 'https://www.wangzuowen.cn/webapi/service/acs/doDoorControlByPersonCode?token=' + tokenMd5,
          url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_parkVisitor/openTheDoor?userId=admin&passWord=0192023a7bbd73250516f069df18b500', 
          // + that.data.doorSyscode+'&personCode=17091913331828103180',
          // data: JSON.stringify({ "doorSyscode": resJson.doorSyscode, "personCode": "17091913331828103180", "type": 2, "appkey": "bcdaea42", "time": timestamp }),
          data: {
            userId: 'admin',
            passWord: '0192023a7bbd73250516f069df18b500',
            doorSyscode: that.data.doorSyscode,
            // personCode: '17091913331828103180'
            token: that.data.token
          },
          method: 'GET',
          success(res) {
            console.log(res.data)
            if(res.data.errorCode == 0) {
              wx.showToast({
                title: '开锁成功',
                duration: 2000,
                mask: true
              })
            }
          }
        })
      },
      fail: function (res) {
        console.log("44444" + res);
       },
      complete: function (res) { },
    })
  }
})