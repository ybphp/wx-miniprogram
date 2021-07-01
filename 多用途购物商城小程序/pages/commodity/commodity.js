Page({
    data: {
        sections: ['商品', '评价', '详情'],
        currSection: 1,
        swiper: [  // 轮播
            "http:////img.alicdn.com/irecomendsmgextra/i1/188124207/O1CN0104aPMi1gwqkVK7Z54_!!0-item_pic.jpg_2200x2200Q50s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i4/188124207/O1CN01eH4Tkq1gwqkXesnzN-188124207.jpg_2200x2200Q50s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i4/188124207/O1CN01mpspbT1gwqkVD2mou-188124207.jpg_2200x2200Q50s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i1/188124207/O1CN01XqoFWL1gwqkVJemW5-188124207.jpg_2200x2200Q50s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i1/188124207/O1CN01FFRc5d1gwqkWbrRIJ-188124207.jpg_2200x2200Q50s50.jpg_.webp"
        ],
        currSwiper: 1,  // 当前轮播
        recomends: [    // 看了又看
            {
                img: "http:////img.alicdn.com/bao/uploaded/O1CN01HYkO0I1gwqjvxi6ol_!!0-item_pic.jpg_320x320Q50s50.jpg_.webp",
                text: "唐狮牛仔外套男春秋休闲韩版潮流港风夹克修身帅气ins超火冬衣服",
                oldPrice: 429,
                newPrice: 169
            },
            {
                img: "http:////img.alicdn.com/bao/uploaded/O1CN01HYkO0I1gwqjvxi6ol_!!0-item_pic.jpg_320x320Q50s50.jpg_.webp",
                text: "唐狮牛仔外套男春秋休闲韩版潮流港风夹克修身帅气ins超火冬衣服",
                oldPrice: 429,
                newPrice: 169
            },
            {
                img: "http:////img.alicdn.com/bao/uploaded/O1CN01HYkO0I1gwqjvxi6ol_!!0-item_pic.jpg_320x320Q50s50.jpg_.webp",
                text: "唐狮牛仔外套男春秋休闲韩版潮流港风夹克修身帅气ins超火冬衣服",
                oldPrice: 429,
                newPrice: 169
            }
        ],
        detailImgs: [   // 详情图
            "http:////img.alicdn.com/imgextra/i1/188124207/O1CN01J6hskg1gwqkMHbaYG_!!188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i4/188124207/O1CN011AcwCF1gwqkPdEzAh_!!188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i3/188124207/TB27trfit4opuFjSZFLXXX8mXXa-188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i4/188124207/TB2wmsNgYRkpuFjSspmXXc.9XXa-188124207.png_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i3/188124207/TB29r11iEhnpuFjSZFEXXX0PFXa-188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i3/188124207/TB2GRm3ixhmpuFjSZFyXXcLdFXa-188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i3/188124207/TB2_Na2istnpuFjSZFvXXbcTpXa-188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i2/188124207/O1CN01tVtqrZ1gwqkLsIBP2_!!188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i1/188124207/O1CN01YXyjFx1gwqkPdHCLo_!!188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i2/188124207/O1CN01t6ck9h1gwqkNerpyj_!!188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i1/188124207/O1CN01p2RAeO1gwqkN1y9lh_!!188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i1/188124207/TB20T94iEdnpuFjSZPhXXbChpXa-188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i1/188124207/TB2CqZwg80kpuFjy1zdXXXuUVXa-188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i4/188124207/TB2gZMig30kpuFjSspdXXX4YXXa-188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i2/188124207/TB2ItoLiJBopuFjSZPcXXc9EpXa-188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/imgextra/i2/188124207/O1CN01lmbJa61gwqkLsHZwo_!!188124207.jpg_760x760Q90s50.jpg_.webp",
            "http:////img.alicdn.com/tfs/TB1k9XsQpXXXXXLXpXXXXXXXXXX-750-368.png_760x760Q90s50.jpg_.webp"
        ],
        iscollected: false, // 默认未收藏
        shopInfo: {
            name: '唐狮旗舰店',
            type: 'qiye',
            commodity: '这里是选购商品名称'
        }
    },

    onLoad(options) {
        console.log(JSON.stringify(options.id))
    },
    
    onPageScroll() {
        let query = this.createSelectorQuery();
        query.selectAll('.observe').boundingClientRect();
        query.exec(res => {
            res[0].forEach((item, index) => {
                if (item.top <= 50 && item.bottom >= 0) {
                    this.setData({ currSection: (index + 1) })
                }
            })
        })
    },

    swiperChange(ev) {
        this.setData({ currSwiper: ev.detail.current + 1 })
    },

    // 收藏
    collect() {
        this.setData({ iscollected: !this.data.iscollected })
    },

    // 显示 选择弹窗
    showSelectBox(ev) {
        let flag = ev.currentTarget.dataset.footertype;
        this.selectComponent("#selectBox").slide(flag);
    },

    showParamsBox(ev) {
        this.selectComponent("#paramsBox").slide();
    }

})