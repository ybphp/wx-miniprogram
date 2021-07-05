
var Http = require('../utils/http');
var Storage = require('./storage');

class Restful {

  static getHeader() {
    return {
      'content-type': 'application/json',
      'token': Storage.getToken()
    };
  }

  static normalizeUrl(url) {
    return CONF.DEV.DOMAIN + url;
  }

  static get(url) {
    return new Promise((resolve, reject) => {
      Http.get(this.normalizeUrl(url), this.getHeader())
        .then(
        res => {
          if (res.data.success) {
            resolve(res.data.data);
          } else {
            reject(res.data.err);
          }
        },
        err => {
          reject(err);
        }
        );
    });
  }

  static post(url, data) {
    return new Promise((resolve, reject) => {
      Http.post(this.normalizeUrl(url), data, this.getHeader())
        .then(
        res => {
          if (res.data.success) {
            resolve(res.data.data);
          } else {
            reject(res.data.err);
          }
        },
        err => {
          reject(err);
        }
        );
    });
  }

  static put(url, data) {
    return new Promise((resolve, reject) => {
      Http.put(this.normalizeUrl(url), data, this.getHeader())
        .then(
        res => {
          if (res.data.success) {
            resolve(res.data.data);
          } else {
            reject(res.data.err);
          }
        },
        err => {
          reject(err);
        }
        );
    });
  }

  static delete(url) {
    return new Promise((resolve, reject) => {
      Http.delete(this.normalizeUrl(url), this.getHeader())
        .then(
        res => {
          if (res.data.success) {
            resolve(res.data.data);
          } else {
            reject(res.data.err);
          }
        },
        err => {
          reject(err);
        }
        );
    });
  }

}

module.exports = Restful;