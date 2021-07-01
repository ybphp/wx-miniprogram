var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["全部", "待付款", "待发货","待收货","待评价"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    listsAll:[0,1],
    listsPay: [0,],
    listsSend: [0,1,3],
    listsGet: [],
    listsJudge: [0,1,2],
    listItem: [
      { id: '1', title: 'Apple/苹果iPhone 11 ProMAX官网旗舰店256G全网通国行正品iPhone11手机', img: '../../assets/imgs/listImg2.png', num: '3', price: '34.99', attr: '属性1;属性2' },
      { id: '2', title: 'Apple/苹果iPhone 11 ProMAX官网旗舰店256G全网通国行正品iPhone11手机', img: '../../assets/imgs/listImg2.png', num: '3', price: '34.99', attr: '属性1;属性2' }
    ]
  },
  onLoad: function (option) {
    console.log(option);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    // 根据前页面传过来的参数显示tab内容
    this.setData({
      // sliderOffset: this.data.sliderOffset,
      activeIndex: option.id
    });
  },
  tabClick: function (e) {
    console.log(e);
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
  ,
  toHomePage() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  toDetail() {
    wx.navigateTo({
      url: '../orderDetail/orderDetail'
    })
  }
});