// pages/uese_info/uese_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      items: [
        {value: '已处理', name: '2', checked: 'true'},
        {value: '不正当理由', name: '3'},
      ],
      show:false,
      id:"",
      // 筛选
      filter:[],
      currentTab:"全部",
      islogin:false,
      //登陆状态
      openid:"",
  },
  // 筛选
  swichNav: function (e) { 
 
    var that = this; 
   
    if (this.data.currentTab === e.target.dataset.current) {
     return false;
    } else {
     that.setData({
      currentTab: e.target.dataset.current
     })
    }
    let openid = wx.getStorageSync('openid')
    let manage = wx.getStorageSync('manage')
    if(this.data.currentTab!='全部'){
      let Complaint=this.data.currentTab
      wx.request({
       url: 'https://www.jzdcnswt.com/publish/check',
       method:"get",
       data:{
         openid,
         manage,
         Complaint:Complaint
       },
       success:res=>{
         console.log(res);
         let list = res.data.data
         this.setData({
           list
         })
       }
     })
    }else{
      let Complaint=""
      wx.request({
       url: 'https://www.jzdcnswt.com/publish/check',
       method:"get",
       data:{
         openid,
         manage,
         Complaint:Complaint
       },
       success:res=>{
         console.log(res);
         let list = res.data.data
         this.setData({
           list
         })
       }
     })
    }

  },
    


dh(e){
  let latitude =parseFloat(e.currentTarget.dataset.latitude) 
  // let longitude = e.currentTarget.dataset.longitude
  let longitude = parseFloat(e.currentTarget.dataset.longitude) 
  let address = e.currentTarget.dataset.map
  wx.openLocation({
    latitude,
    longitude,
    address
  })
  console.log(e);
},
// 处理任务
chuli(e){
  let id = e.currentTarget.dataset.id
  this.setData({
    id,
    show:true
  })
  wx.navigateTo({
    url: '/pages/wanzheng_info/wanzheng_info',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      acceptDataFromOpenedPage: function(data) {
        console.log(data)
      },
      someEvent: function(data) {
        console.log(data)
      }
    },
    success: function(res) {
      
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', e.currentTarget.dataset )
    }
  })
  console.log(e.currentTarget.dataset);

},
// 是否处理
sfcl(e){
  let id = e.currentTarget.dataset.id
  console.log(e);
  let that =this
  wx.showModal({
    title: '提示',
    content: '是否处理',
    success (res) {
      if (res.confirm) {
        wx.request({
          url: 'https://www.jzdcnswt.com/publish/start_processing',
          method:"get",
          data:{
            id
          },
          success:res=>{
            that.shuju()
            console.log(res);
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},
// 下拉刷新
onPullDownRefresh() {
  this.shuju()
  wx.showToast({
    title: '刷新成功',
    icon: 'none',
 })
  wx.stopPullDownRefresh()
},
_tijiao(e){
  console.log(e);
  let  reply   = e.detail.value.reply  
  let  status = e.detail.value.radio_group
  let id = this.data.id
  // let  radio-group = e.detail.value.propose
  console.log(id);
  wx.request({
    url: 'https://www.jzdcnswt.com/publish/reply',
    method:"post",
    data:{
      reply,status,id
    },
    success:res=>{
      wx.showToast({
        title: '发布成功',
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/vip/vip',
       })
       }, 1500);
    }
  })
},
open(e){

},
del(e){
  console.log(e);
  let id = e.currentTarget.dataset.id
  let status = e.currentTarget.dataset.status
  wx.showModal({
    title: '提示',
    content: '是否删除',
    success (res) {
      if (res.confirm) {
        wx.request({
          url: 'https://www.jzdcnswt.com/publish/delshassignment',
          method:"get",
          data:{
            id
          },
          success:res=>{
            if(status=="未处理"){
              wx.showToast({
                title: '删除成功',
              })
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/vip/vip',
               })
               }, 1500);
            }else{
              wx.showToast({
                title: '已处理无法删除',
                icon:"error"
              })
            }

            console.log(res.data.error);
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })

},
// 调用数据
  shuju(){
    let openid = wx.getStorageSync('openid')
    let manage = wx.getStorageSync('manage')
    let Complaint=''
    wx.request({
      url: 'https://www.jzdcnswt.com/publish/check',
      method:"get",
      data:{
        openid,
        manage,
        Complaint
      },
      success:res=>{
        console.log(res);
        let list = res.data.data
        this.setData({
          list,
          openid
        })
      }
    })
    // wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.shuju()
    let islogin = wx.getStorageSync('islogin')
    this.setData({
      islogin
    })
    // 筛选
    wx.request({
      url: 'https://www.jzdcnswt.com/publish/filter',
      method:"get",
      success:res=>{
        console.log(res);
        let filter = res.data.data
        this.setData({
          filter
        })
      }
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
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