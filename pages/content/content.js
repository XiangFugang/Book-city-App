// pages/content/content.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "", //路由传参接受的值
    title: "", //书名
    bookdetails: "", //请求的数据
    text: "开始阅读", //接收阅读或书架传参
    score: 0, //（红心个数）评分
    star: 0, //(黑星个数)评分
    information: "详情", //详情与评价切换
    docs: [], //评价传参
    recommend: [], //相关推荐
    animation: "" //动画
  },
  //请求
  detailspage() {
    app.globalData.fly.get(`/book/${this.data.id}`).then(res => {
      //console.log(res)
      let figure = Math.floor(Math.round(res.data.rating.score) / 2)
      let star = 5 - figure
      this.setData({
        bookdetails: res.data,
        score: figure,
        star: star
      })
      console.log(this.data.bookdetails, 444)
    }).catch(err => {
      console.log(err)
    })
  },
  //点击阅读或书架
  cilck(e) {
    this.setData({
      text: e.currentTarget.dataset.text
    })
    console.log(this.data.text)
  },
  //评价
  goto(e) {
    let id = this.data.bookdetails._id
    app.globalData.fly.get(`/post/short-review?book=${id}&total=true&sortType=newest`).then(res => {
      if (e) {
        this.setData({
          docs: res.data.docs,
          information: e.currentTarget.dataset.text
        })
      }
      //console.log(this.data.docs)
    }).catch(err => {
      console.log(err)
    })
  },
  //总目录
  catalog() {
    let id = this.data.id;
    let title = this.data.title
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${id}&title=${title}`,
    })
  },
  //相关推荐
  relevant() {
    this.setData({
      animation: "换一换"
    })
    let id = this.data.id
    app.globalData.fly.get(`/book/${id}/recommend`).then(res => {
      console.log(res, 222)
      if (res) {
        this.setData({
          animation: ""
        })
      }
      let arrNew = []
      for (let i = 0; i < 3; i++) {
        let num = Math.floor(Math.random() * res.data.books.length)
        let book = res.data.books[num]
        res.data.books.splice(num, 1)
        arrNew.push(book)
      }
      this.setData({
        recommend: arrNew,
      })
      console.log(this.data.recommend)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options)
    this.setData({
      id: options.id,
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.detailspage()
    this.goto()
    this.relevant()
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