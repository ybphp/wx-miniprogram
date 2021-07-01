// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sys_h: wx.getSystemInfoSync().windowHeight, // 设备屏幕高度
    categorys: [
      {
        category: "为您推荐",
        content: [
          {
            cate: '女装',
            cont: [
              { name: "连衣裙", img: "http:////img.alicdn.com/tfs/TB1YTCkqXOWBuNjy0FiXXXFxVXa-100-100.jpg_250x225Q50s50.jpg_.webp" },
              { name: "T恤", img: "http:////img.alicdn.com/tfs/TB1I0W2qf1TBuNjy0FjXXajyXXa-100-100.jpg_250x225Q50s50.jpg_.webp" },
              { name: "衬衫", img: "http:////img.alicdn.com/tfs/TB1XzKuqXuWBuNjSspnXXX1NVXa-100-100.jpg_250x225Q50s50.jpg_.webp" },
              { name: "雪纺衫", img: "http:////img.alicdn.com/tfs/TB1JjmnqkOWBuNjSsppXXXPgpXa-100-100.jpg_250x225Q50s50.jpg_.webp" },
              { name: "裤子", img: "http:////img.alicdn.com/tfs/TB1kO5nqkOWBuNjSsppXXXPgpXa-100-100.jpg_250x225Q50s50.jpg_.webp" },
              { name: "牛仔裤", img: "http:////img.alicdn.com/tfs/TB1H6enqkOWBuNjSsppXXXPgpXa-100-100.jpg_250x225Q50s50.jpg_.webp" },
            ]
          },
          {
            cate: '女鞋',
            cont: [
              { name: "小白鞋", img: "http:////img.alicdn.com/tfs/TB1gh88SVXXXXciaXXXXXXXXXXX-100-100.jpg_250x225Q50s50.jpg_.webp" },
              { name: "小白鞋", img: "http:////img.alicdn.com/tfs/TB1gh88SVXXXXciaXXXXXXXXXXX-100-100.jpg_250x225Q50s50.jpg_.webp" },
              { name: "小白鞋", img: "http:////img.alicdn.com/tfs/TB1gh88SVXXXXciaXXXXXXXXXXX-100-100.jpg_250x225Q50s50.jpg_.webp" },
            ]
          }
        ]
      },
      {
        category: "国际大牌",
        content: [
          {
            cate: "品牌墙",
            cont:[
              { name: "", img: "http:////img.alicdn.com/tps/i4/TB1PhrmHpXXXXX0XXXXXD.cNVXX-400-200.png_250x225Q90s50.jpg_.webp" },
              { name: "", img: "http:////img.alicdn.com/tps/i4/TB1PhrmHpXXXXX0XXXXXD.cNVXX-400-200.png_250x225Q90s50.jpg_.webp" },
              { name: "", img: "http:////img.alicdn.com/tps/i4/TB1PhrmHpXXXXX0XXXXXD.cNVXX-400-200.png_250x225Q90s50.jpg_.webp" },
              { name: "", img: "http:////img.alicdn.com/tps/i4/TB1PhrmHpXXXXX0XXXXXD.cNVXX-400-200.png_250x225Q90s50.jpg_.webp" },
              { name: "", img: "http:////img.alicdn.com/tps/i4/TB1PhrmHpXXXXX0XXXXXD.cNVXX-400-200.png_250x225Q90s50.jpg_.webp" },
              { name: "", img: "http:////img.alicdn.com/tps/i4/TB1PhrmHpXXXXX0XXXXXD.cNVXX-400-200.png_250x225Q90s50.jpg_.webp" },
            ]
          }
        ]
      },
      {
        category: "天猫国际",
        content: []
      },
      {
        category: "女装",
        content: []
      },
      {
        category: "女鞋",
        content: []
      },
      {
        category: "男装",
        content: []
      },
      {
        category: "男鞋",
        content: []
      },
      {
        category: "内衣",
        content: []
      },
      {
        category: "母婴",
        content: []
      },
      {
        category: "手机",
        content: []
      },
      {
        category: "数码",
        content: []
      },
      {
        category: "家电",
        content: []
      },
      {
        category: "美妆",
        content: []
      },
      {
        category: "箱包",
        content: []
      },
      {
        category: "运动",
        content: []
      },
      {
        category: "户外",
        content: []
      },
      {
        category: "家装",
        content: []
      },
      {
        category: "居家百货",
        content: []
      },
      {
        category: "鲜花宠物",
        content: []
      },
      {
        category: "配饰",
        content: []
      },
      {
        category: "食品",
        content: []
      },
      {
        category: "生鲜",
        content: []
      },
      {
        category: "汽车摩托",
        content: []
      },
      {
        category: "医药",
        content: []
      },
      {
        category: "图书",
        content: []
      },
      {
        category: "通信",
        content: []
      },
      {
        category: "洗护",
        content: []
      },
      {
        category: "乐器",
        content: []
      }
    ],
    current: 0, // 当前分类
    scroll_dire: 'down',  // 滚动方向，默认向下滚动
    showTop: true,
    showBtm: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  scroll(ev) {
    ev.detail.deltaY > 0 ? this.setData({ scroll_dire: 'up' }) : this.setData({ scroll_dire: 'down' });
    const query = wx.createSelectorQuery();
    query.select('.selected').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec((res) => {
      let top = res[0].top, // 元素距离顶部的距离;
          h = res[0].height; // 元素的高度
      // if (top <= 0 && this.data.scroll_dire == 'down') {
      //   this.setData({ showTop: true, showBtm: false });
      //   console.log(1)
      // } else if (top < 0 && this.data.scroll_dire == 'up') {
      //   this.setData({ showTop: true, showBtm: false })
      //   console.log(2)
      // } else if ((top + h) >= 603 && this.data.scroll_dire == 'up') {
      //   this.setData({ showTop: false, showBtm: true })
      //   console.log(3)
      // } 
      // else if ((top + h) >= 603 && this.data.scroll_dire == 'down') {
      //   this.setData({ showTop: false, showBtm: true })
      //   console.log(4)
      // }
      // else {
      //   console.log(5)
      //   this.setData({ showTop: false, showBtm: false })
      // }
      if (top <= 0) {
        this.setData({ showTop: true, showBtm: false });
      } else if ((top + h) >= 603) {
        this.setData({ showTop: false, showBtm: true })
      } else {
        this.setData({ showTop: false, showBtm: false })
      }
    })
  },

  // 选择当前分类
  selCate(ev) {
    let ind = Number(ev.currentTarget.dataset.index);
    if (!Number.isNaN(ind)) { this.setData({ current: ind, showTop: false, showBtm: false }) }
  }
})