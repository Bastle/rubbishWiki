//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    naviList: [
      {
        name: '全部',
        iconUrl: ''
      }, {
        name: '可回收物',
        iconUrl: 'recyclable.svg'
      }, {
        name: '有害垃圾',
        iconUrl: 'hazardous.svg'
      }, {
        name: '湿垃圾',
        iconUrl: 'household.svg'
      }, {
        name: '干垃圾',
        iconUrl: 'garbage.svg'
      }

    ],
    bgConfig: {},
    iconConfig: {},
    tabList: ["a","b","c", "d", "e"],
    currentPage: 0,
    dataList:[],
    windowWidth: wx.getSystemInfoSync().windowWidth || 375,
    tabLeft: 0
  },
  _data: {
    tabLength: 0,
    tabWidthArr: [],
    offsetArr: []
  },
  onLoad(){

  },
  onReady(){
    this.getAllRects();
    this.getAllData();
  },
  onShareAppMessage(e){
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

  },
  getAllData(){
    let data = require('../../config/base_data.js')
    let baseData = data.default.baseData;
    let naviList = [],
      dataList = [],
      bgConfig = {},
      iconConfig = {};
    baseData.sort((a,b) => {
      return a.num - b.num;
    })
    baseData.map(item => {
      let naviObj = {
        name: item.chineseName,
        iconUrl: item.iconUrl
      };
      let dataObj = {
        description: item.description,
        backgroundColor: item.backgroundColor,
        list: (item.englishName === 'all' || item.chineseName === '全部') ? app.globalData.all : item.list
      }
      iconConfig[item.chineseName] = item.iconUrl;
      bgConfig[item.chineseName] = item.backgroundColor;
      naviList.push(naviObj);
      dataList.push(dataObj);
    })

    this.setData({
      iconConfig,
      bgConfig,
      // naviList,
      dataList
    })
  },
  changeTable(e){
    let num = e.currentTarget.dataset.num;
    if (num !== this.data.currentPage){
      let windowWidth = this.data.windowWidth;
      let {
        tabLength,
        tabWidthArr,
        offsetArr
      } = this._data;
      const MAX = tabLength - windowWidth;
      this.setData({
        tabLeft: offsetArr[num] - (windowWidth - tabWidthArr[num])/2 > MAX ? MAX : offsetArr[num] - (windowWidth - tabWidthArr[num])/2,
        currentPage: num
      })
    }
  },
  contentChange(e){
    let current = e.detail.current;
    if(current !== this.data.currentPage){
      let windowWidth = this.data.windowWidth;
      let {
        tabLength,
        tabWidthArr,
        offsetArr
      } = this._data;
      const MAX = tabLength - windowWidth;
      this.setData({
        tabLeft: offsetArr[current] - (windowWidth - tabWidthArr[current]) / 2 > MAX ? MAX : offsetArr[current] - (windowWidth - tabWidthArr[current]) / 2,
        currentPage: e.detail.current
      })
    }
  },
  goToDetail(e){
    wx.navigateTo({
      url: '../detail/detail?link=' + JSON.stringify(e.currentTarget.dataset.link) + '&name=' + e.currentTarget.dataset.name
    })
  },
  getAllRects(){
    wx.createSelectorQuery().selectAll('.navi-content').boundingClientRect( (rects) => {
      let tabLength = 0;
      let offsetArr = [0];
      let tabWidthArr = []
      rects.forEach(function (rect) {
        tabWidthArr.push(rect.width);
        tabLength += rect.width;
        offsetArr.push(tabLength)
      })
      this._data.tabLength = tabLength;
      this._data.tabWidthArr = tabWidthArr;
      this._data.offsetArr = offsetArr;
    }).exec()
  },
  blankFun(){}
})
