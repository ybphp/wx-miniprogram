
class Http {

  static getDefaultHeader() {
    return {
      'content-type': 'application/json'
    }
  }

  static get(url, header) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'GET',
        header: header || this.getDefaultHeader(),
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          reject(err);
        }
      })
    });
  }

  static post(url, data, header) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'POST',
        data: data,
        header: header || this.getDefaultHeader(),
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          reject(err);
        }
      })
    });
  }

  static put(url, data, header) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'PUT',
        data: data,
        header: header || this.getDefaultHeader(),
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          reject(err);
        }
      })
    });
  }

  static delete(url, header) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'DELETE',
        header: header || this.getDefaultHeader(),
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          reject(err);
        }
      })
    });
  }

}

module.exports = Http;