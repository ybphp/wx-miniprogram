import { getTestRank } from '../../api/test.js';
const app = getApp();
Page({
     data: {
          list:[],
          testInfo:null
     },
     onLoad: function (options) {
          let that = this;
          getTestRank({ id: options.id}).then(res=>{
               that.setData({
                    list:res.data.list,
                    testInfo: res.data.testInfo,
               });
          });
     }
})