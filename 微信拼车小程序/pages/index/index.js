// pages/index/index.js
var app = getApp();

var shengIndex;
var shiIndex;
var xianIndex;
var qZ;
var height = '100vh';
var humanlength = 1;
var time;
var date;
var cfdate;
var qidian;
var zhongdian;
Page({
  data: {
    city_select: false,
    qZ: '',
    animationData: {},//动画
    origin: '起点',
    back: '终点',
    shi: '赣州',
    xian: "龙南县",
    shi1: '深圳',
    xian1: "龙华新区",
    size: "1",
    time: time,
    resetButton: false,
    peoplelength: [1, 2, 3, 4, 5, 6],
    objectArray: [
      { id: 0, name: 1 },
      { id: 1, name: 2 },
      { id: 2, name: 3 },
      { id: 3, name: 4 },
      { id: 5, name: 6 },
    ],
    index: 0,
    imgUrls:[
      "../../img/tel.png",
       "../../img/add.png",
        "../../img/search.png",
         "../../img/tel.png"
    ]
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      provinces: app.data.province,
      carType: app.data.carType,
    });
    this.tiemselect();
    this.huqutupian()
    this.netstart()
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
  // 上拉到底部
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  // 网络状态
  netstart: function () {
    var that = this
    console.log("正在查询网络状态")
    wx.getNetworkType({
      success: function (res) {
console.log(res.networkType)
        if (res.networkType == "none") {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '请检查数据和wifi是否打开',
            success: function (res) {

            }
          })
          that.setData({
           
            networkType:false
          })
        }else{
         
          that.setData({
            submit: "submit",
            networkType:true
          })
        }
      }
    })
  },

  // 动画二二
  donghua2: function () {
    height = '0vh';
    var animation = wx.createAnimation({

      transformOrigin: "50% 50%",
      duration: 250,
      timingFunction: "ease",
      delay: 0
    })
    animation.skew(45, -45).rotate(-180, 180, ).scale3d(0.5, 0.5, 0.5).height('50vh').step();
    animation.skew(-45, -45).rotate(180, -180).scale3d(0.1, 0.1, 0.1).height(height).step();
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {

    }.bind(this), 700);


  },
  // 动画一
  donghua: function () {
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    setTimeout(function () {
      animation.height(height).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0);

  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: '龙南人拼车',
      desc: '龙南人自己的拼车，无需任何费用',
      path: '/page/user?id=123'
    }
  },
  // 选择起点
  indexFlexQ: function () {
    qZ = 'q';
    this.qsfunction()
  },
  // 选择终点
  indexFlexZ: function () {
    qZ = 'z';
    this.qsfunction()
  },
  // 起点和终点调用函数
  qsfunction: function () {
    height = '100vh'
    this.donghua();
    this.setData({
      city_select: true,
      provinces: app.data.province,
      citys: '',
      qZ: qZ,
      areas: '',
      carLengthType: false,

    })
  },

  // 日期选择
  bindDateChange: function (e) {
    date = e.detail.value;
    this.setData({
      date: e.detail.value
    })
  },
  // 时间选择函数
  bindTimeChange: function (e) {
    time = e.detail.value
    this.setData({
      time: e.detail.value
    })
  },
  // 时间计算函数
  tiemselect: function () {

    const Date1 = new Date();
    var year = Date1.getFullYear();
    var month = Date1.getMonth() + 1
    var date1 = Date1.getDate()
    var hours = Date1.getHours()
    var minutes = Date1.getMinutes();
    var month1 = month + 1;
    // console.log(month1)
    if (month < 10) {
      month = "0" + month;
    }
    if (month1 < 10) {
      month1 = "0" + month1;
    }
    if (date1 < 10) {
      date1 = "0" + date1;
    }
    if (hours < 10) {
      hours = "0" + hours
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    date = year + "-" + month + "-" + date1;
    time = hours + ":" + minutes;

    var endtime = year + "-" + month1 + "-" + date1;
    // console.log(date);
    // console.log(time);

    this.setData({
      "endtime": endtime,
      "date": date,
      "time": time
    });

  },
  // 人数选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 确定按钮
  formSubmit: function (e) {
    console.log(e)


   
      var submitbody = e.detail.value;
      wx.navigateTo({
        url: '../body/body?qidian=' + submitbody.qidian + '&&zhongdian=' + submitbody.zhongdian + '&&userlength=' + submitbody.userlength + '&&date=' + submitbody.date + '&&time=' + submitbody.time + '&&usertype=' + submitbody.usertype + '',

      })

  



  },
  // 返回上一级
  resetBottom: function () {
    if (this.data.citys.length == 0) {
      this.setData({
        provinces: '',
        citys: app.data.city[shengIndex].cities,
        areas: '',
      })
    } else {
      this.setData({
        provinces: app.data.province,
        citys: '',
        areas: '',
      })
    }
  },
  // 点击省
  provincesBottom: function (e) {
    shengIndex = e.target.dataset.shengname;
    this.setData({
      sheng: this.data.provinces[shengIndex],
      provinces: '',
      citys: app.data.city[shengIndex].cities,
      resetButton: true,
    })
  },
  // 市
  citysBottom: function (e) {
    shiIndex = e.target.dataset.shiname;
    this.setData({
      provinces: '',
      citys: '',
      areas: app.data.area[shengIndex][shiIndex].areaes
    })
  },
  // 县
  areasBottom: function (e) {
    xianIndex = e.target.dataset.xianname;
    var sheng = app.data.province[shengIndex];
    var shi = app.data.city[shengIndex].cities[shiIndex];
    var xian = app.data.area[shengIndex][shiIndex].areaes[xianIndex];
    this.donghua2();

    if (qZ === 'q') {
      qidian = shi + "-" + xian;
      this.setData({
        shi: shi,
        xian: xian
      })
    } else {
      zhongdian = shi + '-' + xian
      this.setData({
        shi1: shi,
        xian1: xian
      })

    }

  },

  // 获取图片
  huqutupian: function () {
    var imgUrls = []
    var that = this
   

  },
  colosecity: function () {
    this.donghua2();
  }

})
