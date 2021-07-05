
var CONST_CONF = require('../conf/const');

class Storage {

  static setData(key, value) {
    try {
      wx.setStorageSync(key, value);
    } catch (e) {
      console.error(e);
    }
  }

  static getData(key) {
    try {
      return wx.getStorageSync(key);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  static clear() {
    wx.clearStorage();
  }

  static getToken() {
    return this.getData(CONST_CONF.TOKEN);
  }

  static setToken(token) {
    this.setData(CONST_CONF.TOKEN, token);
  }

  static getUserInfo() {
    return this.getData(CONST_CONF.USER_INFO);
  }

  static setUserInfo(user) {
    this.setData(CONST_CONF.USER_INFO, user);
  }

  static getServiceData() {
    return this.getData(CONST_CONF.SERVICE_DATA);
  }

  static setServiceData(serviceData) {
    this.setData(CONST_CONF.SERVICE_DATA, serviceData);
  }

  static clearServiceData() {
    this.setData(CONST_CONF.SERVICE_DATA, null);
  }

  static setPayOrderGoBackForRecharge(url) {
    this.setData(CONST_CONF.PAY_ORDER_GO_BACK_4_RECHARGE, url);
  }

  static getPayOrderGoBackForRecharge() {
    this.setData(CONST_CONF.PAY_ORDER_GO_BACK_4_RECHARGE);
  }

  static getOpenId() {
    return this.getData(CONST_CONF.OPENID);
  }

  static setOpenid(openid) {
    this.setData(CONST_CONF.OPENID, openid);
  }

}

module.exports = Storage;