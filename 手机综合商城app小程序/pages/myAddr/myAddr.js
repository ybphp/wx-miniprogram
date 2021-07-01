// pages/myAddr/myAddr.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrs:[
      { addr: "广东省 广州市 白云区 什么街道", name: "用户填写", phone: "1881111111", flag:true},
      { addr: "广东省 广州市 白云区 什么街道", name: "用户填写", phone: "1881111111", flag: false }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  myaddr(){
    wx.chooseAddress({
      success: (res) => {
        console.log(res);
        let addrs=this.data.addrs;
        addrs.push({
          addr: res.provinceName+res.cityName+res.countyName+res.detailInfo,
          name:res.userName,
          phone:res.telNumber,
          flag:false
        })
        this.setData({
          addrs:addrs
        })
      },
      fail: (error) => {
        console.log(error);
        app.checkAuthorize('scope.address')
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
  toAddAddr(){
    wx.navigateTo({
      url: '../addAddr/addAddr',
    })
  },
  // 设为默认，取消默认
  setDefault(e){
    console.log(e.currentTarget.dataset.index);
    var addrs=this.data.addrs;
    for(var i=0; i<addrs.length;i++){
      if (i == e.currentTarget.dataset.index){
        addrs[i].flag = !addrs[i].flag;
      }else{
        addrs[i].flag=false;
      }
    }
    this.setData({
      addrs:addrs
    })
  },
  // 删除地址
  delAddr(){
    wx.showToast({
      title: '删除',
    })

  },
  // 编辑地址
  toDetail(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../addAddr/addAddr?id=' + e.currentTarget.dataset.id
    })
  }
})