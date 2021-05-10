// miniprogram/pages/familySupportIndex/familySupportIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        pagePath:"/pages/familySupportIndex/familySupportIndex",
        text:"家政",
        iconPath:"/images/tabIcons/首页.svg",
        selectedIconPath:"/images/tabIcons/首页(选中).svg"
    },
    {
      pagePath:"/pages/index/index",
      text:"订单",
      iconPath:"/images/tabIcons/订单.svg",
      selectedIconPath:"/images/tabIcons/订单(选中).svg"
    },
    {
      pagePath:"/pages/familySupportHome/familySupportHome",
      text:"我的",
      iconPath:"/images/tabIcons/我的.svg",
      selectedIconPath:"/images/tabIcons/我的(选中).svg"
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 上门保洁
   */
  homeClean: function() {
    console.log("用户点击了“上门保洁”！")
    wx.showToast({
      title: '功能暂未开放',
      icon:"error"
    })
  },

  /**
   * 保洁入住
   */
  cleanMemberAdd: function() {
    console.log("用户点击了“保洁入住”！")
    const type = ""
    // 跳转到保洁入住界面
    wx.navigateTo({
      url: '/pages/familySupportMemberAdd/familySupportMemberAdd?type='+type,
    })
  }
})