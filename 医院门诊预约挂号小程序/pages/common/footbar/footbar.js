// pages/common/footbar/footbar.js
Page({
  data: {
    current: 'home'
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  }
});