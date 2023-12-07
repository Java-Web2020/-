// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  login:function(){

  },
  getPhoneNumber (e) {
    // 手机号验证登录
    console.log(e)
    if(e.detail.code){
      console.log(e.detail.code)
    wx.login({
      success:res=>{
        wx.showLoading({
          title: '加载中',
        }),
        console.log(res);
        wx.request({
          url: 'https://www.jzdcnswt.com/user/userregistered',
          method:"get",
          data:{
            js_code:e.detail.code,
            code:res.code
          },
          success:res=>{
              console.log(res);
              wx.setStorageSync('PhoneNumber', res.data.data.phone_info.phoneNumber)
              wx.setStorageSync('openid', res.data.openid)
              wx.setStorageSync('manage', res.data.manage)
            //   wx.setStorageSync('quanxian', res.data.result)
            //   wx.setStorageSync('name', res.data.username)
            //   console.log(res.data.data.phone_info.phoneNumber)
              wx.setStorageSync('islogin', true)
              wx.hideLoading()
              wx.showToast({
                title: '登录成功',
                icon: 'none',
                duration: 2000,
                success: function () {
                   setTimeout(function () {
                      //跳转到首页，强制重启
                      if(wx.getStorageSync('manage')=="1"){
                        wx.reLaunch({
                          url: '/pages/qiehuan/qiehuan',
                       })
                      }else{
                        wx.reLaunch({
                          url: '/pages/index/index',
                       })
                      }
                   }, 2000);
                }
             })
          }
         
        })
      }

    })
    }else{
      wx.showToast({
        title: '取消登录',
        icon:"none"
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let token = wx.getStorageSync('PhoneNumber') || ""
    let manage = wx.getStorageSync('manage') || ""
    let vip = wx.getStorageSync('vip') || ""
    if(token!=""&&manage!="1"){
      wx.reLaunch({
        url: '/pages/index/index',
     })
    }
    if(token!=""&&manage=="1"&&vip=="1"){
      wx.reLaunch({
        url: '/pages/vip/vip',
     })
    }
    if(token!=""&&manage=="1"&&vip=="0"){
      wx.reLaunch({
        url: '/pages/index/index',
     })
    }
    
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