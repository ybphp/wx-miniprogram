// pages/settings/settings.js
//获取应用实例
const AV = require('../../utils/av-weapp-min');
const { User } = require('../../utils/av-weapp-min');

var app = getApp()
Page({
  data:{
    user: null,
    userInfo: {},
    employeeId: '',
    inputStatus: false,
    languages: ["简体中文", "English", "日本語"], // "繁体中文", "日本語" may be supported in the future
    index: 0,                                    // current default selected item
    UI: [ 
      {title: "设置", language: "选择语言", currentLan: "当前选择", employeeIdTitle: "雇员编号", currentId: "如有疑问请联系人事部门", employeeId: 'EMP10086RD', save: "保存", accountMg: "账户管理", bind: "绑定COMPANY账户", unbind: "解除绑定", unbindMsgTitle: "解除账户绑定" , unbindMsgContent: "我已知晓解除与COMPANY账户的绑定后，将导致部分功能不可用。"},
      {title: "Settings", language: "Change Language", currentLan: "Current", employeeIdTitle: "Employee ID", currentId: "Contact HR Dept.", employeeId: 'EMP10086RD', save: "Save Changes", accountMg: "Account Manage", bind: "Bind with COMPANY ID", unbind: "Unbind COMPANY ID", unbindMsgTitle: "Unbind Account" , unbindMsgContent: "I am aware unbinding COMPANY ID will cause some features to be unavailable."},
      {title: "設定", language: "言語変更", currentLan: "選択項目", employeeIdTitle: "社員番号", currentId: "人事部に連絡してください.", employeeId: 'EMP10086RD', save: "保存", accountMg: "账户管理", bind: "绑定COMPANY账户", unbind: "解除绑定", unbindMsgTitle: "解除账户绑定" , unbindMsgContent: "我已知晓解除与COMPANY账户的绑定后，将导致部分功能不可用。"}
      ]
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    
    //储存用户对语言的选择
    try {
      wx.setStorageSync('selectedLanguage', e.detail.value);
      app.globalData.settings.language = e.detail.value; //setting global value for app language
    } catch (e) {    
      console.log('储存用户语言选择失败！');
    }
  },
  onLoad:function(options){
    // 设置app语言的全局变量
    var selectedLanguage = app.globalData.settings.language;
    var employeeId = app.globalData.settings.employeeId;
    if(employeeId !== null){
      status = true 
    }


    this.setData({      
      index: selectedLanguage,
      employeeId: employeeId,
      inputStatus: status    
    })
  },
  onShow:function(){
    // 页面显示
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {        
        that.setData({
          user: User.current(),
          userInfo: res.data
        })
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      employeeId: e.detail.value
    })
  },
  save:function(){
    var selectedLanguage = app.globalData.settings.language;
    var title = ["已保存", "Saved", "保存完了"][selectedLanguage];
    wx.setStorageSync('employeeId', this.data.employeeId);
    app.globalData.settings.employeeId = this.data.employeeId;
    wx.showToast({      
      title: title,
      icon: "success",
      duration: 1500
    })
    // 更新视图
    this.setData({
      inputStatus: true,
      employeeId: this.data.employeeId
    })
  },
  unbind:function(){
    var that = this;
    var index = that.data.index;
    var UI = that.data.UI;
    var title = UI[index].unbindMsgTitle;
    var content = UI[index].unbindMsgContent;
    
    wx.showModal({
      title: title,
      content: content,
      success: function(res) {
        if (res.confirm) {
          console.log(AV.User.current());
          AV.User.logOut().then(console.log('Log out'));
          
          console.log(AV.User.current());
          that.setData({
            user: AV.User.current()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})