// pages/group/groupdetail/groupdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuff: [],
    token: wx.getStorageSync('token'),
    id: '',//group传值
    name: '',
    project: '',
    manager: '',
    startdate: '',
    enddate: '',
    resources: '',
    tabOne: true,
    tabTwo: false,
    bordercolor1: 'orange',
    color1: 'black',
    bordercolor2: '#999999',
    color2: '#999999',
    seat: '',
    computer: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
    var startdate = `${year}-${month}-${day}`
    console.log(startdate);
    this.setData({
      name: options.name,
      manager: options.manager,
      startdate: startdate,
      enddate: startdate,
      id: options.id,
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
  tabOne() {
    this.setData({
      tabOne: true,
      tabTwo: false,
      color1: 'black',
      bordercolor1: 'orange',
      color2: '#999999',
      bordercolor2: '#999999'
    })
  },
  tabTwo() {
    var that = this;
    that.setData({
      tabOne: false,
      tabTwo: true,
      color1: '#999999',
      bordercolor1: '#999999',
      color2: 'black',
      bordercolor2: 'orange'
    })
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Team/getUsersByTeamId',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        id: that.data.id,
      },
      method: 'GET',
      success(res) {
        console.log(res)
        let list = [];
        for (let i = 0; i < res.data.length; i++) {
          list.push(res.data[i]);
        }
        that.setData({
          stuff: list
        })
        console.log(that.data.list);
      }
    })

  },
  projectnameInput(e) {
    this.setData({
      project: e.detail.value
    })
  },
  bindEndDateChange(e) {
    console.log(e)
    this.setData({
      enddate: e.detail.value
    })
  },
  bindStartDateChange(e) {
    console.log(e)
    this.setData({
      startdate: e.detail.value
    })
  },
  computerInput(e) {
    this.setData({
      computer: e.detail.value
    })
  },
  seatInput(e) {
    this.setData({
      seat: e.detail.value
    })
  },
  otherInput(e) {
    this.setData({
      resources: e.detail.value
    })
  },
  entered() {
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Team/entranceTeam',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        id: this.data.id,
        token: this.data.token,
        projectName: this.data.project,
        projectDes: '',
        projectStartDate: this.data.startdate,
        projectEndDate: this.data.enddate,
        projectPosition: this.data.resources,
        projectPC: this.data.computer,
        projectSeat: this.data.seat
      },
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.data[0].data == '申请成功') {
          wx.showToast({
            title: '申请已提交',
            duration: 2000,
            mask: true
          })
          setTimeout(function () {
            wx.navigateBack({
              url: '../group'
            })
          }.bind(this), 2000)
        }
      }
    })
  },
  confirm(e) {
    var that = this;
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Team/admitUserJoinTeam',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        appUserId: that.data.stuff[e.currentTarget.id].appUserId,//for列表取id
        teamId: that.data.stuff[e.currentTarget.id].teamId
      },
      method: 'GET',
      success(res) {
        console.log(res)
        wx.showToast({
          title: '已同意',
          duration: 2000,
          mask: true
        })
        // setTimeout(function() {

        // })
      }
    })
  },
  cancel(e) {
    var that = this;
    console.log(e.currentTarget.id)
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Team/rejectUserJoinTeam',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        appUserId: that.data.stuff[e.currentTarget.id].appUserId,//for列表取id
        teamId: that.data.stuff[e.currentTarget.id].teamId
      },
      method: 'GET',
      success(res) {
        console.log(res)
        wx.showToast({
          title: '已拒绝',
          duration: 2000,
          mask: true
        })
      }
    })
  }
})