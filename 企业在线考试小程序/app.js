import util from './utils/util.js';
import { HTTP_REQUEST_URL } from './config.js';

App({
     onLaunch: function (option) {
          var that = this;
   
     },
     globalData: {
          url: HTTP_REQUEST_URL,
          token: '',
          isLog: false,
          userInfo: null
     },

     /*
     * 信息提示 + 跳转
     * @param object opt {title:'提示语',icon:''} | url
     * @param object to_url 跳转url 有5种跳转方式 {tab:1-5,url:跳转地址}
     */
     Tips: function (opt, to_url) {
          return util.Tips(opt, to_url);
     },
     /*
     * 合并数组
     * @param array list 请求返回数据
     * @param array sp 原始数组
     * @return array
     */
     SplitArray: function (list, sp) { return util.SplitArray(list, sp) },
     //构造CDN地址
     cdnurl: function (url) {
          return url.toString().match(/^https?:\/\/(.*)/i) ? url : this.globalData.config.upload.cdnurl + url;
     }
})