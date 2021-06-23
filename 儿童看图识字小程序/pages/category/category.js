// pages/category/category.js
let utils = require('../../utils/util.js')
let appInstance = getApp();

Page({
  data:{
    imgs:[],
    src:'',
    duration: 1000,
    circular: true,
    type:''
  },
  onLoad:function(options){
    let type = options.type;
    console.log(type)
    this.setData({
      type:type
    });

    this.handleLoad(type);    
  },
  onReady:function(){
    // 页面渲染完成
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  onShow:function(){
    // 页面显示
    let src = appInstance.globalData.yuyinUrl.replace('placeholder',utils.imgUrls[this.data.type][0].name);
    this.setAudio(src);
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  handleLoad(type){
    let self = this;

    self.setData({
      imgs:utils.imgUrls[type]
    })
  },
  handleChange: function(e) {
    let src = appInstance.globalData.yuyinUrl.replace('placeholder',utils.imgUrls[this.data.type][e.detail.current].name);
    this.setAudio(src);
  },
  setAudio: function(src) {
    this.setData({
      src:src
    })
  },
  // 音频相关
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },

  // 事件处理函数
  handleToDetail(){
    // wx.navigateTo({
    //   url:"/pages/detail/detail"
    // })
  }
})