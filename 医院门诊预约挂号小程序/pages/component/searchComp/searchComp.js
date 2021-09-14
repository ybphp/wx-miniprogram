// pages/component/searchComp/searchComp.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 搜索结果类别
     */
    gotoSearchList: function () {
      wx.navigateTo({
        url: '../searchlist/searchlist'
      })
    },
  }
})
