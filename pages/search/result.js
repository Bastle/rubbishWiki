// pages/search/result.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  onLoad: function (options) {
    this.getResult(options.keyword, options.isTag);
  },
  search(e){
    e.detail.value && this.getResult(e.detail.value)
  },
  getResult(value, isTag){
    let resultNumber = 0,
      resultList = [],
      resultListByName = [],
      resultListByMaterial = [],
      resultListByDescription = [];
    for(var i = 0, len = app.globalData.all.length; i < len; i++){
      if(isTag){
        if(app.globalData.all[i].material && app.globalData.all[i].material.indexOf(value) !== -1){
          resultListByMaterial.push(app.globalData.all[i])
        }
      } else {
        if(app.globalData.all[i].name && app.globalData.all[i].name.indexOf(value) !== -1){
          resultListByName.push(app.globalData.all[i])
        } else if(app.globalData.all[i].material && app.globalData.all[i].material.indexOf(value) !== -1){
          resultListByMaterial.push(app.globalData.all[i])
        } else if(app.globalData.all[i].solution && app.globalData.all[i].solution.indexOf(value) !== -1){
          resultListByDescription.push(app.globalData.all[i])
        }
      }
    }
    resultNumber = resultListByName.length + resultListByMaterial.length + resultListByDescription.length;
    resultList.push(resultListByName);
    resultList.push(resultListByMaterial);
    resultList.push(resultListByDescription);
    this.setData({
      bgConfig: app.globalData.bgConfig,
      iconConfig: app.globalData.iconConfig,
      searchTarget: value,
      resultNumber,
      resultList
    })
  },
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
  goToDetail(e){
    wx.navigateTo({
      url: '../detail/detail?link=' + JSON.stringify(e.currentTarget.dataset.link) + '&name=' + e.currentTarget.dataset.name
    })
  },
  onShareAppMessage: function (e) {
    let {
      from,
      target
    } = e;
    if(from === 'button'){
      return {
        title: `你知道${target.dataset.item.name}的正确分法吗？快看分类说`,
        path: `/pages/detail/detail?name=${target.dataset.item.name}&link=${JSON.stringify(target.dataset.item.link)}`,
        imageUrl: target.dataset.item.shareImgUrl
      }
    } else if(from === 'menu'){
      return {
        title: '垃圾分类就用分类说！',
        path: '/pages/index/index',
        imageUrl:'https://i2.tiimg.com/693828/0c456ac8a5924689.jpg'
      }
    }

  }
})