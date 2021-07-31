// pages/fabuhuoyuan/fabuhuoyuan.js
const years = ['今天','明天']
function getDate(num){
  const date = new Date()
  date.setDate(date.getDate()+num);
  var m = (date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1);//获取当前月份的日期，不足10补0
  var d = date.getDate()<10?"0"+date.getDate():date.getDate();//获取当前几号，不足10补0
  return m+"月"+d+"日";
}
for (let i = 2; i <= 6; i++) {
  years.push(getDate(i)) 
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree:false,
    issearchr:true,
    serchlist:[],
    wuliu:false,
    chexing:false,
    shijian:false,
    huowu:'',
    region: [],
    customItem: '全部',
    months:[
      '全天','01:00-06:00','07:00-12:00','13:00-18:00','19:00-24:00'
    ],
    years,
    value:[0,0,0],
    sjtext:''
  },
  bindChange(e) {
    const val = e.detail.value
    this.setData({sjtext:this.data.years[val[0]]+" "+this.data.months[val[1]]})
  },
  bindAgreeChange: function (e){
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
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

  },
  //关闭搜索物流
  closeWl: function(){
    this.setData({wuliu:!this.data.wuliu})
  },
  
  closeCx: function(){
    this.setData({chexing:!this.data.chexing})
  },
  closeSj: function(){
    this.setData({shijian:!this.data.shijian})
  },
  //点击查询
  bindsearch: function(e){
    var keywords = e.detail.value
    if(keywords){
      //显示一个查询列表
      var list = [{title:'零食','tag':'包装食品'},
      {title:'零食','tag':'包装食品'},
      {title:'零食','tag':'包装食品'},
      {title:'零食','tag':'包装食品'}]
      //热门类型隐藏
      this.setData({
        serchlist:list,
        issearchr:false
      })
    }else{
      this.setData({
        serchlist:[],
        issearchr:true
      })
    }
  },
  //选择货物类型
  choose: function(e){
    var huowu=e.currentTarget.dataset.name
    //设置选择的货物
    //搜索框及其他部分都隐藏
    this.setData({
      huowu:huowu,

    })
  }

})