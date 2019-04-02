<template>
    <div class="container">
      <div class="addTask">
        <el-form  label-width="80px" :model="subjectInfo">
          <el-form-item label="题目名称" >
            <el-input type="textarea" v-model="subjectInfo.titleName"  placeholder="请输入题目名称"></el-input>
          </el-form-item>
          <el-form-item label="所属科目" >
            <el-select
              v-model="subjectInfo.subjectName"
              filterable
              remote
              reserve-keyword
              allow-create
              placeholder="请选择文章标签">
              <el-option
                v-for="item in subjectNameList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科目种类">
            <el-select
              v-model="subjectInfo.subjectClass"
              filterable
              remote
              reserve-keyword
              allow-create
              placeholder="请选择文章标签">
              <el-option
                v-for="item in subjectClassList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目来源">
            <el-select
              v-model="subjectInfo.subjectScouse"
              filterable
              remote
              reserve-keyword
              allow-create
              placeholder="请选择文章标签">
              <el-option
                v-for="item in subjectScouseList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平均分">
            <el-select
              v-model="subjectInfo.average"
              filterable
              remote
              reserve-keyword
              allow-create
              placeholder="请选择文章标签">
              <el-option
                v-for="item in averageList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editSubjectInfo">编辑</el-button>
      </div>
    </div>
</template>

<script>
  var AV = require('leancloud-storage')

  export default {
    name: 'checkSubject',
    data () {
      return {
        subjectInfo: {
          titleName:'',
          subjectScouse:'',
          subjectName:'',
          average:'',
          subjectClass:''
        },
        subjectScouseList:[],
        subjectNameList:[],
        averageList:[],
        subjectClassList:[]
      }
    },
    mounted(){
      this.getSubjectClass()
      this.getSubjectName()
      this.getSubjectScouse()
      this.getAverageList()
      this.getSubjectInfo()
    },
    methods:{
      /*
      * 编辑任务
      * */
      editSubjectInfo(){
        let subjectInfo = this.subjectInfo
        var subjectInfoList = AV.Object.createWithoutData('SubjectInfoList', subjectInfo.id);
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
            this.$message({
              message: '编辑任务成功',
              type: 'success'
            });
            this.$router.push('/subjectList')
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
      /*
      * 获取任务信息
      * */
      getSubjectInfo(){
        var query = new AV.Query('SubjectInfoList')
        query.equalTo('objectId',this.$route.params.id).find()
          .then(data => {
            let infoList = data.map(item => {
              item.attributes.creatTime = item.createdAt.toJSON().substring(0, 10)
              item.attributes.id = item.id
              return item.attributes
            })
            infoList.map(item => {
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
                  this.subjectInfo = data
                })
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
      * 获取下拉框选项
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
    }
  }
</script>

<style scoped>
  .container{
    width: 50%;
    margin: 30px auto;
  }
  .addTask{
    padding: 30px;
    background-color: white;
  }
  .dialog-footer{
    background-color: white;
    text-align: center;
    height: 100px;
  }
</style>
