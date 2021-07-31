import { getArticleList, getCategoryList } from '../../api/api.js';
const app = getApp();
Page({
     data: {
          list: [],
          scrollLeft:0,
          categoryList:[],
          currentTab:0,
          options: null,
          loading: false,
          loadend: false,
          limit: 8,
          page: 1,
          loadTitle: '加载更多',
     },
     onLoad: function (options) {
          this.setData({
               options: options
          });
          this.loadData();
     },
     loadData:function(cb){
          let that = this;
          getCategoryList().then(res => {
               var categoryList = res.data;
               categoryList.unshift({ id: 0, title: "全部" });
               that.setData({
                    categoryList: categoryList,
                    options: null
               });
               that.loadList();
               typeof cb == 'function' && cb(res);
          });
     },
     swichNav: function (e) {
          let that = this;
          let cur = e.currentTarget.dataset.current;
          if (that.data.currentTab == cur) {
               return false;
          } else {
               wx.showNavigationBarLoading();
               that.setData({
                    page: 1,
                    currentTab: cur,
                    loadend: false,
                    loading: false
               }, function () {
                    that.checkCor();
                    that.loadList(function(res){
                         wx.hideNavigationBarLoading();
                    });
               })
          }
     },
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
     loadList:function(cb){
          let that = this;
          if (this.data.loading) return;
          if (this.data.loadend) return;
          that.setData({ loading: true, loadTitle: '正在加载' });
          getArticleList({ page: that.data.page, limit: that.data.limit, category_id: that.data.categoryList[that.data.currentTab].id }).then(res => {
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
          }, function(){
               wx.showNavigationBarLoading();
               that.loadData(function () {
                    wx.stopPullDownRefresh();
                    wx.hideNavigationBarLoading();
               });
          })
     },
     onReachBottom: function () {
          this.loadList();
     }
})