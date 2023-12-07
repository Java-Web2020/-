Component({
  data: {
    selected: 0,
    roleId: '',
    allList: [{
 
      list1: [ {
        "text":"首页",
        "pagePath":"/pages/index/index",
        "iconPath": "/img/index.png",
        "selectedIconPath": "/img/index_1.png"
      },
      {
        "text":"详情",
        "pagePath":"/pages/uese_info/uese_info",
        "iconPath": "/img/order.png",
        "selectedIconPath": "/img/order_1.png"
      },
      {
        "text":"我的",
        "pagePath":"/pages/my/my",
        "iconPath": "/img/my.png",
        "selectedIconPath": "/img/my_1.png"
      }],
      list3: [ {
        "text":"首页",
        "pagePath":"/pages/index/index",
        "iconPath": "/img/index.png",
        "selectedIconPath": "/img/index_1.png"
      },
      {
        "text":"我的",
        "pagePath":"/pages/my/my",
        "iconPath": "/img/my.png",
        "selectedIconPath": "/img/my_1.png"
      },
    ],
      list4: [ {
        "text":"首页",
        "pagePath":"/pages/index/index",
        "iconPath": "/img/index.png",
        "selectedIconPath": "/img/index_1.png"
      },
      {
        "text":"详情",
        "pagePath":"/pages/uese_info/uese_info",
        "iconPath": "/img/order.png",
        "selectedIconPath": "/img/order_1.png"
      },
      {
        "text":"我的",
        "pagePath":"/pages/my/my",
        "iconPath": "/img/my.png",
        "selectedIconPath": "/img/my_1.png"
      }],
      list2: [
        {
          "text":"首页",
          "pagePath":"/pages/index/index",
          "iconPath": "/img/index.png",
          "selectedIconPath": "/img/index_1.png"
        },
      {
        "text":"管理详情",
        "pagePath":"/pages/vip/vip",
        "iconPath": "/img/order.png",
        "selectedIconPath": "/img/order_1.png"
      },
      {
        "text":"我的",
        "pagePath":"/pages/my/my",
        "iconPath": "/img/my.png",
        "selectedIconPath": "/img/my_1.png"
      }],
    }],
    list: []
  },
  attached() {
    const roleId = wx.getStorageSync('vip')
    const manage = wx.getStorageSync('manage')
    if (roleId == 0 && manage==1 ) {
      this.setData({
        list: this.data.allList[0].list2
      })
    }else if(roleId==1){
      this.setData({
        list: this.data.allList[0].list2
      })
    }else if(manage==2 ){
      this.setData({
        list: this.data.allList[0].list1
      })
    }else if(manage==""&&roleId==""){
      this.setData({
        list: this.data.allList[0].list1
      })
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  },
})