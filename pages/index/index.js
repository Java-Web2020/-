// index.js
// 获取应用实例
const app = getApp()
import Uploader from 'miniprogram-file-uploader';
const chooseLocation = requirePlugin('chooseLocation');
Page({
  data: {
    address: "",
    locationName: "",
    latitude:"",
    longitude:"",
    score_xm:"1px solid white",
    score_sj:"1px solid white",
    score_zz:"1px solid white",
    score_jy:"1px solid white",
    username:"",
    phone:"",
    address:"",
    map:"",
    phone:"",
    // 图片
    pic_url:"",
    files:[],
    vip:"false",
    // 视频
    vido_url:"",
    // 性质诉求
    items:[{value: '我的诉求', name: '1', checked: 'true'},
    {value: '意见与建议', name: '2'},],
    // 类型——意见与建议
    objectArray: [
      
    ],
    index:0,//索引
    // 类型——我的诉求

    //展示
    show:true,
    // 按钮颜色
    currentTab:"1",
  },

  yjian(e){
    console.log(e.currentTarget.dataset.index);
    this.setData({
      currentTab:e.currentTarget.dataset.index,
      show:false
    })
    let id  =  e.currentTarget.dataset.index
    wx.request({
      url: 'https://www.jzdcnswt.com/publish/publishassignment',
      method:"get",
      data:{
        id
      },
      success:res=>{
        this.setData({
          objectArray:res.data.data
        })
        

     

      }
     
    })
  },
  sqiu(e){
    console.log(e.currentTarget.dataset.index);
    this.setData({
      currentTab:e.currentTarget.dataset.index,
      show:true
    })
    let id  =  e.currentTarget.dataset.index
    wx.request({
      url: 'https://www.jzdcnswt.com/publish/publishassignment',
      method:"get",
      data:{
        id
      },
      success:res=>{
        this.setData({
          objectArray:res.data.data
        })
        

     

      }
     
    })
  },


  bindPickerChange(e){
    console.log(this.data.objectArray[e.detail.value].id);
    this.setData({

      index: e.detail.value

    })
  },
 
  xm(){
    this.setData({
      score_xm:"1px solid blue"
    })
  },
  xm1(){
    this.setData({
      score_xm:"1px solid white"
    })
  },
  sj(){
    this.setData({
      score_sj:"1px solid blue"
    })
  },
  sj1(){
    this.setData({
      score_sj:"1px solid white"
    })
  },
  zz(){
    this.setData({
      score_zz:"1px solid blue"
    })
  },
  zz1(){
    this.setData({
      score_zz:"1px solid white"
    })
  },
  jy(){
    this.setData({
      score_jy:"1px solid blue"
    })
  },
  jy1(){
    this.setData({
      score_jy:"1px solid white"
    })
  },
  radioChange(e){
    if(e.detail.value=="2"){
      this.setData({
          show:false
      })
    }else{
      this.setData({
        show:true
    })
    }
    let id  =  e.detail.value
    wx.request({
      url: 'https://www.jzdcnswt.com/publish/publishassignment',
      method:"get",
      data:{
        id
      },
      success:res=>{
        this.setData({
          objectArray:res.data.data
        })
        

     

      }
     
    })
  },
    // 上传图片
    previewImage: function (e) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
      })
    },
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
              pic_url
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
  // 上传视频
  
  chooseVideo(){
    // console.log(Uploader.isSupport());
    let that = this
  //   if (Uploader.isSupport()) {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image','video'],
      sourceType: ['camera','album'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res)
        console.log(res)
        const tempFilePaths = res.tempFiles[0].tempFilePath
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: 'https://www.jzdcnswt.com/publish/upload_video', //仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'vido',
          success:res=>{
            console.log(res.data);
            //do something  
            that.setData({
              vido_url: JSON.parse(res.data).video_url
            })
            wx.hideLoading()
            console.log(that.data.vido_url);
          },
          fail:res=>{
            console.log(res);
          }
        })
        
        console.log(tempFilePaths);
      }
    })
  // }
  },



  _tijiao(e){
    console.log(e);
    let {address,latitude,longitude,map,phone,pic_url,
      propose,username,vido_url} = e.detail.value
      console.log(this.data.objectArray[this.data.index].Complaint);
      let Opinions_and_Suggestions= this.data.currentTab
      // console.log(Opinions_and_Suggestion);
      let Complaint = this.data.objectArray[this.data.index].Complaint
    let openid = wx.getStorageSync('openid')
    console.log(openid)
    if(openid==""){
      wx.showToast({
        title: '请登录',
        icon:"error"
      })
    }else{
      wx.request({
        url: 'https://www.jzdcnswt.com/publish/publishassignment',
        method:"post",
        data:{
          address,
          map,
          phone,
          pic_url,
          propose,
          username,
          longitude,
          latitude,
          vido_url,
          Complaint,
          openid,
          Opinions_and_Suggestions
  
        },
        success:res=>{
          
          console.log(res)
          if(res.data.code==200){
            wx.showToast({
              title: '发布成功',
              duration: 2000,
              success: function () {
                 setTimeout(function () {
                    //跳转到首页，强制重启
                    wx.reLaunch({
                       url: '/pages/index/index',
                    })
                 }, 2000);
              }
           })
          }else{
            wx.showToast({
              title: res.data.data,
              icon:"error"
            })
          }
  
       
  
        }
       
      })
    }


    console.log(this.data.latitude)
},
  onShow: function () {
    // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
    // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    const location = chooseLocation.getLocation();
    if(location){
        this.setData({
            address: location.address?location.address : "",
            locationName: location.name?location.name : "",
            latitude: location.latitude?location.latitude : "",
            longitude: location.longitude?location.longitude : "",
            map:location.address+location.name
        });
    }
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 0
    })
  }
},
onLoad:function(){
  // 图片
  this.setData({
    // selectFile: this.selectFile.bind(this),
    uplaodFile: this.uplaodFile.bind(this)
  })
  this.setData({
    userphone:wx.getStorageSync('PhoneNumber')
  })
  // if(token=="15932503569"){
  //   wx.reLaunch({
  //     url: '/pages/qiehuan/qiehuan',
  //  })
  // }
  let id =1
  wx.request({
    url: 'https://www.jzdcnswt.com/publish/publishassignment',
    method:"get",
    data:{
      id
    },
    success:res=>{
      this.setData({
        objectArray:res.data.data
      })

    }
   
  })
},
showMap() {
  //使用在腾讯位置服务申请的key（必填）
  const key = "RBWBZ-JYTN2-ORYU7-CUID4-6S2QV-4ZF6Z"; 
  //调用插件的app的名称（必填）
  const referer = "地图选点"; 
  wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
  });
},
// bindVideoScreenChange: function (e) {
//   var status = e.detail.fullScreen;
//   var play = {
//     playVideo: false
//   }
//   if (status) {
//     play.playVideo = true;
//   } else {
//     this.videoContext.pause();
//   }
//   this.setData(play);
// }
})
