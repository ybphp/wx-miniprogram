Component({
    data: {
        show: true
    },
    methods: {
        prevent: () => { return false },

        show() {
            this.setData({ show: false });
        },

        hide() {
            this.setData({ show: true });
        },

        close() {
            this.triggerEvent('closeSelf', {}, {})
        },
    },
})