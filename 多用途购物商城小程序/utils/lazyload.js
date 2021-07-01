// if (!ctx.data.lazyLoadCount) {
//   ctx.setData({ lazyLoadCount: 4 });
// };
// var intersection = ctx.createIntersectionObserver();
// intersection.relativeToViewport({bottom: 50}).observe(imgSelector + ctx.data.lazyLoadCount, (res) => {
//   console.log(imgSelector + ctx.data.lazyLoadCount, res.boundingClientRect.top)
//   if (res.boundingClientRect.top > 0) {
//     intersection.disconnect();
//     ctx.setData({ lazyLoadCount: ctx.data.lazyLoadCount+1 });
//     LazyLoad(ctx, imgSelector)
//   };
// })

class LazyLoad {
    constructor({ ctx, ctxDataArray, imgSelector, imgClassName, distanceY, initCount }) {
        this.ctx = ctx;
        this.ctxDataArray = ctxDataArray;
        this.imgSelector = imgSelector;
        this.imgClassName = imgClassName;
        this.distanceY = distanceY || 200;
        this.initCount = initCount || 8;
        this.windowH = wx.getSystemInfoSync().windowHeight;
    }

    init() {
        let that = this;
        if (!this.ctx.data.startIdx) {
            this.ctx.setData({ startIdx: that.initCount });
        }
        var arr = [].concat(that.ctx.data[that.ctxDataArray]);
        for (let i = 0; i < that.initCount; i++) {
            arr[i]['imgSrc'] = that.ctx.data[that.ctxDataArray][i][that.imgClassName]
        }
        that.ctx.setData({ [that.ctxDataArray]: arr });
    }

    lazy() {
        let that = this;
        wx.createSelectorQuery().selectAll(that.imgSelector).boundingClientRect(rect => {
            rect.forEach((item, index) => {
                if ((index > that.ctx.data.startIdx) && (item.top - that.windowH) < that.distanceY) {
                    var arr = [].concat(that.ctx.data[that.ctxDataArray]);
                    arr[that.ctx.data.startIdx]['imgSrc'] = that.ctx.data[that.ctxDataArray][that.ctx.data.startIdx][that.imgClassName];
                    that.ctx.setData({ [that.ctxDataArray]: arr, startIdx: index })
                    console.log('加载图片', that.ctx.data.startIdx)
                }
            })
        }).exec();
    }
}

export default LazyLoad;