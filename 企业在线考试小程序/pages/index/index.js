import { getAdList, getArticleList, getSubjectList, testReward } from '../../api/api.js';
const app = getApp();
Page({
     data: {
          articleList: [],
          adList:[],
          subjectList:[],
          menuList:[]
     },
     onLoad: function (options) {
          this.loadData();
     },
     loadData:function(){
          let that = this;
          getAdList({ position: 'indexbn', limit: 5 }).then(res => {
               that.setData({
                    adList: res.data
               });
          });
          getAdList({ position: 'indexmenu', limit: 8 }).then(res => {
               that.setData({
                    menuList: res.data
               });
          });
          getArticleList().then(res => {
               that.setData({
                    articleList: res.data
               });
          });
          getSubjectList().then(res => {
               that.setData({
                    subjectList: res.data
               });
          });
     },
     onPullDownRefresh: function () {
          this.loadData();
          wx.stopPullDownRefresh();
     },
     onShareAppMessage: function () {

     },
     test_reward:function(){
          testReward().then(res=>{
               console.log(res);
          });
     }
})