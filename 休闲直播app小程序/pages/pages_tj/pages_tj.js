// pages/pages_tj/pages_tj.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs:[
      {
        img:"../image/欢乐球吃球.jpg",
        name:"欢乐球吃球"
      },
  {
      img:"../image/王者荣耀.png",
      name:"王者荣耀"
  },
  {
  img:"../image/火影忍者.jpg",
  name:"火影忍者"
  },
  {img:"../image/狼人杀世界.jpg",
  name:"狼人杀世界"
  },
  {img:"../image/球球大作战.png",
  name:"球球大作战"
  },
  {img:"../image/天天狼人杀.png",
  name:"天天狼人杀"
  },
  {img:"../image/新游中心.jpg",
  name:"新游中心"
  },
  {img:"../image/阴阳师.jpg",
      name:"阴阳师"
  }],
    slider: [{
        picUrl:"../image/1.jpg",
        id:"1"
    },{
        picUrl:"../image/2.jpg",
        id:"2"
    },{
        picUrl:"../image/3.jpg",
        id:"3"
    }],


    image:[
    {
      img:"../image/排行榜.png",
      title:"排行",
      id:"排行"
    },
    {
      img:"../image/消息.png",
        title:"消息",
        id:"消息"
    },{
      img:"../image/活动.png",
        title:"活动",
        id:"活动"
    },{
      img:"../image/直播.png",
        title:"直播",
        id:"直播"
    }],
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
    swiperCurrent:0,
    navbar: ['推荐', '手游', '娱乐','游戏','趣玩'],
    currentTab: 0
  },
recommend_tr_tap: function (){
  wx.navigateTo({
    url:'/pages/pages_qw/pages_qw'
  })
},

  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
},


swiperChange:function(e){
  this.setData({
      swiperCurrent: e.detail.current
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
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
