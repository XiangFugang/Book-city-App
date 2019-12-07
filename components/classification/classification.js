// components/classification/classification.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    male: [], //男生
    female: [], //女生
    picture: [], //热门
    press: [] //出版
  },
  ready() {
    this.getData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getData() {
      app.globalData.fly.get("/cats/lv2/statistics").then(res => {
        // console.log(res)
        this.setData({
          male: res.data.male,
          female: res.data.female,
          picture: res.data.picture,
          press: res.data.press,
        })
        //console.log(this.data.male)
      }).catch(err => {
        console.log(err)
      })
    },
    cilck(e) {
      //console.log(e)
      let name = e.currentTarget.dataset.name
      let gender = e.currentTarget.dataset.gender
      wx.navigateTo({
        url: `/pages/details/details?name=${name}&gender=${gender}`
      })
    }
  },

})