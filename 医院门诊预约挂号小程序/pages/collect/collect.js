// pages/reserve/reserve.js
import initCalendar from '../component/calendar/calendar/index';
import { setTodoLabels } from '../component/calendar/calendar/index';
import { switchView } from '../component/calendar/calendar/index';
const urlApi = require('../../utils/server.api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    department: {},
    doctors: [],
    current: 'tab1',
    current_scroll: 'tab1',
    show:"show",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.doctorList(Number(options.id))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //按人亲求医生列表
  doctorList: function (KSID,SJJG){
    var that = this;
    wx.request({
      url: urlApi.queryRelatives2("doctor",44),
      data: {
        KSID: KSID,
        HZDW:"巨浪微信"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (response) {
        that.data.doctors = response.data.doctors.map(doctor => {
          return {
            id: doctor.id,
            name: doctor.name,
            position: doctor.position,
            title: doctor.title,
            resume: doctor.resume,
            field: doctor.field,
            imageurl: doctor.imageurl
          }
        });
        console.log("列表", that.data.doctors)
        that.setData({
          doctors: that.data.doctors,
          show:"hidden"
        });
      }
    })
  },

  handleChange({ detail }) {
    var type = detail.key;
    if(type === "1"){
      this.doctorList();
    }else if(type === "0"){
      this.doctorListDate();
    }
    
    this.setData({
      current: detail.key
    });
  },

  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //页面跳转
  toShowDoctorDetails: function (e) {
    console.log("选中的医生",e);
    wx.navigateTo({
      url: '/pages/doctor/doctor?doctor=' + JSON.stringify(e.currentTarget.dataset.doctor)
        + '&departmentName=' + this.data.department.name
    })
  }
})