//获取应用实例
var app = getApp();
Page({
  data: {
    navigate_type: '',//分类类型，是否包含二级分类
    slideWidth: '',//滑块宽
    slideLeft: 0,//滑块位置
    totalLength: '',//当前滚动列表总长
    slideShow: false,
    slideRatio: ''
  },
  onLoad: function () {
    var self = this;
    var systemInfo = wx.getSystemInfoSync();
    self.setData({
      list: _list,
      windowHeight: app.globalData.navigate_type == 1 ? systemInfo.windowHeight : systemInfo.windowHeight - 35,
      windowWidth: systemInfo.windowWidth,
      navigate_type: app.globalData.navigate_type
    })
    //计算比例
    self.getRatio();
  },
  //根据分类获取比例
  getRatio() {
    var self = this;
    if (!self.data.tlist[self.data.currentTab].secondList || self.data.tlist[self.data.currentTab].secondList.length <= 5) {
      this.setData({
        slideShow: false
      })
    } else {
      var _totalLength = self.data.tlist[self.data.currentTab].secondList.length * 150; //分类列表总长度
      var _ratio = 230 / _totalLength * (750 / this.data.windowWidth); //滚动列表长度与滑条长度比例
      var _showLength = 750 / _totalLength * 230; //当前显示红色滑条的长度(保留两位小数)
      this.setData({
        slideWidth: _showLength,
        totalLength: _totalLength,
        slideShow: true,
        slideRatio: _ratio
      })
    }
  },
  //slideLeft动态变化
  getleft(e) {
    this.setData({
      slideLeft: e.detail.scrollLeft * this.data.slideRatio
    })
  }
})