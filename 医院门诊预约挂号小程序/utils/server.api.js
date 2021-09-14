const domain = "https://www.easy-mock.com/mock/";
const api = "5c26ecdc1e2c8e78ee4efbd9/hospital/";
const url ="http://frpgz1.idcfengye.com:10038/"
const type = {
  user:"UserManager/",
  data: "Information/",
  MZ:"OutPatient/",
  YJ:"Hospitalization/",
  MT:"MedicalTechnology/"

} 

//绑定卡
const getRegisterUrl = function () {
  return url  +"Micro/Patient/Save";
}

//获取人员信息
const getPensorInfoUrl = function () {
  return domain + api + 'pensorInfo';
}

//获取科室信息
const getTableList = function (tableName) {
  return url + type.MZ + "Register.Depart.Query"//domain + api + 'table/' + tableName;"OutPatient/Register.Depart.Query"
}

//获取科室信息
const getTableList2 = function (tableName) {
  return domain + api + 'table/' + tableName;//"OutPatient/Register.Depart.Query"
}

//医生列表
const queryRelatives = function (name, id) {
  return url + type.MZ + "Register.SignalSource.Query";//"Basic.Doctor.Query";//domain + api + 'table/' + name + '/relatives/' + id;
}

//医生列表2
const queryRelatives2 = function (name, id) {
  return domain + api + 'table/' + name + '/relatives/' + id;
}

//获取待付款列表
const getNotPayListUrl = function () {
  return domain + api + 'notPayList';
}

//获取待付款列表
const getNotPayListUrl2 = function () {
  return url + type.MZ + 'Payment.PayReceipt.Query';
}

//获取挂号记录
const getRegisterLogUrl = function () {
  return url + 'Weixin/Pay/Registration/Array';
}

//获取支付记录
const getPayLogUrl = function () {
  return domain + api + 'payLog';
}

//获取门诊缴费记录
const getMZPayLogUrl = function () {
  return url + 'Weixin/Pay/Receipt/Array'; 
}

//住院门诊缴费记录
const getinHPayLogUrl = function () {
  return domain + api + 'inHPayLog';
}

//押金补交记录
const getDepositLogUrl = function () {
  return domain + api + 'depositLog';
}

//获取医院的简介
const getHospitalIntro = function(){
  return domain + api + "hospitalIntro";
}

//获取医院的简介
const getPayUrl = function () {
  return "https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=5";
}

//获取就诊人列表
const getScikList = function () {
  return domain + api + "sick";
}

//获取支付信息
const getPayInfo = function () {
  return url + "Weixin/Pay/Registration";
}

//获取支付信息
const getMZPayInfo = function () {
  return url + "Weixin/Pay/Receipt";
}

   

//根据微信的openId获取就诊人的列表
const getScikList2 = function () {
  return url + "Micro/Patient/Array";
}

//锁定号
const getLockModify = function () {
  return url+ type.MZ + "Register.Lock.Modify";
}

//搜索医生、科室接口
const getSearchDoctor = function () {
  return url + "Micro/Search";
}

//住院费预交
const getInHopltalPay = function () {
  return url + "Weixin/Pay/Hospital";
}

//获取住院日清单
const getDayLogUlrl = function () {
  return url + type.YJ + "Information.DailyPayDetail.Query";
}

//获取报告
const getReportUrl = function () {
  return url + type.MT + "Report.Record.Query";
}


//获取科室介绍信息
const getKSinfo = function () {
  return url + type.data + "Basic.DeptInfoBase.Query";
}

//挂号支付成功后调用的接口
const getGHPaySuccess = function () {
  return url + type.MZ + "Register.Confirm.Modify";
}

//门诊待缴费支付成功后调用这个
const getMZPaySuccess = function () {
  return url + type.MZ + "Payment.Pay.Modify";
}

//预交费支付成功1
const getYJ1PaySuccess = function () {
  return url + type.YJ + "PrePayment.Pay.Modify";
}

//预交费支付成功2
const getYJ2PaySuccess = function () {
  return url + type.YJ + "PrePayment.Record.Query";
}


//门诊代缴费日志
const getMZnotPayLog = function () {
  return url + "Weixin/Pay/Receipt/Array";
}
  



/**
 * 发送Sms
 * 	传入参数
 * 		--		phone: 接收的手机号码
 * 		--		type: 短信类型 
 * 					0 - 验证码
 * 					1 - 确认短信
 */
const sendSms = function (phone, type) {
  return domain + api + '/sms/' + phone + '/type/' + type;
}

module.exports = {
  getPensorInfoUrl: getPensorInfoUrl,
  getRegisterUrl:getRegisterUrl,
  getTableList: getTableList,
  queryRelatives:queryRelatives,
  getNotPayListUrl: getNotPayListUrl,
  getNotPayListUrl2: getNotPayListUrl2,
  getRegisterLogUrl: getRegisterLogUrl,
  getPayLogUrl: getPayLogUrl,
  getMZPayLogUrl: getMZPayLogUrl,
  getinHPayLogUrl: getinHPayLogUrl,
  getDepositLogUrl: getDepositLogUrl,
  getHospitalIntro: getHospitalIntro,
  getPayUrl: getPayUrl,
  getPayInfo: getPayInfo,
  getScikList: getScikList,
  getLockModify: getLockModify,
  getScikList2: getScikList2,
  queryRelatives2: queryRelatives2,
  getTableList2: getTableList2,
  getMZPayInfo: getMZPayInfo,
  getSearchDoctor: getSearchDoctor,
  getKSinfo:getKSinfo,
  getDayLogUlrl: getDayLogUlrl,
  getReportUrl: getReportUrl,
  getGHPaySuccess: getGHPaySuccess,
  getMZPaySuccess: getMZPaySuccess,
  getYJ1PaySuccess: getYJ1PaySuccess,
  getYJ2PaySuccess: getYJ2PaySuccess,
  getInHopltalPay: getInHopltalPay,
  getMZnotPayLog: getMZnotPayLog
}