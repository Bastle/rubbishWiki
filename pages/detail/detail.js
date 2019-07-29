// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    linkList: [],
    bgConfig: {},
    iconConfig: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if(!options.name) {
      options = { name: "甘蔗", link: JSON.stringify(["纸盒", "铅笔","本子"])}
    }
  
    let detail = {};
    let linkList = [];
    for (var i = 0, len = app.globalData.all.length; i<len;i++){
      if (app.gobalData.all[i].name === options.name) {
        detail = app.globalData.all[i];
      }
      if (options.link && JSON.parse(options.link).indexOf(app.globalData.all[i].name) !== -1){
        linkList.push(app.globalData.all[i])
      }
    }
    this.setData({
      detail,
      linkList,
      bgConfig: app.globalData.bgConfig,
      iconConfig: app.globalData.iconConfig,
      descriptionConfig: app.globalData.descriptionConfig
    })
    
  },
  onShareAppMessage(){
    let {
      name,
      link,
      shareImgUrl
    } = this.data.detail;
    return {
      title: `你知道${name}的正确分法吗？快看分类说！`,
      path: `/pages/detail/detail?name=${name}&link=${JSON.stringify(link)}`,
      imageUrl: shareImgUrl
    }
  },
  blankFun(){},
  goToLink(e){
    wx.navigateTo({
      url: 'detail?link=' + JSON.stringify(e.currentTarget.dataset.link) + '&name=' + e.currentTarget.dataset.name
    })
  }
})