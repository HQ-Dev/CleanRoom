// miniprogram/pages/familySupportMemberAdd/familySupportMemberAdd.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idcardUrlFront : "",
    idcardUrlBack : "",
    trueName:"",
    phoneNumber:"",
    idCardNumber:"",
    selfIntroduction:"",
    householdElectrical:false,
    houseClean:false,
    houseRepair:false,
    furnitureRepair:false,
    rushPipe:false,
    others:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      idcardUrlFront : app.idcardFront,
      idcardUrlBack : app.idcardBack
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  /**
   * 身份证正面
   */
  chooseFrontIdCard: function() {
    let tempFilePaths = this.data.idcardUrlFront;
    wx.chooseImage({
      count: 1,
      sizeType:'compressed',
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        tempFilePaths = res.tempFilePaths
        console.log("插入新图片了，地址：" + tempFilePaths)
        this.setData({
          idcardUrlFront:tempFilePaths
        })
      }
    })
  },

  /**
   * 身份证背面
   */
  chooseBackIdCard: function (params) {
    let tempFilePaths = this.data.idcardUrlBack;
    wx.chooseImage({
      count: 1,
      sizeType:'compressed',
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        tempFilePaths = res.tempFilePaths
        console.log("插入新图片了，地址：" + tempFilePaths)
        this.setData({
          idcardUrlBack:tempFilePaths
        })
      }
    })
  },

  /**
   * 真实姓名绑定
   * @param {}} param 
   */
  nameBind(param) {
    this.setData({
      trueName:param.detail.value
    })
  },

  /**
   * 手机号码绑定
   * @param {} param 
   */
  phoneBind(param) {
    this.setData({
      phoneNumber:param.detail.value
    })
  },

  /**
   * 身份证好吗绑定
   * @param {} param 
   */
  idCardBind(param) {
    this.setData({
      idCardNumber:param.detail.value
    })
  },

  /**
   * 自我介绍绑定
   * @param {*} param 
   */
  introductionBind(param) {
    this.setData({
      selfIntroduction:param.detail.value
    })
  },
  /**
   * 服务行业数组中筛选
   */
  serverFields(param) {
    this.setData({
      householdElectrical:this.judgeFields(param.detail.value,"家电维装"),
      houseClean:this.judgeFields(param.detail.value,"保洁清洗"),
      houseRepair:this.judgeFields(param.detail.value,"房屋修装"),
      furnitureRepair:this.judgeFields(param.detail.value,"家具维装"),
      rushPipe:this.judgeFields(param.detail.value,"管道疏通"),
      others:this.judgeFields(param.detail.value,"其他")
    })
  },
  /**
   * 数组筛选实现
   */
  judgeFields(fieldsArray,field) {
    let array = Array.from(fieldsArray);
    for (let i = 0; i < array.length; i++) {
      if (array[i] == field) {
        return true;
      }
    }
    return false;
  },



  submitUserInfo: function(param) {
    console.log("真实姓名：" + this.data.trueName +"\n"
    + "手机号码：" + this.data.phoneNumber +"\n" +
    "身份证号码：" + this.data.idCardNumber + "\n" +
    "身份证正面路径：" + this.data.idcardUrlFront + "\n" +
    "身份证背面路径：" + this.data.idcardUrlFront + "\n" +
    "自我介绍：" + this.data.selfIntroduction + "\n" +
    "选择的服务行业：" + "\n" + 
    (this.data.householdElectrical?"家电维装\n":"") +
    (this.data.houseClean?"保洁清洗\n":"") +
    (this.data.houseRepair?"房屋修装\n":"") +
    (this.data.furnitureRepair?"家具维装\n":"") +
    (this.data.rushPipe?"管道疏通\n":"") +
    (this.data.others?"其他\n":"") )
  }
})