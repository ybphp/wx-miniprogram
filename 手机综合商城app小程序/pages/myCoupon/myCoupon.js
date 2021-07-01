var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["未使用", "已使用", "已失效"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    coupon1:[
      { price: "20", title: '优惠券名称', time:'2018-2-12至2019-2-12'},
      { price: "20", title: '优惠券名称', time: '2018-2-12至2019-2-12' }
    ],
    coupon2: [
      { price: "20", title: '优惠券名称', time: '2018-2-12至2019-2-12' },
      { price: "20", title: '优惠券名称', time: '2018-2-12至2019-2-12' }
    ],
    coupon3:[
      { price: "20", title: '优惠券名称', time: '2018-2-12至2019-2-12' },
      { price: "20", title: '优惠券名称', time: '2018-2-12至2019-2-12' }
    ]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2+10,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});