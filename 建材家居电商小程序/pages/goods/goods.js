// pages/goods/goods.js
const app = getApp();
const IMGURL = app.globalData.imgUrl;
const WXURL = app.globalData.wxUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getCate: [],
    getBus: [],
    IMGURL: IMGURL,
    cateSlt: 0,
    isAll: 1,
    showNav: false,
    keywords: '',
    busNav: '',
    current_page: 1,
    last_page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCate();
    this.getBus();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 调用接口数据渲染滚动导航区
  getCate() {
    var that = this;
    wx.request({
      url: WXURL + 'cate/index/',
      success: (res) => {
        // console.log(res);
        that.setData({
          getCate: res.data.data
        })
      }
    })
  },
  // 调用数据渲染商家列表页
  getBus() {
    var that = this;
    if (!that.data.keywords) {
      that.setData({
        keywords: ''
      })
    }
    wx.request({
      url: WXURL + 'shop/index',
      data: {
        name_: that.data.keywords,
        cate_id: that.data.cateSlt,
        paixu: that.data.busNav,
        page: 1,
      },
      success: (res) => {
        console.log(res)
        if (res.data.code != 0) {
          that.setData({
            getBus: []
          })
          return false;
        }
        that.setData({
          getBus: res.data.data.data,
          last_page: res.data.data.last_page,
          current_page: 1,
        })
      },
    })
  },

  // 点击导航内容项更改字体颜色
  bindCate(e) {
    var that = this;
    if (e.target.dataset.select == 0) {
      that.setData({
        cateSlt: 0,
        isAll: 1

      });
    } else {
      that.setData({
        cateSlt: e.target.dataset.select,
        isAll: 0
      });
    }
    this.getBus();
    // 获取当前点击的排行ID并赋值
  },

  // 点击显示全部分类
  downNav() {
    var that = this;
    that.setData({
      showNav: !that.data.showNav
    })
  },

  // 点击任意分类 -> 隐藏全部分类
  bindSubnav(e) {
    var that = this;
    that.setData({
      cateSlt: e.target.dataset.select,
      showNav: !that.data.showNav
    })
    this.getBus();
  },

  // 商家排行导航区点击更改字体颜色
  busNav(e) {
    var that = this;
    // 获取当前点击的导航ID值
    that.setData({
      busNav: e.target.dataset.nav,

    });
    // 调用接口数据
    this.getBus();
  },
  // 搜索输入完成时触发
  keywords(e) {
    var that = this;
    // 获取当前输入的keywords并赋值
    that.setData({
      keywords: e.detail.value
    })
    // 调用接口数据
    this.getBus();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
     
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  //   wx.showToast({
  //     title: '正在加载',
  //     icon: 'loading',
  //     duration: 10000
  //   })
  //   var that = this;
  //   wx.request({
  //     url: WXURL + 'shop/index',
  //     success: (res) => {
  //       that.setData({
  //         getBus: res.data.data.data
  //       });
  //     },
  //     complete: () => {
  //       //结束下拉刷新
  //       wx.stopPullDownRefresh();
  //       setTimeout(() => {
  //         wx.hideToast();
  //       }, 600)
  //     }
  //   })

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var current_page = that.data.current_page
    var page = current_page + 1;
    if (current_page < that.data.last_page) {
      wx.request({
        url: WXURL + 'shop/index',
        data: {
          page: page,
          name_: that.data.keywords,
          cate_id: that.data.cateSlt,
          paixu: that.data.busNav
        },
        success: (res) => {
          that.setData({
            current_page: res.data.data.current_page,
            getBus: that.data.getBus.concat(res.data.data.data),

          })
        },
        complete: () => {
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})