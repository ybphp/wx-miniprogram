//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mimadaoh:'关于我们',
    // banner
    imgs_banner: [
      {url: '../../images/banner.jpg' ,
        banner_text: '关于我们', 
        banner_text_xq: '这个一个神奇的事情', 
      },
      { url: '../../images/banner1.jpg',
        banner_text: '美美的你', 
        banner_text_xq: '赵举梅是个绝顶大美女赵举梅是个绝顶大美女',  
       },
       {
        url: '../../images/banner2.jpg',
        banner_text: '美美的你',
        banner_text_xq: '赵举梅是个绝顶大美女赵举梅是个绝顶大美女',
      },
      {
        url: '../../images/banner3.jpg',
        banner_text: '美美的你',
        banner_text_xq: '赵举梅是个绝顶大美女赵举梅是个绝顶大美女',
      },
      {
        url: '../../images/banner4.jpg',
        banner_text: '美美的你',
        banner_text_xq: '赵举梅是个绝顶大美女赵举梅是个绝顶大美女',
      }
    ],
    currentSwiper:0, 
    autoplay: true
  },
  // banner自定义小圆点
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  }, 

  //  
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  // dfe
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  // 跳转到列表页面
  jump_List:function(){
    wx.navigateTo({
      url: '../list/list',
    })
  },
  jump_List_xq: function () {
    wx.navigateTo({
      url: '../list_xq/list_xq',
    })
  },
  jump_lingquan: function () {
    wx.navigateTo({
      url: '../lingquan/lingquan',
    })
  },

  // 给个

 
})





