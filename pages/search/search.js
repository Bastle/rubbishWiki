// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowResult: false,
    tagList:[
      {
        name: '植物',
        imgUrl: 'https://i1.fuimg.com/693828/b5080052fd24fb47.jpg'
      }, {
        name: '纸',
        imgUrl: 'https://i1.fuimg.com/693828/e9d4b1ffa5fdd5b5.jpg'
      }, {
        name: '橡胶',
        imgUrl: 'https://i1.fuimg.com/693828/4f705ded85dec3d2.jpg'
      }, {
        name: '陶瓷',
        imgUrl: 'https://i1.fuimg.com/693828/e5d93583254d1a09.jpg'
      }, {
        name: '食物',
        imgUrl: 'https://i1.fuimg.com/693828/e19788d0d8e2533b.jpg'
      }, {
        name: '塑料',
        imgUrl: 'https://i1.fuimg.com/693828/e4db791caa13811b.jpg'
      }, {
        name: '木',
        imgUrl: 'https://i1.fuimg.com/693828/dfcf19199a3e1d1a.jpg'
      }, {
        name: '化学品',
        imgUrl: 'https://i1.fuimg.com/693828/397a2074085e6c1d.jpg'
      }, {
        name: '棉布',
        imgUrl: 'https://i1.fuimg.com/693828/5c4f7b24c01df4e0.jpg'
      }, {
        name: '金属',
        imgUrl: 'https://i1.fuimg.com/693828/5ddba81f67b8749b.jpg'
      }, {
        name: '电子',
        imgUrl: 'https://i1.fuimg.com/693828/b0a490d21d003d36.jpg'
      }, {
        name: '复杂质',
        imgUrl: 'https://i1.fuimg.com/693828/558f531cb9f0adfe.jpg'
      }, {
        name: '玻璃',
        imgUrl: 'https://i1.fuimg.com/693828/d0335bb359aa2e66.jpg'
      }
    ],
    resultList: [

    ],
    bgConfig: {},
    iconConfig:{},
    searchTarge: '',
    resultNumber: 0,
    inputValue: '',
    isShowCancelIcon: false,
    focus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  search(e){
    if(e.type === 'confirm'){
      if(e.detail.value){
        wx.navigateTo({
          url: `/pages/search/result?keyword=${e.detail.value}`
        })
      }
      this.setData({
        inputValue: '',
        isShowCancelIcon: false
      })
      // e.detail.value && this.getResult(e.detail.value)
    } else if(e.type === 'tap'){
      if(e.currentTarget.dataset.tag){
        wx.navigateTo({
          url: `/pages/search/result?keyword=${e.currentTarget.dataset.tag}&isTag=true`
        })
      }
      this.setData({
        inputValue: '',
        isShowCancelIcon: false
      })
      // e.currentTarget.dataset.tag && this.getResult(e.currentTarget.dataset.tag, true)
    }
  },
  // getResult(value, isTag){
  //   let resultNumber = 0,
  //     resultList = [],
  //     resultListByName = [],
  //     resultListByMaterial = [],
  //     resultListByDescription = [];
  //   for(var i = 0, len = app.globalData.all.length; i < len; i++){
  //     if(isTag){
  //       if(app.globalData.all[i].material && app.globalData.all[i].material.indexOf(value) !== -1){
  //         resultListByMaterial.push(app.globalData.all[i])
  //       }
  //     } else {
  //       if(app.globalData.all[i].name && app.globalData.all[i].name.indexOf(value) !== -1){
  //         resultListByName.push(app.globalData.all[i])
  //       } else if(app.globalData.all[i].material && app.globalData.all[i].material.indexOf(value) !== -1){
  //         resultListByMaterial.push(app.globalData.all[i])
  //       } else if(app.globalData.all[i].solution && app.globalData.all[i].solution.indexOf(value) !== -1){
  //         resultListByDescription.push(app.globalData.all[i])
  //       }
  //     }
  //   }
  //   resultNumber = resultListByName.length + resultListByMaterial.length + resultListByDescription.length;
  //   resultList.push(resultListByName);
  //   resultList.push(resultListByMaterial);
  //   resultList.push(resultListByDescription);
  //   this.setData({
  //     bgConfig: app.globalData.bgConfig,
  //     iconConfig: app.globalData.iconConfig,
  //     searchTarget: value,
  //     resultNumber,
  //     resultList,
  //     isShowResult: true
  //   })
  // },
  // cancelSearch(){
  //   this.setData({
  //     searchTarget: '',
  //     inputValue: '',
  //     resultNumber: 0,
  //     isShowResult: false,
  //     isShowCancelIcon:false
  //   })
  // },
  deleteText(){
    this.setData({
      inputValue: '',
      isShowCancelIcon:false,
      focus: true
    })
  },
  changeValue(e){
    if(e.detail.value !== ''){
      this.setData({
        isShowCancelIcon:true
      })
    }
  },
  // goToDetail(e){
  //   wx.navigateTo({
  //     url: '../detail/detail?link=' + JSON.stringify(e.currentTarget.dataset.link) + '&name=' + e.currentTarget.dataset.name
  //   })
  // },
  onShareAppMessage(){
    return {
      title: '垃圾分类就用分类说！',
      path: '/pages/index/index',
      imageUrl:'https://i2.tiimg.com/693828/0c456ac8a5924689.jpg'
    }
  }
})