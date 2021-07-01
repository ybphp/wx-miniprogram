Component({
    data: {
        show: false,
        params: {
            title: '基本信息',
            content: [
                { key: "品牌", val: "唐狮" },
                { key: "适用年龄", val: "16-30周岁" },
                { key: "尺码", val: "S M L XL XXL" },
                { key: "材质", val: "其他" },
                { key: "风格", val: "韩版" },
                { key: "领子", val: "连帽" },
                { key: "衣门襟", val: "拉链" },
                { key: "颜色分类", val: "麻灰色 浅灰色 粉色" },
                { key: "货号", val: "8602AFQ21" },
                { key: "货号", val: "8602AFQ21" },
                { key: "货号", val: "8602AFQ21" },
                { key: "货号", val: "8602AFQ21" },
                { key: "货号", val: "8602AFQ21" },
                { key: "货号", val: "8602AFQ21" },
                { key: "货号", val: "8602AFQ21" },
                { key: "货号", val: "8602AFQ21" },
            ]
        }
    },
    methods: {
        prevent(ev) {
            // console.log(ev, ev.currentTarget.dataset.isbox)
            // return true
        },

        slide() {
            this.data.show ? this.selectComponent('#mask').hide() : this.selectComponent('#mask').show();
            this.setData({ show: !this.data.show })
        },
    },

})