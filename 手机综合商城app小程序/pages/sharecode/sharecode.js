// pages/sharecode/sharecode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flagPoster: true,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().screenHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showPoster() {
    this.setData({
      flagPoster: false
    });
    wx.showLoading({
      title: '海报生成中...',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

    let wW = this.data.windowWidth;
    let wH = this.data.windowHeight;
    setTimeout(function(){
      wx.hideLoading();
      // 定义画布上下文常量
      const ctx = wx.createCanvasContext('canvas');
      //背景红色
      ctx.setFillStyle('#ff5b40');
      //从x=0,y=0开始绘制背景色
      ctx.fillRect(0, 0, wW*0.853333,wW*1.306666);
      ctx.drawImage('../../assets/icons/details_share_poster_ic_head_def.png', wW * 0.048, wW * 0.048, wW * 0.130666, wW * 0.130666);
      ctx.drawImage('../../assets/imgs/sharecode_poster_pop_bg.png', wW * 0.048, wW * 0.24, wW * 0.757333, wW *0.96);
      ctx.drawImage('../../assets/imgs/miniPro.png', wW * 0.213333, wW * 0.333333, wW * 0.426666, wW * 0.426666);
      /* 绘制文字 位置自己计算 参数自己看文档 */
      ctx.setFillStyle('#fff');
      let str1 = '用户名';
      let str2 = '发现了一家好店，邀您查看';
      let str3 = '小程序名称';
      let str4 = '长按图片识别图中二维码进入“小程序名称”';
      let str7 = '一起寻找好物';
      let str5 = '我的专属邀请码';
      let str6 = '292345';
      // 绘制文字
      ctx.setFontSize(15);
      ctx.fillText(str1, wW *0.197333, wW *0.096);
      ctx.setFontSize(12);
      ctx.fillText(str2, wW * 0.197333,wW*0.158);
      ctx.setFillStyle('#282828');
      ctx.setFontSize(15);
      ctx.fillText(str3, wW * 0.328, wW * 0.805333);
      // ctx.fillText('小程序44名称', (ctx.width - ctx.measureText('小程序44名称').width) / 2, wW * 0.55);
      ctx.setFillStyle('#C5C5C5');
      ctx.setFontSize(10);
      ctx.fillText(str4, wW * 0.2, wW * 0.872);
      ctx.fillText(str7, wW * 0.36, wW *0.92);
      ctx.setFillStyle('#282828');
      ctx.setFontSize(12);
      ctx.fillText(str5, wW * 0.317333, wW *1.053333);
      ctx.setFillStyle('#F44225');
      ctx.setFontSize(18);
      ctx.fillText(str6, wW *0.346666, wW *1.12);

      /*保存上下文 绘制 */
      ctx.draw();
    },1000)
    
  },
  hidePoster() {
    this.setData({
      flagPoster: true
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(current);
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
  saveImg() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: 'canvas',
      success: function (res) {
        let shareImg = res.tempFilePath;
        that.setData({
          shareImg: shareImg
        })
        // wx.hideLoading()
        },
      fail: function (res) {
      }
    })

    let that = this;
    // 获取用户是否开启用户授权相册
    wx.getSetting({
      success(res) {
        // 如果没有则获取授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum({
                filePath: that.data.shareImg,
                success() {
                  wx.showToast({
                    title: '保存成功'
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            },
            fail() {
              // 如果用户拒绝过或没有授权，则再次打开授权窗口
              //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
              that.setData({
                openSet: true
              })
            }
          })
        } else {
          // 有则直接保存
          wx.saveImageToPhotosAlbum({
            filePath: that.data.shareImg,
            success() {
              wx.showToast({
                title: '保存成功'
              })
            },
            fail() {
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  }
})