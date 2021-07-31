import { getArticleDetail } from '../../api/api.js';
const app = getApp();
Page({
     data: {
          info: null
     },
     onLoad: function (options) {
          let that = this;

          getArticleDetail({ id: options.id}).then(res => {
               var info = res.data;
               info.content = info.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
               that.setData({
                    info: info
               });
          });
     },
     onShareAppMessage: function () {
          return {
               title:this.data.info.title,
               path:"/pages/article/show?id="+this.data.info.id
          };
     }
})