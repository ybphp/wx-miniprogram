import scrollLoad from '../../utils/scrollload.js';
import LazyLoad from '../../utils/lazyload.js'
function generatGoods(count) {
    count = count || 8;
    var arr = [];
    for (var i = 0; i < count; i++) {
        arr.push({
            id: new Date().toString(),
            goods_img: "http://gw.alicdn.com/bao/uploaded/i2/3702913713/TB2Don2X9BYBeNjy0FeXXbnmFXa_!!3702913713.png_290x10000.jpg_.webp",
            goods_brand: {
                brand: "JERXUN/京选",
                bg_color: "rgb(206, 175, 163)",
                img: "",
            },
            intro: "京选钢丝钳老虎钳子6/7/8寸多功能工业级电工钳子平口克丝断线钳" + new Date().toString(),
            price: "36.9"
        })
    }
    return arr
}
// pages/tianmao/tianmao.js
Page({

    data: {
        animate: false,
        brand: "http://gw.alicdn.com/tfs/TB1wQw8qamWBuNjy1XaXXXCbXXa-237-41.png_240x10000.jpg_.webp",
        discount_bg: "http://gw.alicdn.com/tfs/TB1.QpVlOLaK1RjSZFxXXamPFXa-1125-541.png_790x10000.jpg_.webp",
        goods: [
            {
                id: new Date().toString(),
                goods_img: "http://gw.alicdn.com/bao/uploaded/i3/3469494110/TB2WU5Nc.z.BuNjt_j7XXX0nFXa_!!3469494110.jpg_290x10000Q75.jpg_.webp",
                goods_brand: {
                    brand: "卡甸",
                    bg_color: "rgb(206, 175, 163)",
                    img: "",
                },
                intro: "新款帆布鞋运动休闲鞋韩版潮流男鞋加厚学生板鞋秋冬季保暖潮鞋子",
                price: "34.9"
            },
            {
                id: new Date().toString(),
                goods_img: "http://gw.alicdn.com/bao/uploaded/i1/3397606051/O1CN011uZP41bwB5noQeY_!!3397606051.jpg_290x10000Q75.jpg_.webp",
                goods_brand: {
                    brand: "resmed/瑞思迈",
                    bg_color: "rgb(206, 175, 163)",
                    img: "http://g.alicdn.com/mui/flag-img/biger@2x/AU.png",
                },
                intro: "瑞思迈S9 AutoSet呼吸机原装进口全自动家用医用无创睡眠止鼾器",
                price: "8800"
            },
            {
                id: new Date().toString(),
                goods_img: "http://gw.alicdn.com/bao/uploaded/i1/2102742584/TB2B.K6o_nI8KJjSszbXXb4KFXa_!!2102742584.jpg_290x10000Q75.jpg_.webp",
                goods_brand: {
                    brand: "Lining/李宁",
                    bg_color: "rgb(205, 163, 177)",
                    img: "",
                },
                intro: "李宁男鞋arbn065轻质透气跑步鞋",
                price: "119"
            },
            {
                id: new Date().toString(),
                goods_img: "http://gw.alicdn.com/bao/uploaded/i2/3702913713/TB2Don2X9BYBeNjy0FeXXbnmFXa_!!3702913713.png_290x10000.jpg_.webp",
                goods_brand: {
                    brand: "JERXUN/京选",
                    bg_color: "rgb(206, 175, 163)",
                    img: "",
                },
                intro: "京选钢丝钳老虎钳子6/7/8寸多功能工业级电工钳子平口克丝断线钳",
                price: "36.9"
            },
            {
                id: new Date().toString(),
                goods_img: "http://gw.alicdn.com/bao/uploaded/i3/3469494110/TB2WU5Nc.z.BuNjt_j7XXX0nFXa_!!3469494110.jpg_290x10000Q75.jpg_.webp",
                goods_brand: {
                    brand: "卡甸",
                    bg_color: "rgb(206, 175, 163)",
                    img: "",
                },
                intro: "新款帆布鞋运动休闲鞋韩版潮流男鞋加厚学生板鞋秋冬季保暖潮鞋子",
                price: "34.9"
            },
            {
                id: new Date().toString(),
                goods_img: "http://gw.alicdn.com/bao/uploaded/i1/3397606051/O1CN011uZP41bwB5noQeY_!!3397606051.jpg_290x10000Q75.jpg_.webp",
                goods_brand: {
                    brand: "resmed/瑞思迈",
                    bg_color: "rgb(206, 175, 163)",
                    img: "http://g.alicdn.com/mui/flag-img/biger@2x/AU.png",
                },
                intro: "瑞思迈S9 AutoSet呼吸机原装进口全自动家用医用无创睡眠止鼾器",
                price: "8800"
            },
            {
                id: new Date().toString(),
                goods_img: "http://gw.alicdn.com/bao/uploaded/i1/2102742584/TB2B.K6o_nI8KJjSszbXXb4KFXa_!!2102742584.jpg_290x10000Q75.jpg_.webp",
                goods_brand: {
                    brand: "Lining/李宁",
                    bg_color: "rgb(205, 163, 177)",
                    img: "",
                },
                intro: "李宁男鞋arbn065轻质透气跑步鞋",
                price: "119"
            },
            {
                id: new Date().toString(),
                goods_img: "http://gw.alicdn.com/bao/uploaded/i2/3702913713/TB2Don2X9BYBeNjy0FeXXbnmFXa_!!3702913713.png_290x10000.jpg_.webp",
                goods_brand: {
                    brand: "JERXUN/京选",
                    bg_color: "rgb(206, 175, 163)",
                    img: "",
                },
                intro: "京选钢丝钳老虎钳子6/7/8寸多功能工业级电工钳子平口克丝断线钳",
                price: "36.9"
            }
        ],

    },
    onReady() {
        this.data.lazyLoad = new LazyLoad({ ctx: this, imgSelector: '.main-item', ctxDataArray: 'goods', imgClassName: 'goods_img' });
        this.data.lazyLoad.init()
    },

    onPageScroll(ev) {
        // 图片懒加载
        this.data.lazyLoad.lazy();
        this.setData({ animate: true })
        if (ev.scrollTop == 0) this.setData({ animate: false });

        // 滚动加载    
        var sL = scrollLoad(this, ev, '#tianmao');
        var that = this;
        sL(() => {
            setTimeout(() => {
                that.setData({ goods: that.data.goods.concat(generatGoods()) });
            }, 500)
        });
    },

})