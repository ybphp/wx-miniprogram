// pages/tabbar_zb/tabbar_zb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    image_sp:[{
      img:"../image/4.jpg",
      title:"【英雄联盟官方赛事】恭喜lpl获得亚洲对抗赛冠军"
    },{
      img:"../image/5.jpg",
      title:"【Riot、LCS】欧美对抗赛决赛-TSMvsUOL重播"
    },{
      img:"../image/6.jpg",
      title:"【主播油条】不正紧的中单变态流小剑圣！"
    },{
      img:"../image/7.jpg",
      title:"【暴走的鲨鱼辣椒】国服第一刀妹带你上王者"
    },{
      img:"../image/8.jpg",
      title:"【边缘OB】 2017LCK夏季赛7月11日重播"
    },{
      img:"../image/9.jpg",
      title:"【太原马超】中单王者游戏理解，让你制霸三路"
    }],
    navbarpageone:['常用', '全部', '热门游戏','王者荣耀','客厅游戏'],
    navbarpagetwo:['移动游戏', '颜值', '科技','文娱课堂','正能量'],
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
   navbarTap: function(e){
     this.setData({
       currentTab: e.currentTarget.dataset.idx
     })
 },
  onLoad: function (options) {

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
