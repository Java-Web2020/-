// pages/qiehuan/qiehuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      // {name: '个人账号', value: '0', checked: true},
      {name: '管理员账号', value: '1',checked: true}
  ],
  value:"0"
  },

  radioChange(e){
    console.log(e);
    this.setData({
      value:e.detail.value
    })
  },
  _tijiao(e){
   console.log(this.data.value);
   if(this.data.value=="0"){
    wx.reLaunch({
      url: '/pages/index/index',
   })
   wx.setStorageSync('vip', this.data.value)
   }
   if(this.data.value=="1"){
    wx.reLaunch({
      url: '/pages/vip/vip',
   })
   wx.setStorageSync('vip', this.data.value)
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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