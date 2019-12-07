// pages/read/read.js
const app = getApp()
const WxParse = require('../../lib/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: "", //详细章节的数据
    title:"",
    body:"",//章节类容
  },
  //发送请求
  request() {
    let link = this.data.link;
    app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`).then(res => {
      console.log(res)
      this.setData({
        title: res.data.chapter.title,
        body: res.data.chapter.body,
      })
      let that = this;
      WxParse.wxParse('content', 'md', this.data.body, that, 5)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.link,
    })
    let link = wx.getStorageSync('link')
    this.setData({
      link:link
    })
    console.log(link, 999)
    this.request()
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