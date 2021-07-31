import { getMyAnswer} from '../../api/user.js';
const app = getApp();
Page({

     /**
      * 页面的初始数据
      */
     data: {
          isLog: true,
          list:[],
          loginDialog:true,
          loading: false,
          loadend: false,
          limit: 8,
          page: 1,
          loadTitle: '加载更多',
     },
     onShow: function () {
          this.setData({
               isLog: app.globalData.isLog,
               page:1,
               loadend:false
          });
          if (app.globalData.isLog) {
               this.loadList();
          }
     },
     loadList:function(cb){
          let that = this;
          if (this.data.loading) return;
          if (this.data.loadend) return;
          that.setData({ loading: true, loadTitle: '正在加载' });
          getMyAnswer({page:that.data.page,limit:that.data.limit}).then(res => {
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
          })
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

     loginAfter:function(){
          this.loadList();
     }
})