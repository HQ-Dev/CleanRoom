// miniprogram/pages/familySupportMemberAdd/familySupportMemberAdd.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trueName:"",  // 服务者姓名       
    phoneNumber:"",  // 手机号码
    idCardNumber:"",  // 身份证号码  
    idcardUrlFront : "", // 身份证正面图片本地临时路径
    idcardFrontFileID:"",  // 身份证正面云存储后的 fileID
    idcardUrlBack : "",  // 身份证背面图片本地临时路径
    idcardBackFileID:"",  // 身份证背面云存储后的 fileID
    selfIntroduction:"",  // 自我介绍
    householdElectrical:false,  // 家电维装
    houseClean:false,  // 保洁清洗
    houseRepair:false,  // 房屋修装
    furnitureRepair:false,  // 家具维装
    rushPipe:false,  // 管道疏通
    others:false,  // 其他
    pics:[]  //
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // 初始化界面图片（身份证默认图片赋值）
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
   */
  nameBind(param) {
    this.setData({
      trueName:param.detail.value
    })
  },

  /**
   * 手机号码绑定
   */
  phoneBind(param) {
    this.setData({
      phoneNumber:param.detail.value
    })
  },

  /**
   * 身份证号码绑定
   */
  idCardBind(param) {
    this.setData({
      idCardNumber:param.detail.value
    })
  },

  /**
   * 自我介绍绑定
   */
  introductionBind(param) {
    this.setData({
      selfIntroduction:param.detail.value
    })
  },
  /**
   * 服务行业数组绑定
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
  /**
   * 照片增加绑定
   */
  imageAdd: function(param) {
    this.setData({
      pics:param.detail.all
    })
    console.log(param.detail)
  },
  /**
   * 照片去除绑定
   */
  imageRemove: function(param) {
    this.setData({
      pics:param.detail.all
    })
  },

  submitUserInfo: async function(param) {

    this.printBindingInfos();
    // 先上传图片，获取 fileID，文件夹名称
    // const cloudPath = `pics/个人入驻界面/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + this.data.idcardUrlFront.match(/\.[^.]+?$/);
    let idcardUrlArray = [this.data.idcardUrlFront[0], this.data.idcardUrlBack[0]];
    for (let i = 0; i < idcardUrlArray.length; i++) {
      const cloudPath = `pics/个人入驻界面/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}`;
      await wx.cloud.uploadFile({
        cloudPath,
        filePath:idcardUrlArray[i],
      }).then(res=> {
        if(i == 0) {
          this.setData({
            idcardFrontFileID:res.fileID
          })
        } else if (i==1) {
          this.setData({
            idcardBackFileID:res.fileID
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }

    // 将图片在云存储中的相关信息与服务提供者的其他信息一同添加到数据库集合中 (serverProviderInfo)
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection("serverProviderInfo").add({
      data: {
        trueName:this.data.trueName,
        idCardNo:this.data.idCardNumber,
        phoneNumber:this.data.phoneNumber,
        folders:
          {folderName:"个人入驻界面",
            files:
              {
                idCardFrontFileID:this.data.idcardFrontFileID,
                idCardBackFileID:this.data.idcardBackFileID
              }
          },
        selfIntroduction:this.data.selfIntroduction,
        serverFields:
          {
            householdElectrical:this.data.householdElectrical,
            houseClean:this.data.houseClean,
            houseRepair:this.data.houseRepair,
            furnitureRepair:this.data.furnitureRepair,
            rushPipe:this.data.rushPipe,
            others:this.data.others
          }
      }
    }).then(res => {
      console.log(res)
    }).catch(error => {

    })
  },


  /**
   * 上传
   */


  printBindingInfos: function() {
    console.log(this.data.pics);
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
    (this.data.others?"其他\n":"") + 
    "上传的多张图片路径："
    );
  }
})