//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'cloud1-8giyelmo48e04b7e',
        traceUser: true,
      })
    }
    this.globalData = {}
  },

  // 入驻申请界面
  idcardFront:"https://636c-cloud1-8giyelmo48e04b7e-1305708349.tcb.qcloud.la/pics/%E4%B8%AA%E4%BA%BA%E5%85%A5%E9%A9%BB%E7%95%8C%E9%9D%A2/%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2.png?sign=0edf7d4ce31b0bf1cc5a73294310db04&t=1620279514",
  idcardBack:"https://636c-cloud1-8giyelmo48e04b7e-1305708349.tcb.qcloud.la/pics/%E4%B8%AA%E4%BA%BA%E5%85%A5%E9%A9%BB%E7%95%8C%E9%9D%A2/%E8%BA%AB%E4%BB%BD%E8%AF%81%E8%83%8C%E9%9D%A2.png?sign=2a77f641380f0c665aaea55cd881b198&t=1620279688"
})
