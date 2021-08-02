// pages/driver/driver.js

var app = getApp();
var nickName;
var cjdate;
var cjtime;
var shengIndex;
var shiIndex;
var xianIndex;
var pickPoints
var time;
var date;
var qZ;
var height = '100vh';
var contentbody;
Page({
  data: {
    peoplelength: [1, 2, 3, 4, 5, 6],
    objectArray: [
      { id: 0, name: 1 },
      { id: 1, name: 2 },
      { id: 2, name: 3 },
      { id: 3, name: 4 },
      { id: 5, name: 6 },
    ],
    form: true,
    index: 0,
    peoplename: "小伙伴"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.tiemselect();
    this.netstart();

    app.getUserInfo(function (userInfo) {
      nickName = userInfo.nickName;
      console.log(nickName)
    });

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
            networkType: false
          })



        } else {
          that.torequire()
          that.setData({
            networkType: true,
            submit: "submit"
          })
        }
      }
    })
  },
  // 人数选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  // 时间固定范围
  tiemselect: function () {

    const Date1 = new Date();
    var year = Date1.getFullYear();
    var month = Date1.getMonth() + 1
    var date1 = Date1.getDate()
    var hours = Date1.getHours()
    var minutes = Date1.getMinutes();
    var month1 = month + 1;
    console.log(month1);
    cjdate = year + "-" + month + "-" + date1;
    cjtime = hours + ":" + minutes;
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
    console.log(date);
    console.log(time)
    this.setData({
      "endtime": endtime,
      "startdate": date,
      "date": date,
      "time": time
    });

  },

  // 身份选择
  bindradio: function (e) {
    console.log(e.detail.value);
    var peoplename;
    if (e.detail.value == "司机") {
      peoplename = "剩载客"
    } else {
      peoplename = "小伙伴"
    }
    this.setData({
      peoplename: peoplename
    })
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
    pickPoints = shi + "-" + xian;
    if (qZ === 'q') {

      this.setData({
        pickPointsq: pickPoints,

      })
      // 调用请求函数

    } else {

      this.setData({
        pickPointsz: pickPoints,
      })
      // 调用请求函数


    }

  },
  colosecity: function () {
    this.donghua2();
  },
  // 表单重置
  formReset: function () {
    console.log('form发生了reset事件')
  },
  // 表单提交
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this;
    var form = e.detail.value;
    if (form.name != "") {
      if (form.tel.length == 11) {
        if (form.qidian != "") {
          if (form.zhongdian != "") {
            if (form.replenish != "") {
              
             

            } else {
              contentbody = "补充说明未填"
              that.formSubmitevet()
            }
          } else {
            contentbody = "终点未选择"
            that.formSubmitevet()
          }
        } else {
          contentbody = "起点未选择"
          that.formSubmitevet()
        }
      } else {
        contentbody = "电话号码应为11位数字"
        that.formSubmitevet()
      }
    } else {
      contentbody = "称呼未填写"
      that.formSubmitevet()
    }
  },
  // 表单提示事件
  formSubmitevet: function () {
    wx.showModal({
      title: '错误',
      content: contentbody,
      showCancel: false,
      success: function (res) {

      }
    })
  },
  twosubmit: function () {
    this.setData({
      form: true,
      datasubmitlength: 2
    })
  },
  // 查询今天发发布次数
  torequire: function () {
    var that = this;
    wx.getStorage({
      key: 'tel',
      success: function (res) {
       
       
      }
    })

  },
})