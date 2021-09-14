const urlApi = require('../../../utils/server.api.js')
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible1: false,
    active:"#1498d9",
    notActive:"#fff",
    sickList:[]
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeMan: function (e) {
      var id = e.currentTarget.dataset.id;
      var arr = this.data.sickList;
      for (var i in arr){
        if (id == arr[i].PATIENT_ID){
          arr[i].color = this.data.active
          app.globalData.changeMan.changeMan(arr[i])
        }else{
          arr[i].color = this.data.notActive
        }
      }
      this.setData({
        sickList: arr,
        visible2: false
      })
    },

    sickList: function (param) {
      var that = this;
      var arr = param;
      for (var i in arr) {
        if (arr[i].PATIENT_ID == app.globalData.sickCard) {
          arr[i].color = that.data.active
        } else {
          arr[i].color = that.data.notActive
        }
      }
      that.setData({
        visible2: true,
        sickList: arr
      });
      return;
      wx.request({
        url: urlApi.getScikList2() + "?WID=" + app.globalData.openid,
        method: "get",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {},
        success: function (reponse) {
          var arr = reponse.data.LIST;
           for(var i in arr){
             if (arr[i].PATIENT_ID == app.globalData.sickCard){
               arr[i].color = that.data.active
             }else{
               arr[i].color = that.data.notActive
             }
           }
          that.setData({
            visible2: true,
            sickList: arr
          });
        }
      })
    },
    /**
     * 搜索结果类别
     */
    gotoSearchList: function () {
      wx.navigateTo({
        url: '../searchlist/searchlist'
      })
    },

    handleOpen2:function() {
      this.sickList(app.globalData.sickList);
    },

    handleCancel2 () {
        this.setData({
            visible2: false
        });
    },

    handleClickItem2() {
      const action = [...this.data.actions2];
      action[0].loading = true;

      this.setData({
        actions2: action
      });

      setTimeout(() => {
        action[0].loading = false;
        this.setData({
          visible2: false,
          actions2: action
        });
        $Message({
          content: '删除成功！',
          type: 'success'
        });
      }, 2000);
    }
  }
})