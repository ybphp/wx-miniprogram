
Page(
  {
    data: {
      // 屏幕可用宽高
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().screenHeight,
      // 图片预览本地文件路径
      previewImageUrl: null
    }
    ,
    onReady(){
      this.buildPosterSaveAlbum()
    }
    ,
    buildPosterSaveAlbum: function () {
      let that = this;
      wx.showLoading({
        title: '图片生成中',
      })

      // 获取图1信息
      // tip 貌似本地静态文件路径不能作为画布的src参数，网络图片无影响。
      let promise1 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: '../../assets/imgs/sharecode_bg_head.png',
          success: function (res) {
            console.log(res);
            resolve(res);
          },
          fail: function (res) {
            console.log(res);
            reject(res)
          }
        })
      });

      // 获取图2信息
      let promise2 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: '../../assets/imgs/sharecode_bg_head.png',
          success: function (res) {
            resolve(res);
          },
          fail: function (res) {
            reject(res)
          }
        })
      });

      // 执行
      Promise.all(
        [promise1, promise2]
      ).then(res => {

        // 获取宽高
        let wW = that.data.windowWidth;
        let wH = that.data.windowHeight;

        // 定义画布上下文常量
        const ctx = wx.createCanvasContext('firstCanvas');

        //背景白色
        ctx.setFillStyle('#fc9949');
        //从x=0,y=0开始绘制白色
        ctx.fillRect(0, 0, wW, wH);

        /* 绘制图像到画布  图片的位置你自己计算好就行 参数的含义看文档 */
        //图1
        ctx.drawImage(res[0].path, wW * 0.05, wW * 0.2, wW * 0.9, wW * 0.9);
        //图2
        ctx.drawImage(res[1].path, wW * 0.05, wW * 0.05, wW * 0.1, wW * 0.1);
        /* 绘制文字 位置自己计算 参数自己看文档 */
        ctx.setFillStyle('#000000');
        ctx.setFontSize(15);

        let str = '目标文字';
        // 绘制文字
        ctx.fillText(str, wW * 0.05, wW * 1.17)

        /*保存上下文 绘制 */
        // ctx.save();
        ctx.draw();

        //destWidth值越大图片越清晰/大小成正比 解决画布模糊的问题
        //详细的参数见画布文档
        wx.canvasToTempFilePath({
          canvasId: 'firstCanvas',
          width: wW,
          height: wH,
          destWidth: wW * 3,
          destHeight: wH * 3,
          quality: 1,
          success: function success(res) {
            console.log('转图片结果');
            // 关闭loading
            wx.hideLoading();
            // 到page对象的data中
            that.setData({
              previewImageUrl: res.tempFilePath
            })

            //可写成函数调用 这里不做解释
            wx.saveImageToPhotosAlbum({
              filePath: that.data.previewImageUrl,
              success(res) {
                //保存成功
                console.log(res);
              },
              fail: function (res) {
                wx.showToast({
                  icon: 'fail',
                  title: 'sorry 保存失败,请稍后再试',
                })
                return;
              }
            })
          },
          complete: function complete(e) {
            console.log(e.errMsg);
          }
        });
      }).
        catch(err => {
          //error 错误处理
        })
    }

  }
);