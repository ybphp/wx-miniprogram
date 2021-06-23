var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    search: [],
    tabOne: true,
    tabTwo: false,
    borderOne: 'orange',
    colorOne: 'black',
    borderTwo: '#999999',
    colorTwo: '#999999',
    windowHeight: wx.getSystemInfoSync().windowHeight,
    width: '100',
    keyword: '',
    token: wx.getStorageSync('token')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this;
    let token = wx.getStorageSync('token');
    //查询团队
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Team/queryTeamAboutMe',
      method: 'GET',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        token: token
      },
      success(res) {
        console.log(res.data);
        let list = [];
        for (let i = 0; i < res.data.length; i++) {


          if (res.data[i].statusName == '申请中') {
            res.data[i].bgcolor = 'lightblue';
          }
          if (res.data[i].teamStatusName == '已创建') {
            res.data[i].bgcolor = '#55A15A'
          }
          if (res.data[i].teamStatusName == '已加入') {
            res.data[i].bgcolor = '#F3A26D'
          }
          if (res.data[i].teamStatusName == '已关注') {
            res.data[i].bgcolor = '#796DF3'
          }
          list.push(res.data[i]);
        }
        that.setData({
          list: list
        })
        console.log(that.data.list);
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
    var that = this;
    let token = wx.getStorageSync('token');
    //查询团队
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Team/queryTeamAboutMe',
      method: 'GET',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        token: token
      },
      success(res) {
        console.log(res.data);
        let list = [];
        for (let i = 0; i < res.data.length; i++) {


          if (res.data[i].statusName == '申请中') {
            res.data[i].bgcolor = 'lightblue';
          }
          if (res.data[i].teamStatusName == '已创建') {
            res.data[i].bgcolor = '#55A15A'
          }
          if (res.data[i].teamStatusName == '已加入') {
            res.data[i].bgcolor = '#F3A26D'
          }
          if (res.data[i].teamStatusName == '已关注') {
            res.data[i].bgcolor = '#796DF3'
          }
          list.push(res.data[i]);
        }
        that.setData({
          list: list
        })
        console.log(that.data.list);
      }
    })
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
      borderOne: 'orange',
      colorOne: 'black',
      borderTwo: '#999999',
      colorTwo: '#999999'
      // backgroundColorOne: 'black',
      // colorOne: '#EFEDED',
      // backgroundColorTwo: '#EFEDED',
      // colorTwo: 'black',
    })
  },
  tabTwo() {
    var that = this;
    that.setData({
      tabTwo: true,
      tabOne: false,
      borderOne: '#999999',
      colorOne: '#999999',
      borderTwo: 'orange',
      colorTwo: 'black'
    })
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Team/queryLastTenTeam',
      method: 'GET',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500'
      },
      success(res) {
        console.log('hello')
        console.log(res)
        let result = []
        for (let i=0; i<res.data.length; i++) {
          result[i] = res.data[i]
        }
        that.setData({
          search: result
        })
      }
    })
  },
  toCreategroup() {
    wx.navigateTo({
      url: './creategroup/creategroup',
    })
  },

  groupDetail(e) {
    // console.log(e.currentTarget.id)
    if (this.data.list[e.currentTarget.id].teamStatusName == '已加入' || this.data.list[e.currentTarget.id].teamStatusName == '已关注' || this.data.list[e.currentTarget.id].teamEnterStatus !== 0) {
      console.log('hello')
      wx.navigateTo({
        url: './groupjoin/groupjoin?name=' + this.data.list[e.currentTarget.id].teamName + '&id=' + this.data.list[e.currentTarget.id].teamId
      })
      return;
    }
    if (this.data.list[e.currentTarget.id].teamStatusName == '申请中') {

      setTimeout(function() {
        wx.showToast({
          title: '申请中',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
      }.bind(this), 0)
      return;
    }
    wx.navigateTo({
      url: './groupdetail/groupdetail?name=' + this.data.list[e.currentTarget.id].teamName + '&manager=' + this.data.list[e.currentTarget.id].createUserName + '&id=' + this.data.list[e.currentTarget.id].teamId,
    })
  },
  searchinput(e) {
    let flag = 0
    if (e.detail.value !== '') {
      this.setData({
        keyword: e.detail.value,
        width: 80
      })
    } else {
      this.setData({
        width: 100
      })
    }

  },
  inputconfirm(e) {
    var that = this;
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Team/queryALLTeam?name=' + this.data.keyword,
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        // name: this.data.keyword
      },
      method: 'GET',
      success(res) {
        console.log(res)
        let list = [];
        for (let i = 0; i < res.data.length; i++) {


          // if (res.data[i].statusName == '等待审核') {
          //   res.data[i].bgcolor = '#38718F';
          // }
          // else {
          //   res.data[i].bgcolor = '#64D54C';
          // }
          list.push(res.data[i]);
        }
        that.setData({
          search: list
        })
        console.log(that.data.list);
      }
    })
  },
  cancelHandle(e) {
    e.detail.value = ''
    this.setData({
      width: 100,
      keyword: ''
    })
  },
  toApply(e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: './apply/apply?id=' + this.data.search[e.currentTarget.id].id + '&name=' + this.data.search[e.currentTarget.id].name + '&des=' + this.data.search[e.currentTarget.id].teamDes + '&status=' + this.data.search[e.currentTarget.id].status,
    })
  }

})