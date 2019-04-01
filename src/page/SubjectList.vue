<template>
  <div class="contain">
    <div class="main">
      <div class="select-nav">
        <div class="subject-item">
          <span>所属科目</span>
          <el-select v-model="subjectName" placeholder="请选择" @change="getSubjectInfoList">
            <el-option
              v-for="item in subjectNameList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="subject-item">
          <span>题目种类</span>
          <el-select v-model="subjectClass" placeholder="请选择" @change="getSubjectInfoList">
            <el-option
              v-for="item in subjectClassList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="subject-item">
          <span>题目来源</span>
          <el-select v-model="subjectScouse" placeholder="请选择" @change="getSubjectInfoList">
            <el-option
              v-for="item in subjectScouseList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="subject-item">
          <span>平均分</span>
          <el-select v-model="average" placeholder="请选择" style="height: 32px" @change="getSubjectInfoList">
            <el-option
              v-for="item in averageList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="input-div">
          <el-input
            placeholder="关键字+关键词"
            suffix-icon="el-icon-search"
            @blur="getSubjectInfoList"
            v-model="input">
          </el-input>
        </div>
      </div>
      <div class="contain-two">
        <el-button type="primary" icon="el-icon-circle-plus"
                   style="width: 133px;height: 40px" @click="showCreatSubject">新建试题</el-button>
        <div class="info">“信息” <span class="number">{{count}}</span>  <span>条</span> </div>
      </div>
      <div class="table-div">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="getRowClass">
          <el-table-column
            prop="titleName"
            label="题目名称"
            width="260px"
          >
            <template slot-scope="scope">
              <el-tooltip placement="bottom"
                          style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;cursor:pointer;">
                <div slot="content">{{scope.row.titleName}}</div>
                <a :class="[!scope.row.isGoing ? 'active' : '' ]">{{scope.row.titleName}}</a>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="subjectName"
            label="所属科目"
          >
            <template slot-scope="scope">
              <span :class="[!scope.row.isGoing ? 'active' : '' ]">{{scope.row.subjectName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="subjectClass"
            label="科目种类"
          >
            <template slot-scope="scope">
              <span :class="[!scope.row.isGoing ? 'active' : '' ]">{{scope.row.subjectClass}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="subjectScouse"
            label="题目来源"
          >
            <template slot-scope="scope">
              <span :class="[!scope.row.isGoing ? 'active' : '' ]">{{scope.row.subjectScouse}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="creatTime"
            label="创建时间"
            sortable
          >
            <template slot-scope="scope">
              <span :class="[!scope.row.isGoing ? 'active' : '' ]">{{scope.row.creatTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="average"
            label="历史平均分"
          >
            <template slot-scope="scope">
              <span :class="[!scope.row.isGoing ? 'active' : '' ]">{{scope.row.average}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="handle"
            label="操作"
            width="260px"
          >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small" :class="[!scope.row.isGoing ? 'active' : '' ]" :disabled="scope.row.isGoing?false:true">复制</el-button>
              <el-button type="text" size="small" :class="[!scope.row.isGoing ? 'active' : '' ]" :disabled="scope.row.isGoing?false:true">查看</el-button>
              <el-button type="text" size="small" :class="[!scope.row.isGoing ? 'active' : '' ]" :disabled="scope.row.isGoing?false:true">分享</el-button>
              <el-button type="text" size="small" :class="[!scope.row.isGoing ? 'active' : '' ]" :disabled="scope.row.isGoing?false:true">编辑</el-button>
              <el-button type="text" size="small" @click="changeState(scope.row)">{{scope.row.isGoing ? '停用' : '启用'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout=" prev, pager, next,total, jumper"
            :total="count"
            style="margin-right: 20px">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="foot-div">
      <div class="foot-div-title">
        <div>帮助</div>
        <div>隐私</div>
        <div>条款</div>
      </div>
      <div class="foot-div-contain">
        <span>Copyright</span><span>@2019 鲸航科技技术部出品</span>
      </div>
    </div>
    <creatSubject :is-show.sync="isOnCreateSubject" @sendSubjectInfo="saveSubjectInfo"
                  :subjectNameList="subjectNameList"
                  :subjectClassList="subjectClassList"
                  :subjectScouseList="subjectScouseList"
                  :averageList="averageList"></creatSubject>
  </div>
</template>

<script>
import creatSubject from '../components/creatSubject'

var AV = require('leancloud-storage')

export default {
  name: 'SubjectList',
  components: {
    creatSubject
  },
  data () {
    return {
      isOnCreateSubject: false,
      subjectNameList: [],
      subjectClassList: [],
      subjectScouseList: [],
      averageList: [],
      subjectClass: '',
      subjectScouse: '',
      average: '',
      subjectName: '',
      currentPage: 1,
      input: '',
      tableData: [],
      count: 0,
      page: 0
    }
  },
  mounted () {
    this.getSubjectInfoList()
    this.getSubjectClass()
    this.getSubjectName()
    this.getSubjectScouse()
    this.getAverageList()
  },
  activated () {
    console.log(1111111111)
  },
  methods: {
    getRowClass ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0) {
        return 'background:#EFEFEF;height:64px'
      } else {
        return ''
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.page = (val - 1) * 10
      this.getSubjectInfoList()
    },
    showCreatSubject () {
      this.isOnCreateSubject = true
    },
    /*
    * 获取列表信息
    * */
    getSubjectInfoList () {
      var query = new AV.Query('SubjectInfoList')
      if (this.subjectName !== '') {
        query.equalTo('subjectName', AV.Object.createWithoutData('SubjectName', this.subjectName));
      }
      if (this.subjectClass !== '') {
        query.equalTo('subjectClass', AV.Object.createWithoutData('SubjectName', this.subjectClass));
      }
      if (this.subjectScouse !== '') {
        query.equalTo('subjectScouse', AV.Object.createWithoutData('SubjectName', this.subjectScouse));
      }
      if (this.average !== '') {
        query.equalTo('average', AV.Object.createWithoutData('SubjectName', this.average));
      }
      if(this.input !== ''){
        query.contains('titleName', this.input)
      }
      query.count().then(data => {
        this.count = data
      })
      query.limit(10)
        .skip(this.page)
        .find()
        .then(data => {
          let infoList = data.map(item => {
            item.attributes.creatTime = item.createdAt.toJSON().substring(0, 10)
            item.attributes.id = item.id
            return item.attributes
          })
          let list = infoList.map(item => {
            return new Promise(resolve => {
              let averageValue = this.getValue(item.average.id,'Average')
              let subjectClassValue = this.getValue(item.subjectClass.id,'SubjectClass')
              let subjectNameValue = this.getValue(item.subjectName.id,'SubjectName')
              let subjectScouseValue = this.getValue(item.subjectScouse.id,'SubjectScouse')
              Promise.all([averageValue,subjectClassValue,subjectNameValue,subjectScouseValue]).then(request => {
                let data = {
                  id:item.id,
                  creatTime:item.creatTime,
                  isGoing:item.isGoing,
                  titleName:item.titleName,
                  average:request[0],
                  subjectClass:request[1],
                  subjectName:request[2],
                  subjectScouse:request[3]
                }
                resolve(data)
              })
            })
          })
          Promise.all(list).then(data => {
            this.tableData = data
          })
        })
    },
    getValue(id,tableName){
      return new Promise(resolve => {
        var query = new AV.Query(tableName)
        query.equalTo('objectId',id).find().then(data => {
          resolve(data[0].attributes.name)
        })
      })
    },
    /*
    * 停用和启用
    * */
    changeState (row) {
      let isgoing = !row.isGoing
      var todo = AV.Object.createWithoutData('SubjectInfoList', row.id)
      todo.set('isGoing', isgoing)
        .save()
        .then(data => {
          this.getSubjectInfoList()
        })
    },
    /*
    * 获取下拉框数据
    * */
    getSubjectClass () {
      let query = new AV.Query('SubjectClass')
      query.find().then(request => {
        this.subjectClassList = request.map(item => {
          let info = {
            name:item.attributes.name,
            id:item.id
          }
          return info
        })
      })
    },
    getSubjectName () {
      let query = new AV.Query('SubjectName')
      query.find().then(request => {
        this.subjectNameList = request.map(item => {
          let info = {
            name:item.attributes.name,
            id:item.id
          }
          return info
        })
        console.log(this.subjectNameList)
      })
    },
    getSubjectScouse () {
      let query = new AV.Query('SubjectScouse')
      query.find().then(request => {
        this.subjectScouseList = request.map(item => {
          let info = {
            name:item.attributes.name,
            id:item.id
          }
          return info
        })
      })
    },
    getAverageList () {
      let query = new AV.Query('Average')
      query.find().then(request => {
        this.averageList = request.map(item => {
          let info = {
            name:item.attributes.name,
            id:item.id
          }
          return info
        })
      })
    },
    /*
    * 新建任务
    * */
    saveSubjectInfo (subjectInfo) {
      var SubjectInfoList = AV.Object.extend('SubjectInfoList')
      var subjectInfoList = new SubjectInfoList()//保存任务对象
      let subjectClassId = this.getFatherId(subjectInfo.subjectClass,subjectInfoList,'SubjectClass')
      let subjectNameId = this.getFatherId(subjectInfo.subjectName,subjectInfoList,'SubjectName')
      let subjectScouseId = this.getFatherId(subjectInfo.subjectScouse,subjectInfoList,'SubjectScouse')
      let averageId = this.getFatherId(subjectInfo.average,subjectInfoList,'Average')
      Promise.all([subjectClassId,subjectNameId,subjectScouseId,averageId]).then(req => {
        subjectInfoList
          .set('titleName', subjectInfo.titleName)
          .set('isGoing',true)
          .set('subjectClass', AV.Object.createWithoutData('SubjectClass', req[0]))
          .set('subjectName', AV.Object.createWithoutData('SubjectName', req[1]))
          .set('subjectScouse', AV.Object.createWithoutData('SubjectScouse', req[2]))
          .set('average', AV.Object.createWithoutData('Average', req[3]))
          .save().then(data => {
          console.log(data)
        })
      })
    },
    getFatherId(data,subjectInfoList,tableName){
      return new Promise(resolve => {
        let query = new AV.Query(tableName)
        query.equalTo('name',data).find().then(request => {
          if(request.length > 0){
            resolve(request[0].id)
          }else {
            var Add = AV.Object.extend(tableName)
            var add = new Add()
            add.set('name',data)
              .save().then(data => {
              resolve(data.id)
            })
          }
        })
      })
    },
  }
}
</script>

<style scoped>
  @media (max-width: 500px) {
    .select-nav{
      flex-wrap: wrap;
    }
    .subject-item{
      margin-right: 0px !important;
    }
    .main{
      width: 100% !important;
      margin: 26px 0 0 0 !important;
    }
  }
  .contain{
    width: 100%;
    height: 100%;
  }
   .main{
     /*background-color: #FFFFFF;*/
     width: 90%;
     /*height: 90%;*/
     margin: 26px 5% 0 5%;
   }
   .select-nav{
     width: 100%;
     /*height: 32px;*/
     display: flex;
     justify-content: space-between;
   }
  .subject-item{
    /*width: 164px;*/
    height: 100%;
    display: flex;
    justify-content:center;
    align-items:Center;
    margin-right: 30px;
    margin-bottom: 10px;
  }
  .subject-item >.el-select{
    width:101px;
    height:32px;
    background:rgba(255,255,255,1);
    border-radius:4px;
  }
  .subject-item >>>.el-input__inner{
    height: 32px;
    line-height: 32px;
  }
  .subject-item> span{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(35,35,35,1);
    margin-right: 7px;
  }
  .contain-two{
    margin-top: 26px;
    margin-bottom: 22px;
    display: flex;
    justify-content: space-between;
  }
  .foot-div{
    height: 65px;
    width: 270px;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 42px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.45);
  }
  .foot-div-title{
    display: flex;
    justify-content: space-around;
    margin-bottom: 14px;
  }
  .input-div>>>.el-input__inner{
    width: 206px;
    height: 32px;
    line-height: 32px;
  }
  .input-div>>>.el-input__suffix{
    top: -3px;
  }
  .info{
    height:22px;
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(136,136,136,1);
    line-height:22px;
  }
  .info>.number{
    font-size:20px !important;
    font-family:PingFangSC-Regular !important;
    font-weight:400 !important;
    color:rgba(255,102,108,1) !important;
  }
  .info>span{
    width:10px !important;
    height:14px !important;
    font-size:10px !important;
    font-family:PingFangSC-Regular !important;
    font-weight:400 !important;
    color:rgba(136,136,136,1) !important;
    line-height:14px !important;
  }
  .table-div{
    box-shadow:0px 3px 12px 0px rgba(0,0,0,0.1);
  }
  .pages{
    background-color: #FFFFFF;
    height: 78px;
    /*float: right;*/
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    justify-content: flex-end;
    box-shadow:0px 3px 12px 0px rgba(0,0,0,0.1);
  }
  .table-div >>>.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 30px;
  }
  .foot-div-contain{
    display: flex;
    justify-content: space-around;
    height: 20px;
    line-height: 20px;
    width: 90%;
    margin: auto;
  }
  .subject-item >>> .el-input__icon{
    line-height: 32px;
  }
  .active{
    opacity: 0.6;
  }
  .pages >>>.el-pager li{
    height: 22px;
    line-height: 22px;
    min-width: 22px;
  }
</style>

<style>
  li.active{
    background-color: #4186F4;
    border-radius: 50%;
    color: #FFFFFF !important;
  }
</style>
