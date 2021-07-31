import { getTestAnswer, postTest } from '../../api/test.js';
const app = getApp();
Page({
     /**
      * 页面的初始数据
      */
     data: {
          info: [],
          current: 0,
          type_text: {
               judge: '判断题',
               onechoice: '单选题',
               manychoice: '多选题',
          },
          form: {},
          answercard:false,
          isLog:true,
          options:null,
          usabletime:0,
          islimit:true
     },
     onLoad: function (options) {
          let that = this;
          this.setData({
               options: options
          });
     },
     showAnswercard: function () {
          this.setData({
               answercard: true
          });
     },
     closeAnswercard: function () {
          this.setData({
               answercard: false
          });
     },
     setInter: null,
     //开始订单计时器
     startSetInter: function () {
          let that = this;
          if (that.data.islimit) {
               var usabletime = that.data.usabletime;
               that.setInter = setInterval(
                    function () {
                         if (usabletime > 0) {
                              usabletime = usabletime - 1;
                              that.setData({
                                   usabletime: usabletime
                              });
                         } else {
                              clearInterval(that.setInter);
                              that.postTest(true,1);
                         }
                    }, 1000);
          }
     },
     prevItem: function () {
          var current = this.data.current;
          --current;
          if (current >= 0) {
               this.setData({
                    current: current,
               });
          }
     },
     nextItem: function () {
          var current = this.data.current;
          ++current;
          if (current <= (this.data.info.itemList.length - 1)) {
               this.setData({
                    current: current,
               });
          }
     },
     changeItem:function(e){
          var index = e.currentTarget.dataset.index;
          console.log(this.data.form[19]);
          this.setData({
               current: index
          });
     },
     stopTouchMove: function () {
          return false;
     },
     clickPost: function () {
          let that = this;
          console.log(this.data.form);
          var form_length = Object.keys(this.data.form).length;
          var test_length = this.data.info.itemList.length;
          var msg = '再次确定是否交卷？交卷后不可继续答题！';
          if (form_length < test_length) {
               msg = '您还有' + (test_length - form_length) + '道题未作答，确定交卷吗？';
          }
          wx.showModal({
               title: '提示',
               content: msg,
               success: function (res) {
                    if (res.confirm) {
                         that.postTest();
                    }
               }
          });
     },
     postTest: function (auto = false,status = 1) {
          
          let that = this;
          console.log(status);
          //先停止倒计时
          var form = that.data.form;
          var usetime = that.data.usetime;
          postTest({ id:that.data.testuser.id, form: form, status: status }).then(res => {
               
               if (status == 1){
                    var msg = '已提交';
                    if (auto) {
                         msg = '时间到！已提交';
                    }
                    wx.showModal({
                         title: '提示',
                         content: msg,
                         showCancel: false,
                         success: function (res) {
                              if (res.confirm) {
                                   //app.Tips({ title: msg }, { tab: 5, url: 'result?id='+that.data.testuser.id });
                                   wx.redirectTo({
                                        url: 'result?id='+that.data.testuser.id,
                                   })
                              }
                         }
                    });
               }
          });
     },
     radioChange: function (e) {
          var id = e.currentTarget.dataset.id;
          this.setData({
               ["form." + id]: e.detail.value
          });
     },
     checkboxChange: function (e) {
          var id = e.currentTarget.dataset.id;
          this.setData({
               ["form." + id]: e.detail.value
          });
     },
     onShow: function () {
          let that = this;
          this.setData({
               isLog: app.globalData.isLog,
          });
          if (app.globalData.isLog) {
               getTestAnswer({ id: that.data.options.id }).then(res => {
                    //获取当前时间戳
                    var timestamp = Date.parse(new Date());
                    timestamp = timestamp / 1000;
                    var info = res.data.info;
                    var testuser = res.data.testuser;
                    wx.setNavigationBarTitle({
                         title: info.title,
                    })
                    that.setData({
                         info: info,
                         form:res.data.form,
                         testuser: testuser,
                         islimit: info.limittime > 0 ? true : false
                    },function(){
                         if (info.limittime > 0 && timestamp >= (testuser.createtime + info.limittime)){
                              //直接提交
                              that.setData({
                                   usabletime: 0,
                              });
                              that.postTest(true, 1);
                         }else{
                              that.setData({
                                   usabletime: (testuser.createtime + info.limittime) - timestamp,
                              });
                              that.startSetInter();
                         }
                    });
               });
          }
     },
     onUnload:function(){
          let that = this;
          clearInterval(that.setInter);
     }
})