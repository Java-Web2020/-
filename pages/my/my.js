// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoContext:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    openid:"",
  },
  dl(){
    wx.reLaunch({
      url: '/pages/login/login',
   })
  },
 //清除缓存
 
 edit:function(){
  wx.clearStorageSync();//清除缓存
  wx.showToast({
     title: '退出登录成功',
     icon: 'none',
     duration: 2000,
     success: function () {
        setTimeout(function () {
           //跳转到首页，强制重启
           wx.reLaunch({
              url: '/pages/login/login',
           })
        }, 2000);
     }
  })
},

bindPlayVideo() {
  console.log('1')
  this.videoContext.play()
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let openid = wx.getStorageSync('openid')
    this.setData({
      openid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const manage = wx.getStorageSync('manage')
    if(manage == 1){
      if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
      }
    }else{
      if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
      }
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})