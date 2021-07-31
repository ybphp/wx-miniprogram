import { getTestDetail } from '../../api/test.js';
import { doCollect, getCollectStatus } from '../../api/user.js';
const app = getApp();
Page({
     /**
      * 页面的初始数据
      */
     data: {
          info: [],
          isLog:true,
          collect:0,
          loginShow:false,
          options:null
     },
     onLoad: function (options) {
          let that = this;
          that.setData({
               options: options
          });
     },
     onShow: function () {
          let that = this;
          this.setData({
               isLog: app.globalData.isLog
          });
          getTestDetail({ id: that.data.options.id }).then(res => {
               var info = res.data;
               //设置标题
               wx.setNavigationBarTitle({
                    title: info.title,
               })
               that.setData({
                    info: info
               });
          });
          if (app.globalData.isLog) {
               
               this.getCollect();

          }
     },
     loginAfter:function(){
          this.getCollect();
          if (this.data.loginAftertype == 'collect'){
               this.collect();
          } else if (this.data.loginAftertype == 'answer'){
               wx.redirectTo({
                    url: 'answering?id=' + this.data.info.id,
               })
          }
     },
     getCollect:function(){
          let that = this;
          getCollectStatus({test_id:that.data.options.id}).then(res=>{
               that.setData({
                    collect: res.data
               });
          });
     },
     collect:function(){
          let that = this;
          if (!app.globalData.isLog) {
               that.setData({
                    loginShow:true,
                    loginAftertype: 'collect'
               });
               return false;
          }
          if(this.data.collect){
               app.Tips({title:"您已收藏！"});
          }else{
               doCollect({ type: "collect", test_id: that.data.options.id }).then(res => {
                    that.setData({
                         collect: 1
                    });
               });
          }
          
     },
     doAnswer:function(){
          let that = this;
          if (!app.globalData.isLog) {
               that.setData({
                    loginShow: true,
                    loginAftertype:'answer'
               });
               return false;
          }
          wx.navigateTo({
               url: 'answering?id='+this.data.info.id,
          })
     }
})