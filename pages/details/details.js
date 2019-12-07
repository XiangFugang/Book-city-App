// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [], //选择分类得到的数据
    getMinor: {}, //接受小分类的数据
    parameter: {}, //路由传参接受的值
    id: "hot",
    minor: "全部",
    start: 0,
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
  },
  //热门点击与默认
  tocilck(e) {
    //console.log(e)
    if (e) {
      this.setData({
        id: e.currentTarget.dataset.id
      })
    }
    let gender = this.data.parameter.gender
    let type = this.data.id
    let major = this.data.parameter.name
    let minor = this.data.minor
    let start = this.data.start
    app.globalData.fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`).then(res => {
      //console.log(res)
      this.setData({
        books: res.data.books
      })
      console.log(this.data.books, 222)
    }).catch(err => {
      console.log(err)
    })
  },
  //点击小分类类名
  classification(e) {
    //console.log(e)
    if (e) {
      this.setData({
        minor: e.currentTarget.dataset.minor
      })
    }
    let gender = this.data.parameter.gender
    let type = this.data.id
    let major = this.data.parameter.name
    let minor = this.data.minor
    let start = this.data.start
    if (minor === "全部") {
      this.tocilck()
    } else {
      app.globalData.fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`).then(res => {
        // console.log(res)
        this.setData({
          books: res.data.books
        })
        console.log(this.data.books, 333)
      }).catch(err => {
        console.log(err)
      })
    }
    //console.log(this.data.mins,11)
  },
  //获取小分类数据
  getMinor() {
    app.globalData.fly.get("/cats/lv2").then(res => {
      //console.log(res)
      res.data[this.data.parameter.gender].map(item => {
        if (item.major === this.data.parameter.name) {
          item.mins.unshift("全部")
          this.setData({
            getMinor: item
          })
          // console.log(this.data.getMinor)
        }
      })

      //console.log(this.data.getMinor,111)
    }).catch(err => {
      console.log(err)
    })
  },
  //详情页
  content(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/content/content?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options)
    //设置戴航栏标题
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.getMinor()
    this.setData({
      parameter: options
    })
    //console.log(this.data.parameter)
    this.tocilck()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})