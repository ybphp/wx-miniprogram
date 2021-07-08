// const path = 'http://127.0.0.1:3000/api/v1/';
const path = 'http://192.168.1.104:3000/api/v1/';
module.exports = {
  get(apiUrl, yes, error) {
    wx.request({
      url: path + apiUrl,
      header: { 'Content-Type': 'json' },
      success: yes,
      fail: error
    })
  },
  post(apiUrl, params, yes, error) {
    wx.request({
      url: path + apiUrl,
      method: "POST",
      data: params,
      header: { 'Content-Type': 'json' },
      success: yes,
      fail: error
    })
  }
}