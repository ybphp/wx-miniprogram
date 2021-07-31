import { getAnswerResult } from '../../api/user.js';
const app = getApp();
Page({
     data: {
          userInfo:null,
          options:null,
          info:null,
          testInfo:null
     },
     onLoad: function (options) {
          this.setData({
               options: options
          });
     },
     onShow: function () {
          let that = this;
          if (app.globalData.isLog){
               that.setData({
                    userInfo: app.globalData.userInfo
               });
          }
          getAnswerResult({id:that.data.options.id}).then(res=>{
               that.setData({
                    info:res.data.info,
                    testInfo:res.data.testInfo
               });
          });
     }
})