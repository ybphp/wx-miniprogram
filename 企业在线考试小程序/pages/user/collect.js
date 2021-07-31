import { getCollect, doCollect } from '../../api/user.js';
const app = getApp();
Page({

     /**
      * 页面的初始数据
      */
     data: {
          isLog: true,
          list: [],
          loginDialog: true,
          loading: false,
          loadend: false,
          limit: 8,
          page: 1,
          loadTitle: '加载更多',
     },
     onShow: function () {
          this.setData({
               isLog: app.globalData.isLog
          });
          if (app.globalData.isLog) {
               this.loadList();
          }
     },
     loadList: function (cb) {
          let that = this;
          if (this.data.loading) return;
          if (this.data.loadend) return;
          that.setData({ loading: true, loadTitle: '正在加载' });
          getCollect().then(res => {
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
     /**
      * 页面上拉触底事件的处理函数
      */
     onReachBottom: function () {
          this.loadList();
     },
     onClose:function(e){
          const { position, instance } = e.detail;
          switch (position) {
               case 'right':
                    instance.close();
                    break;
          }
     },
     loginAfter: function () {
          this.loadList();
     },
     cancelCollect:function(e){
          let that = this;
          let index = e.currentTarget.dataset.index;
          doCollect({ test_id: that.data.list[index].test_id,type:'cancel'}).then(res=>{
               var list = that.data.list;
               list.splice(index, 1);
               that.setData({
                    list: list,
               })
          });
     }
})