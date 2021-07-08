//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/http.js')

Page({
  data: {
    location_name:'',
    page: 0,
    page_size: 10,
    last_page: false,
    items:{}
  },
  onLoad: function () {
    if (app.globalData.location_name) {
      this.setData({ location: app.globalData.location_name })
    } else {
      let self = this;
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          app.globalData.location = res
          http.post('other/get_location_name', { "latitude": res.latitude, "longitude": res.longitude}, function (data) {
            data = data.data
            if (data.status == 1){
              self.setData({ location_name: data.data })
              app.globalData.location_name = data.data
            }else{
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 2000//持续的时间
              })
            }
          });
          self.get_shop();
        }
      })
    }
  },
    /**
         * 页面上拉触底事件的处理函数
         */
    onReachBottom: function () {
        this.get_shop();
    },
    get_shop(){
        var self = this;
        if (!this.data.last_page){
        http.post('shop/list', { "latitude": app.globalData.location.latitude, "longitude": app.globalData.location.longitude, "page": this.data.page, "page_size": this.data.page_size}, function (res) {
            self.data.page = self.data.page + 1;
            let data = res.data;
            console.log(data)
            if (data.status == 1) {
            let o_data = self.data.items,
                n_data = o_data.length > 0 ? o_data.concat(data.data) : data.data;
            self.setData({
                items: n_data
            });
            } else if (data.status == 2) {//没有下一页了
            this.data.last_page = true;
            } else {
            wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 2000//持续的时间
            })
            }
        });
        }
    },
    search(e){
        let name = e.detail.value
        if (name){
            console.log(name)
            wx.navigateTo({ url:'/pages/shop_list/shop_list?name='+name});
        }else{
            wx.showToast({
                title: '关键词不能为空',
                icon: 'none',
                duration: 2000//持续的时间
            })
        }
    }
})
