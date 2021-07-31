// pages/components/custom-tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#C4E1F7",
    selectedColor: "#2F84D8",
    backgroundColor: "#ffffff",
    list: [{
      pagePath: "pages/home/home",
      text: "首页",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png"
    }, {
      pagePath: "pages/order/order",
      text: "订单",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png"
    },{
      pagePath: "pages/index/index",
      text: "我的",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png"
    }]  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})
