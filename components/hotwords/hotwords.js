// components/hotwords/hotwords.js
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
    newHotWords: [], //请求的数据
    arrNew: [], //随机的数据
    // 自定义自己喜欢的颜色
    colorArr: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
      "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
      "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
      "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
      "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"
    ],
    // 存储随机颜色
    randomColorArr: [],
    text:""
  },
  /**
   * 组件的方法列表
   */
  ready() {
    this.getexchange()
  },
  methods: {
    //发送请求与换一换
    getexchange() {
      this.setData({
        text:"换一换"
      })
      app.globalData.fly.get('/book/hot-word').then(res => {
        //console.log(res, 111)
        this.setData({
          newHotWords: res.data.newHotWords
        })
        if (res) {
          let arrNew = []
          for (let i = 0; i < 5; i++) {
            let num = Math.floor(Math.random() * res.data.newHotWords.length)
            let book = res.data.newHotWords[num]
            res.data.newHotWords.splice(num, 1)
            arrNew.push(book)
          }
          this.setData({
            text:"",
            arrNew

          })
        } else {
          getexchange()
        }
        //随机颜色
        let that = this,
          labLen = that.data.arrNew.length,
          colorArr = that.data.colorArr,
          colorLen = this.data.colorArr.length,
          randomColorArr = [];
        //判断执行
        do {
          let random = colorArr[Math.floor(Math.random() * colorLen)];
          randomColorArr.push(random);
          labLen--;
        } while (labLen > 0)

        that.setData({
          randomColorArr: randomColorArr
        });
        //console.log(this.data.arrNew, 555)
      }).catch(err => {
        console.log(err)
      })
    },
  }
})