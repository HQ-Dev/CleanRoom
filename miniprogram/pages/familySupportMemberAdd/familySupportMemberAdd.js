// miniprogram/pages/familySupportMemberAdd/familySupportMemberAdd.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idcardUrlFront : "",
    idcardUrlBack : "",
    trueName:""
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

  nameBind(param) {
    this.setData({
      trueName:param.detail.value
    })
  },

  submitUserInfo: function(param) {
    
  }
})