// pages/catalog/catalog.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //路由传参接受的id
    chapters: [] //章节数据
  },
  //请求数据
  datarequest() {
    app.globalData.fly.get(`/mix-atoc/${this.data.id}?view=chapters`).then(res => {
      console.log(res, 111)
      this.setData({
        chapters: res.data.mixToc.chapters
      })
    }).catch(err => {
      console.log(err)
    })
  },
  //跳转阅读单章节
  read(e) {
    console.log(e, 111)
    if (e) {
      let link = e.currentTarget.dataset.link;
      let title = e.currentTarget.dataset.title;
      wx.setStorageSync('link',link),
      wx.navigateTo({
        url: `/pages/read/read?link=${title}`,
      })
    } else {
      read(e)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options)
    this.setData({
      id: options.id
    })
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.datarequest()
    //
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