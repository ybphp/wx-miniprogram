import authLogin from '../../utils/autuLogin.js';
Component({
     options: {
          multipleSlots: true
     },
     properties: {
          show: {
               type: Boolean,
               value: false,
          },
          goBack:{
               type: Boolean,
               value: true,
          },
     },
     data: {
     },
     methods: {
          cancel: function () { 
               if (this.data.goBack) {
                    wx.navigateBack({
                         delta: 1
                    });
               }
               this.triggerEvent("cancelAfter") 
          },
          updateUserInfo: function () {
               let that = this;
               authLogin().then(res => {
                    that.triggerEvent("loginAfter");
               }).catch(res => {
                    wx.showToast({
                         title: '登录失败',
                         icon:'none'
                    });
                    setTimeout(function () {
                         wx.navigateBack({
                              delta: 1
                         })
                    }, 2000);
                    
               });
          } 
     },
})