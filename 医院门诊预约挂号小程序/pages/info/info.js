// pages/info/info.js
const urlApi = require('../../utils/server.api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoImgURL: '../../images/2.jpg',
    name:"",
    address:"",
    phone:"",
    intro:""
  },

  goBranchList: function (e) {
    wx.navigateTo({
      url: '/pages/department/department?type='+e.currentTarget.dataset.type
    })
  },

  //去楼层本部页面
  goTower: function (e) {
    wx.navigateTo({
      url: '/pages/tower/tower?type=' + e.currentTarget.dataset.type
    })
  },

  //去楼层本部页面
  goBranchLocation: function (e) {
    wx.navigateTo({
      url: '/pages/branchLocation/branchLocation?type=' + e.currentTarget.dataset.type
    })
  },

  //去医院简介页面
  goHospitalInfo: function (e) {
    wx.navigateTo({
      url: '/pages/hospitalInfo/hospitalInfo'
    })
  },

  //获取医院的简介
  getHospitalIntro:function(){
    var that = this;
    wx.request({
      url: urlApi.getHospitalIntro(),
      method:"get",
      data:{},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(response){
        var obj = response.data;
        if (obj.code === 0){
          that.setData({
            name: obj.data.name,
            address: obj.data.address,
            phone: obj.data.phone,
            intro: obj.data.intro
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHospitalIntro();
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

  }
})