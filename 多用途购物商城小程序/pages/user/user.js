const app = getApp(); // 获取 App实例

// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_profile: "https://img.alicdn.com/tfs/TB13O4jeKOSBuNjy0FdXXbDnVXa-188-188.png?getAvatar=avatar_.webp",
    dear_count: "https://gw.alicdn.com/tfs/TB1Us_ja7voK1RjSZFNXXcxMVXa-436-63.png_.webp",
    user_setting_list: "https://gw.alicdn.com/tfs/TB14SIfXrrpK1RjSZTEXXcWAVXa-54-54.png_.webp",
    user_setting_defaut: "https://gw.alicdn.com/tfs/TB1dbweXwHqK1RjSZFgXXa7JXXa-57-54.png_.webp",
    meta: [{ count: 27, types:  "收藏夹"},
      { count: 9, types:  "关注店铺"},
      { count: 75, types:  "足迹"},
      { count: 13, types:  "红包卡券"}
    ],
    order: [
      { bg: "https://gw.alicdn.com/tfs/TB16GolmKuSBuNjy1XcXXcYjFXa-87-87.png_.webp", text: "代付款", count: 0 },
      { bg: "https://gw.alicdn.com/tfs/TB1cwzgmMmTBuNjy1XbXXaMrVXa-87-87.png_.webp", text: "待发货", count: 0 },
      { bg: "https://gw.alicdn.com/tfs/TB1b3zgmMmTBuNjy1XbXXaMrVXa-87-87.png_.webp", text: "待收货", count: 2 },
      { bg: "https://gw.alicdn.com/tfs/TB1fOKqm_tYBeNjy1XdXXXXyVXa-87-87.png_.webp", text: "评价", count: 5 },
      { bg: "https://gw.alicdn.com/tfs/TB1fMzgmMmTBuNjy1XbXXaMrVXa-87-87.png_.webp", text: "退款/售后", count: 0 },
    ],
    tools: [
      { bg: "https://gw.alicdn.com/tfs/TB1AmfQjXzqK1RjSZFoXXbfcXXa-96-96.png_.webp", text: "集能量赢红包" },
      { bg: "https://gw.alicdn.com/tfs/TB14uMzX46I8KJjy0FgXXXXzVXa-96-96.png?getAvatar=avatar_.webp", text: "领券中心" },
      { bg: "https://gw.alicdn.com/tfs/TB1H2rqtkOWBuNjSsppXXXPgpXa-96-96.png?getAvatar=avatar_.webp", text: "闲置换钱" },
      { bg: "https://gw.alicdn.com/tfs/TB1ZIuoQXXXXXa6XXXXXXXXXXXX-96-96.png?getAvatar=avatar_.webp", text: "客服小蜜" },
      { bg: "https://gw.alicdn.com/tfs/TB1co0DgSzqK1RjSZFHXXb3CpXa-96-96.png_.webp", text: "3小时公益" },
      { bg: "https://gw.alicdn.com/tfs/TB1q0T8mpOWBuNjy0FiXXXFxVXa-96-96.png_.webp", text: "主题换肤" },
      { bg: "https://gw.alicdn.com/tps/TB1RN1QPXXXXXaqXFXXXXXXXXXX-96-96.png_.webp", text: "我的评价" },
      { bg: "https://gw.alicdn.com/tfs/TB1_9U2bMMPMeJjy1XbXXcwxVXa-96-96.png_.webp", text: "更多" }
    ],
    userInfo: {},
    canLogin: wx.canIUse('button.open-type.btn-getUserInfo'), // 能否使用登录按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.userInfo) {
      console.log('未登录');
      wx.redirectTo({
        url: '/pages/login/login',
        url: `/pages/login/login?from=${this.route}&tab=true`,
      })
    } else {
      this.setData({ userInfo: app.globalData.userInfo })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})