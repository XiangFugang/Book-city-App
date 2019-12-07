// components/ranking/ranking.js
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
    epub:[],//出版
    female:[],//男生
    male:[],//女生
    picture:[]//热门
  },
  ready() {
    this.ranking()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    ranking(){
      app.globalData.fly.get("/ranking/gender").then(res =>{
       this.setData({
         epub: res.data.epub,
         female: res.data.female,
         male: res.data.male,
         picture: res.data.picture
       })
        //console.log(this.data.female)
        // console.log(res)
      }).catch(err =>{
        console.log(err)
      })
    }
  },
})
