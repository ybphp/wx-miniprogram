//获取应用实例
const app = getApp()

Page({
  data: {
    selectArea: true,
    selectState: true,
    peopleNumberSelect: true,
    currentTableNumber: null,
    currentTableNumberArea: null,
    peopleNumberOption: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    stateOptions: [],
    stateOption: 'all',
    areaOptions: ['大堂', '包房'],
    areaOption: '全部区域',
    tableNumberOptions: [{
      tableNumber: 'A01',
      state: 'state1',
      area: '大堂',
      shopCart: []
    }, {
      tableNumber: 'A02',
      state: 'state4',
      area: '包房',
      shopCart: []
    }, {
      tableNumber: 'A03',
      state: 'state3',
      area: '包房',
      shopCart: []
    }, {
      tableNumber: 'A04',
      state: 'state5',
      area: '包房',
      shopCart: []
    }]
  },

  onLoad: function () {
    //wx.navigateTo({ url: `/pages/waitTableNumber/waitTableNumber`});
    if (!wx.getStorageSync('tableNumberSelect')) {
      wx.setStorageSync('tableNumberSelect', { data: this.data.tableNumberOptions })
    }
  },
  onShow: function () {
    const tableNumberSelect = wx.getStorageSync('tableNumberSelect').data;
    console.log(tableNumberSelect);
    // 更新桌号状态
    this.setData({
      tableNumberOptions: tableNumberSelect
    });
    console.log(this.data.tableNumberOptions)
  },
  selectOption: function (e) {
    if (e.currentTarget.dataset.selectArea) {
      this.setData({
        selectArea: !this.data.selectArea
      })
    } else {
      this.setData({
        selectState: !this.data.selectState
      })
    }
  },
  selectTableNumber: function (e) {
    const dataset = e.currentTarget.dataset;
    console.log(dataset);
    let peopleNumber = '';
    this.data.tableNumberOptions.forEach(item => {
      if (item.tableNumber === dataset.tableNumber) {
        peopleNumber = item.peopleNumber;
        return;
      }
    });
    if (peopleNumber) {
      wx.navigateTo({
        url: `/pages/product/product?tableNumber=${dataset.tableNumber}&selectedPeopleNumber=true&peopleNumber=${peopleNumber}`
      });
      return;
    }

    this.setData({
      currentTableNumber: dataset.tableNumber,
      currentTableNumberArea: dataset.currentTableNumberArea,
      peopleNumberSelect: false
    })
  },
  closePeopleNumberSelect: function () {
    this.setData({
      peopleNumberSelect: true
    })
  },
  toSelectProduct: function (e) {
    const dataset = e.currentTarget.dataset;
    this.setData({
      peopleNumberSelect: true
    });

    wx.navigateTo({
      url: `/pages/product/product?tableNumber=${this.data.currentTableNumber}&peopleNumber=${dataset.peopleNumber}&currentTableNumberArea=${this.data.currentTableNumberArea}`
    })

  },
  selectArea: function (e) {
    const area = e.currentTarget.dataset.areaSelect;
    console.log(area);
    this.setData({
      areaOption: area,
      selectArea: true
    })
  },
  toTableDetail:function(e){
    const dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/tableDetail/tableDetail?tableNumber=${dataset.tableNumber}`
    })
  },
  toClearTable:function(e){
    wx.navigateTo({
      url: '/pages/alreadyCheckout/alreadyCheckout',
    })
  }
});
