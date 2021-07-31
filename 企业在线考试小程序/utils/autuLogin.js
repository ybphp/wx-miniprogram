import util from './util.js';
import { login } from './../api/user.js';

export default function authLogin(){
     return new Promise((reslove, reject) => {
          util.autoLogin().then(userInfo => {
               login({ code: userInfo.code.code, rawData: userInfo.rawData }).then(res => {
                    getApp().globalData.token = res.data.userInfo.token;
                    getApp().globalData.userInfo = res.data.userInfo;
                    getApp().globalData.isLog = true;
                    wx.setStorageSync('token', res.data.userInfo.token);
                    reslove();
               }).catch(err=>{
                    reject();
               });
          }).catch(err=>{
               reject();
          });
     })
}