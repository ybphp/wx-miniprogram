// pages/user/user.js
const AV = require('../../utils/av-weapp-min');
const { User } = require('../../utils/av-weapp-min');

Page({
  data:{
    user: null,
    employee: '',
    username: '',
    password: ''
  },
  onLoad:function(options){
    console.log(User.current())
    this.setData({
      user: User.current(),
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  updateEmpid: function(e){
    this.setData({
      employee: e.detail.value
    })
  },
  updatePassword: function(e){
    this.setData({
      password: e.detail.value
    })
  },
  save: function(){
    wx.showLoading({
      title: '绑定中',
    })

    var usr = this.data.employee;
    var psw = this.data.password;
    AV.User.logIn(usr, psw).then(user => {
      // 将当前的微信用户与当前登录用户关联    
      user.linkWithWeapp().then(wx.hideLoading());
      wx.navigateBack({delta: 1})    
    }, () => {
      wx.hideLoading();
      wx.showModal({
        title: '绑定失败',
        content: '请检查输入的检查用户名和密码。',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }).catch(console.error);
  }
})