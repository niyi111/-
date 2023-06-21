//index.js

var util = require("../../utils/util.js");

//更改数组 第三个参数是对象
function editArr(arr,i,editCnt){
  let newArr = arr,editingObj = newArr[i];   
    for (var x in editCnt){
      editingObj[x]= editCnt[x];
    }
  return newArr;
}

//获取应用实例
var app = getApp()
Page({
  data: {  
    userInfo: {},
    curIpt:'',
    showAll:true,
    lists:[],
    curRange:[],
    curBegin:0,
    curFinish:1,
    remind:[]
  },
  //事件处理函数，跳转至日志显示界面
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    //获取之前保留在缓存里的数据
    wx.getStorage({
      key: 'todolist',
      success: function(res) {
        if(res.data){
           that.setData({
            lists:res.data
          })
        }
      } 
    })
    //获取用户信息
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
  },
  //输入框输入信息并更新存储
  iptChange(e){ 
    let timeArr = util.setTimeHalf();   
    this.setData({
      curIpt:e.detail.value,
      curRange:timeArr
    })
  },
  //清空输入框
  formReset(){
    this.setData({
      curIpt:'',
      curRange:[]
    })
  },
  //挂单发布
  formSubmit(){
    let cnt = this.data.curIpt,newLists = this.data.lists,i = newLists.length,begin=this.data.curRange[this.data.curBegin],finish = this.data.curRange[this.data.curFinish];
    if (cnt){
       newLists.push({id:i,content:cnt,done:false,beginTime:begin,finishTime:finish,editing:false});
       this.setData({
        lists:newLists,
        curIpt:''
      }) 
    }
  },
  //选择改变开始时间
  beginChange(e){
     this.setData({
      curBegin: e.detail.value,
      curFinish: Number(e.detail.value)+1
    })
  },
  //选择改变结束时间
  finishChange(e){
    this.setData({
      curFinish: e.detail.value
    })
  },
  //订单显示辅助功能
  toChange(e){
    let i = e.target.dataset.id;
      this.setData({
        lists:editArr(this.data.lists,i,{editing:true})
      })
  },
  //修改订单
  iptEdit(e){
    let i = e.target.dataset.id;
    this.setData({
      lists:editArr(this.data.lists,i,{curVal:e.detail.value})
    })
  },
  saveEdit(e){   
    let i = e.target.dataset.id;
    this.setData({
      lists:editArr(this.data.lists,i,{content:this.data.lists[i].curVal,editing:false})
    })
  },
  //接单功能
  setDone(e){
    let i = e.target.dataset.id,originalDone = this.data.lists[i].done;
      this.setData({
        lists:editArr(this.data.lists,i,{done:!originalDone})
      })
  },
  //删除某条订单
  toDelete(e){
    let i = e.target.dataset.id,newLists = this.data.lists;
    newLists.map(function(l,index){
      if (l.id == i){      
        newLists.splice(index,1);
      }
    })   
    this.setData({
        lists:newLists
      })
  },
  //删除全部订单
  deleteAll(){
    this.setData({
        lists:[],
        remind:[]
      })
  },
  //显示未完成订单
  showUnfinished (){
    this.setData({
      showAll:false
    })
  },
  //显示全部订单
  showAll(){
     this.setData({
      showAll:true   
    })
  },
  //存储刷新数据
  saveData(){
    let listsArr = this.data.lists;
    wx.setStorage({
      key:'todolist',
      data:listsArr
    })
  }
})
