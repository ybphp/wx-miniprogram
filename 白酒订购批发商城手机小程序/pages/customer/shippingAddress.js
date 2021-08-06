// pages/customer/shippingAddress.js
Page({
  data:{
    type:'',
    maskVisual: 'hidden',// mask 遮罩层
    current: 0, //地址层级索引
    proviceid: '',
    cityid: '',
    countyid: '',
    townid: '',
    villageid: '',
    province: [],//省
    city: [],//市
    county: [],//区
    town: [], //街道
    village: [],//乡村
    provinceName: '请选择',
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数 
    //判断是否带有type 编辑收获地址或者添加收获地址 
      let type = options.type=='add' ?  'add' : 'edit';
      let title = options.type=='add' ? '添加收货地址' : '编辑收货地址';
      wx.setNavigationBarTitle({
        title: title
      })
      this.setData({
         type:type
      })
      this.getAddres();
  },
    //获取选择好的省
  getprovince() {
    //通过proviceid 找到省份名字
    let provincelist = this.data.province;
    //findIndex() 方法找到proviceid 的省份的名字
    let i = provincelist.findIndex((value) => {
      return value.id == this.data.proviceid;
    })
    // console.log('通过id找到的位置是',this.data.proviceid,i)
    this.setData({
      provinceName: provincelist[i].name
    })

  },
  //获取选择好的市
  getcity() {
    app.tools.get(`/seller/customer_area?provice_id=${this.data.proviceid}`, (city) => {
      //console.log(province)
      this.setData({
        city: city.list
      });
      // console.log(JSON.stringify(this.data.city))
      //通过cityid 找到城市名字
      let citylist = this.data.city;
      //findIndex() 方法找到proviceid 的省份的名字
      let i = citylist.findIndex((value) => {
        return value.id == this.data.cityid;
      })
      console.log('通过id找到的位置是', this.data.cityid, i)
      this.setData({
        cityName: citylist[i].name
      })
    })
  },

  //获取选择好的区
  getcounty() {
    app.tools.get(`/seller/customer_area?city_id=${this.data.cityid}`, (county) => {
      //console.log(province)
      this.setData({
        county:county.list
      });
     // console.log(JSON.stringify(this.data.city))
      //通过cityid 找到城市名字
      let countylist = this.data.county;
      //findIndex() 方法找到proviceid 的省份的名字
      let i = countylist.findIndex((value) => {
        return value.id == this.data.countyid;
      })
      console.log('通过id找到的位置是',this.data.countyid,i, countylist[i].name)
      this.setData({
        countyName: countylist[i].name
      })
    })
  },
  //获取选择好的街道
  gettown() {
    app.tools.get(`/seller/customer_area?county_id=${this.data.countyid}`,(town) => {
      //console.log(province)
      this.setData({
        town: town.list
      });
      // console.log(JSON.stringify(this.data.city))
      //通过cityid 找到城市名字
      let townlist = this.data.town;
      //findIndex() 方法找到proviceid 的省份的名字
      let i = townlist.findIndex((value) => {
        return value.id == this.data.townid;
      })
      // console.log('通过id找到的位置是',this.data.proviceid,i)
      this.setData({
        townName: townlist[i].name
      })
    })

  },
  //获取选择好的乡镇
  getvillage() {
    app.tools.get(`/seller/customer_area?town_id=${this.data.townid}`, (village) => {
      //console.log(province)
      this.setData({
        village: village.list
      });
      // console.log(JSON.stringify(this.data.city))
      //通过cityid 找到城市名字
      let villagelist = this.data.village;
      //findIndex() 方法找到proviceid 的省份的名字
      let i = villagelist.findIndex((value) => {
        return value.id == this.data.villageid;
      })
      // console.log('通过id找到的位置是',this.data.proviceid,i)
      this.setData({
        villageName: villagelist[i].name
      })
    })
  },

 
  cascadePopup: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    });
    this.animation = animation;
    animation.translateY(-285).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'show',
    });
  },
  cascadeDismiss: function () {
    this.animation.translateY(285).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'hidden'
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})