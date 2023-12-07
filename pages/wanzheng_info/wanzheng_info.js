// pages/wanzheng_info/wanzheng_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[1],
    items: [
      {value: '发送短信', name: '3', checked: 'true'},
      {value: '不发送短信', name: '4'},
      {value: '已电话沟通', name: '2'},
    ],
    items_dx: [
      {value: '意见与建议短信模板', name: '2', checked: 'true'},
      {value: '诉求已处理短信模板', name: '3'},
    ],
    pic_true:"",
    files:[],
    // 图片地址
    picture_reply_url:"",
    // 短信展示
    show_dx:true,
    //管理员
    manage:"",
  },
  // 查看大图
  topic_preview(){
    console.log(this.data.list.head_port);
    let files = "https://www.jzdcnswt.com/media/"+this.data.list.head_port
    console.log(files);
     wx.previewImage({
  urls: [files] // 需要预览的图片http链接列表
 })
  },
  // 回复大图
  huifu_datu(){
    console.log(this.data.list.picture_reply_url);
    let files = this.data.list.picture_reply_url
    wx.previewImage({
      urls: [files] // 需要预览的图片http链接列表
     })
  },


  // 上传图片
  // previewImage: function (e) {
  //   wx.previewImage({
  //     current: e.currentTarget.id, 
  //     urls: this.data.files 
  //   })
  // },
  _deleteImage(e){
    console.log(e)
  },
  _selectImage(e){
    console.log(e.detail.tempFiles)
    // wx.request({
    //   url: 'https://www.hclz.top/publish/tupian',

    // })
  },
  uplaodFile(files) {
    console.log('upload files', files)
    const tempFilePaths = files.tempFilePaths[0]
    // 文件上传的函数，返回一个promise
    // console.log(tempFilePaths[0])
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'https://www.jzdcnswt.com/publish/tupian',
        filePath: tempFilePaths,
        name: 'pic_ture',
        // header: {
        //   'content-type': 'multipart/form-data'
        // },
        success: (res) => {
          // res.data 是由你们后端返回的相关数据
          console.log(res.data)
          setTimeout(() => {
            resolve({
              urls: files.tempFilePaths
            })
          }, 1000); 
          var pic_url = JSON.parse(res.data).pic_url
          this.setData({
            picture_reply_url:pic_url
          })
          // const data = JSON.parse(res.data)
          // let urls = [data.data[0].url]
          // // 格式： {urls: ["后端返回的图片地址"]}
          // resolve({urls: urls})
          console.log(this.data.pic_url)
        },
        
        fial: () => {
          reject('error')
        }
      })
    })
},
  // 结束上传图片
  dh(e){
    let latitude = parseFloat(this.data.list.latitude)
    // let longitude = e.currentTarget.dataset.longitude
    let longitude = parseFloat(this.data.list.longitude)
    let address =this.data.list.map
    wx.openLocation({
      latitude,
      longitude,
      address
    })
    console.log(this.data.list.latitude);
  },
  huizhi(){
    let id = this.data.list.id
    wx.request({
      url: 'https://www.jzdcnswt.com/publish/sms',
      method:"get",
      data:{
        id,sms:"2"
      },
      success:res=>{
        wx.showToast({
          title: '短信发送成功',
        })
      }
    })
  },
  radioChange(e){
    console.log(e.detail.value=="不发送短信"||"已电话沟通");
    if(e.detail.value=="2"||e.detail.value=="4"){
      this.setData({
        show_dx:false
      })
    }else{
      this.setData({
        show_dx:true
      })
    }
  },
  _tijiao(e){
    // let  reply   = e.detail.value.reply  
     let  reply = e.detail.value.reply
    let  status = e.detail.value.radio_group
    let picture_reply_url = this.data.picture_reply_url
    console.log(e.detail.value.radio_group2);
    let id = this.data.list.id
    let sms = e.detail.value.radio_group2
    console.log(reply,status,id);
    console.log(e);
    console.log(picture_reply_url)

  if(sms==undefined){
    wx.request({
      url: 'https://www.jzdcnswt.com/publish/reply',
      method:"post",
      data:{
        reply,status,id,picture_reply_url
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
  }else{
    wx.request({
      url: 'https://www.jzdcnswt.com/publish/sms',
      method:"get",
      data:{
        id,sms
      },
      success:res=>{
        wx.showToast({
          title: '短信发送成功',
        })
        wx.request({
          url: 'https://www.jzdcnswt.com/publish/reply',
          method:"post",
          data:{
            reply,status,id,picture_reply_url
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
      }
    })
  }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option){
    let manage = wx.getStorageSync('manage') || ""
    this.setData({
      // selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this),
      manage
    })
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (data) =>{
        
        // console.log();
        this.setData({
          list:data
        })

    })
    // console.log(acceptDataFromOpenerPage);
  },
  cksp(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/video/video',
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