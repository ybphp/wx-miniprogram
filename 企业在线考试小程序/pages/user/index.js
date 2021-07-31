import authLogin from '../../utils/autuLogin.js';
import { getSiteInfo } from '../../api/api.js';
import { getUserData } from '../../api/user.js';
const app = getApp();
Page({

     /**
      * 页面的初始数据
      */
     data: {
          isLog:false,
          userInfo:{},
          siteInfo:{},
          total_answer:0,
          total_test: 0,
          total_collect: 0,
          total_reward:0,
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          let that = this;
          getSiteInfo().then(res=>{
               that.setData({
                    siteInfo:res.data
               });
          });
     },
     loginAfter:function(){
          let that = this;
          getUserData().then(res=>{
               that.setData({
                    total_answer: res.data.total_answer,
                    total_test: res.data.total_test,
                    total_collect: res.data.total_collect,
                    total_reward: res.data.total_reward
               });
          });
     },
     /**
      * 生命周期函数--监听页面显示
      */
     onShow: function () {
          if (app.globalData.isLog){
               this.setData({
                    userInfo: app.globalData.userInfo,
                    isLog: app.globalData.isLog
               });
               this.loginAfter();
          }
     },

   
     call:function(e){
          let value = e.currentTarget.dataset.value;
          wx.makePhoneCall({
               phoneNumber: value,
          })
     },
     onPullDownRefresh: function () {
          if (app.globalData.isLog) {
               this.loginAfter();
               
          }
          wx.stopPullDownRefresh();
     },

     openMap:function(){
          if (this.data.siteInfo){
               wx.openLocation({
                    latitude: parseFloat(this.data.siteInfo.coordinate.lat),
                    longitude: parseFloat(this.data.siteInfo.coordinate.lng),
                    scale:18,
                    name: this.data.siteInfo.name,
                    address: this.data.siteInfo.address
               })
          }
     },
     doLogin:function(e){
          let that = this;
          wx.showLoading({
               title: '登录中',
          })
          authLogin().then(res=>{
               wx.hideLoading();
               that.setData({
                    userInfo:app.globalData.userInfo,
                    isLog: app.globalData.isLog
               }); 
               that.loginAfter();
          }).catch(res=>{
               wx.hideLoading();
               app.Tips({title:"登录失败"});
          });
     }
})