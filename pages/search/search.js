// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sugData: "", //输入框的value值
    books: [] //获取的数据
  },
  //确定以后获取数据
  bindconfirm() {
    let content = this.data.sugData
    if (this.data.sugData !== "") {
      app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`).then(res => {
        console.log(res)
        this.setData({
          books: res.data.books
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      bindconfirm()
    }
  },
  //实时获取输入框的value
  bindKeyInput(e) {
    //console.log(e.detail.value)
    if (e) {
      this.setData({
        sugData: e.detail.value
      })
    } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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