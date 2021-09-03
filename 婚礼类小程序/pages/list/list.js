Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // 外面的弹窗
  btn: function () {
    this.setData({
      showModal: true
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function() {
  },

  // 弹出层里面的弹窗
  ok: function () {
    this.setData({
      showModal: false
    })
  },
  // 跳转到列表页面
  jump_List_xq: function () {
    wx.navigateTo({
      url: '../list_xq/list_xq',
    })
  },
 
})
　　