//app.js
App({
  globalData: {
    all:[],
    bgConfig: {},
    iconConfig: {},
    descriptionConfig: {}
  },
  onLaunch: function () {
    // 展示本地存储能力
    let data = require('./config/base_data.js')
    let baseData = data.default.baseData;
    let all = [],
      iconConfig = {},
      bgConfig = {},
      descriptionConfig = {};
    baseData.map(item => {
      iconConfig[item.chineseName] = item.iconUrl;
      bgConfig[item.chineseName] = item.backgroundColor;
      descriptionConfig[item.chineseName] = item.description;
      all = all.concat(item.list);
    })

    all.sort(function(a, b) {
      return (a.englishName + '').localeCompare(b.englishName + '')
    })
    this.globalData.iconConfig = iconConfig;
    this.globalData.bgConfig = bgConfig;
    this.globalData.descriptionConfig = descriptionConfig;
    this.globalData.all = all;
  }
})