import { getAnswerDetail } from '../../api/user.js';
const app = getApp();
Page({
     /**
      * 页面的初始数据
      */
     data: {
          info: null,
          current: 0,
          type_text: {
               judge: '判断题',
               onechoice: '单选题',
               manychoice: '多选题',
          },
         
          answercard: false,
          options:null,
          isLog:true
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          this.setData({
               options: options
          });
     },
     showAnswercard: function () {
          this.setData({
               answercard: true
          });
     },
     closeAnswercard: function () {
          this.setData({
               answercard: false
          });
     },
   
     prevItem: function () {
          var current = this.data.current;
          --current;
          if (current >= 0) {
               this.setData({
                    current: current,
               });
          }
     },
     nextItem: function () {
          var current = this.data.current;
          ++current;
          if (current <= (this.data.info.itemList.length - 1)) {
               this.setData({
                    current: current,
               });
          }
     },
     changeItem: function (e) {
          var index = e.currentTarget.dataset.index;
          this.setData({
               current: index
          });
     },
     stopTouchMove: function () {
          return false;
     },
    
     radioChange: function (e) {
          var id = e.currentTarget.dataset.id;
          this.setData({
               ["form." + id]: e.detail.value
          });
     },
     checkboxChange: function (e) {
          var id = e.currentTarget.dataset.id;
          this.setData({
               ["form." + id]: e.detail.value
          });
     },
     loginAfter:function(){
          let that = this;
          getAnswerDetail({ id: that.data.options.id }).then(res => {
               console.log(res.data);
               that.setData({
                    info: res.data
               });
          });
     },
     onShow: function () {
          let that = this;
          that.setData({
               isLog: app.globalData.isLog
          });
          if (app.globalData.isLog){
               that.loginAfter()
          }  
     }
})