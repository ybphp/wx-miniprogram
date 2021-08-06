var app = getApp()
var util_date = require('../../utils/index/date.js')

Page({
  data: {
    countdown: util_date.countdown, //倒计时天数
    date: util_date.date, //今天的日期
  },

  onReady: function() {
    this.diary = this.selectComponent("#diary") //获得diary组件
  },

  //获取计划
  getPlan: function() {
  },

  onLoad: function() {
    //数据在 login 页面就应该获取完了
    this.setData({
      plan: app.globalData.plan, //计划
      goal: app.globalData.goal, //目标
      motto: app.globalData.motto, //座右铭
    })
  },

  //点击 星标按钮
  clickStar: function(e) {
    // 计划下标，从0开始
    var index = e.currentTarget.dataset.index
    // 获取计划列表
    var plans = this.data.plan
    var flag = plans[index]['flag_star'] // 获取星标状态
    plans[index]['flag_star'] = !flag //修改对应计划的星标状态
    //设置新的列表
    this.setData({
      plan: plans
    })
  },

  //点击 修改按钮
  goToModify() {
    wx.navigateTo({
      url: '../index/modify/modify',
    })
  },

  /* 考研小日志 diary 对话框 */
  //显示对话框事件
  showDiary() {
    this.diary.showDiary();
  },

  //回调 取消事件
  _error() {
    console.log('你点击了取消');
    this.diary.hideDiary();
  },
  //回调 确认事件
  _success() {
    console.log('你点击了确定');
    this.diary.hideDiary();
  },
  // 展示所有的日志，跳转到菜单页面的考研日志
  showAllDiary(){
    wx.navigateTo({
      url: '../menu/menu-content/diary/diary',
    })
  }

})