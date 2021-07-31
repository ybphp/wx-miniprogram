import { getTestList, getSubjectList } from '../../api/test.js';
const app = getApp();
Page({

     /**
      * 页面的初始数据
      */
     data: {
          list:[],
          subjectList:[],
          currentTab:0,
          options:null,
          loading: false,
          loadend: false,
          limit: 5,
          page: 1,
          loadTitle: '加载更多',
     },
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          let that = this;
          that.setData({
               options: options
          },function(){
               that.loadData();
          });
     },
     loadData:function(cb){
          let that = this;
          getSubjectList().then(res => {
               var subjectList = res.data;
               subjectList.unshift({ id: 0, title: "全部" });
               //判断是否传递subject_id
               console.log(subjectList);
               if (that.data.options.subject_id !== undefined) {
                    for (var index in subjectList) {
                         if (subjectList[index].id == that.data.options.subject_id) {
                              that.setData({
                                   currentTab: index
                              });
                         }
                    }
               }
               that.setData({
                    subjectList: subjectList,
                    options:null
               });
               that.loadList();
               typeof cb == 'function' && cb(res);
          });
     },
     loadList:function(cb){
          let that = this;
          if (this.data.loading) return;
          if (this.data.loadend) return;
          that.setData({ loading: true, loadTitle: '正在加载' });
          getTestList({ page: that.data.page, limit: that.data.limit,subject_id: that.data.subjectList[that.data.currentTab].id}).then(res => {
               let list = res.data;
               let loadend = list.length < that.data.limit ? true : false;
               that.setData({
                    list: that.data.page > 1 ? app.SplitArray(list, that.data.list) : list,
                    loadend: loadend,
                    page: that.data.page + 1,
                    loading: false,
                    loadTitle: loadend ? '已全部加载' : '加载更多',
               });
               typeof cb == 'function' && cb(res);
          });
     },

     onPullDownRefresh: function () {
          let that = this;
          that.setData({
               page: 1,
               loadend: false,
               loading: false
          }, function () {
               wx.showNavigationBarLoading();
               that.loadList(function () {
                    wx.stopPullDownRefresh();
                    wx.hideNavigationBarLoading();
               });
          })
     },
     onReachBottom: function () {
          this.loadList();
     },
     // 点击标题切换当前页时改变样式
     swichNav: function (e) {
          let cur = e.currentTarget.dataset.current;
          if (this.data.currentTab == cur) {
               return false;
          } else {
               this.setData({
                    page:1,
                    currentTab: cur,
                    loadend:false,
                    loading:false
               }, function () {
                    wx.showNavigationBarLoading();
                    this.checkCor();
                    this.loadList(function(){
                         wx.hideNavigationBarLoading();
                    });
               })
          }

     },
     //判断当前滚动超过一屏时，设置tab标题滚动条。
     checkCor: function () {
          let that = this;
          if (that.data.currentTab > 3) {
               that.setData({
                    scrollLeft: 300
               })
          } else {
               that.setData({
                    scrollLeft: 0
               })
          }
     },
})