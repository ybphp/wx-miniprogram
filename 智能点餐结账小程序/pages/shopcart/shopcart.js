//获取应用实例
const app = getApp()

Page({
  data: {
    shopcartData: [],
    createAt: null,
    tableNumber: null,
    alreadyProductFlag: false,
    sureOrderFalg: true
  },
  onLoad: function (options) {
    const tableNumber = options.tableNumber;
    let shopcartData = [];
    let tableNumberSelet = wx.getStorageSync('tableNumberSelect').data;
    tableNumberSelet.forEach(item => {
      if (item.tableNumber === tableNumber) {
        if (!item.createAt) {
          item.createAt = new Date();
          console.log(item.createAt)
        }
        shopcartData = item;
      }
    });
    console.log(shopcartData);
    shopcartData.shopCart.lists.forEach(item => {
      item.totalPrice = (item.count * item.price).toFixed(2).replace('.00', '');
    });
    let date;

    if (shopcartData.createAt instanceof Date) {
      date = shopcartData.createAt;
    } else {
      date = new Date(shopcartData.createAt);
    }

    let h = date.getHours();
    let m = date.getMinutes();
    if (h < 10) {
      h = 0 + '' + h;
    }
    if (m < 10) {
      m = 0 + '' + m;
    }

    wx.setStorageSync('tableNumberSelect', { data: tableNumberSelet });

    this.setData({
      shopcartData: shopcartData,
      createAt: `${h}:${m}`,
      tableNumber: tableNumber
    })
  },
  delProduct: function (e) {
    const index = e.currentTarget.dataset.index;
    console.log(e);
    let singleProduct = this.data.shopcartData.shopCart.lists[index];
    if (singleProduct.count > 0) {
      singleProduct.count = singleProduct.count - 1;
    }
    if (this.data.shopcartData.allLists[singleProduct.currentCategoryIndex].countNumber > 0) {
      this.data.shopcartData.allLists[singleProduct.currentCategoryIndex].countNumber -= 1;
    }
    if (this.data.shopcartData.allLists[singleProduct.currentCategoryIndex].products[singleProduct.currentProductIndex].selectNumber > 0) {
      this.data.shopcartData.allLists[singleProduct.currentCategoryIndex].products[singleProduct.currentProductIndex].selectNumber -= 1;
    }

    singleProduct.totalPrice = (singleProduct.count * singleProduct.price).toFixed(2).replace('.00', '');
    this.setData({
      shopcartData: this.data.shopcartData
    });
    this.computedTotalPrice();

  },
  addProduct: function (e) {
    const index = e.currentTarget.dataset.index;
    let singleProduct = this.data.shopcartData.shopCart.lists[index];
    this.data.shopcartData.allLists[singleProduct.currentCategoryIndex].countNumber += 1;
    this.data.shopcartData.allLists[singleProduct.currentCategoryIndex].products[singleProduct.currentProductIndex].selectNumber += 1;
    singleProduct.count = singleProduct.count + 1;
    singleProduct.totalPrice = (singleProduct.count * singleProduct.price).toFixed(2).replace('.00', '');
    this.setData({
      shopcartData: this.data.shopcartData
    });
    this.computedTotalPrice();
  },
  computedTotalPrice: function () {
    let shopcartData = this.data.shopcartData;
    let allCount = 0;
    let totalPrice = 0;
    shopcartData.shopCart.lists.forEach(item => {
      allCount += item.count;
      totalPrice += item.price * item.count;
    });
    shopcartData.shopCart.allCount = allCount;
    shopcartData.shopCart.totalPrice = totalPrice.toFixed(2).replace('.00', '');
    this.setData({
      shopcartData: shopcartData
    });
    this.updateStorage();
  },
  updateStorage: function () {
    let tableNumberSelet = wx.getStorageSync('tableNumberSelect').data;
    let newData = tableNumberSelet.map(item => {
      if (item.tableNumber === this.data.tableNumber) {
        item = this.data.shopcartData;
      }
      return item;
    });
    console.log(this.data.shopcartData);
    console.log(newData);
    wx.setStorageSync('tableNumberSelect', { data: newData });
  },
  viewAlreadyProduct: function () {
    this.setData({
      alreadyProductFlag: !this.data.alreadyProductFlag
    });
  },
  sureOrder: function () {
    let tableNumberSelet = wx.getStorageSync('tableNumberSelect').data;
    tableNumberSelet.map(item => {
      if (item.tableNumber === this.data.tableNumber) {
        item.state = 'state2';
      }
      return item;
    });
    console.log(tableNumberSelet);
    wx.setStorageSync('tableNumberSelect', { data: tableNumberSelet });

    this.setData({
      sureOrderFalg: false
    });
  },
  backTableNumber: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
});

