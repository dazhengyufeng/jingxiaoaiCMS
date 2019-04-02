<template>
  <div>
    <el-dialog :visible.sync="isShow">
      <div class="addTask">
        <el-form  label-width="80px" :model="subjectInfo">
          <el-form-item label="题目名称" >
            <el-input type="textarea" v-model="subjectInfo.titleName"  placeholder="请输入题目名称"></el-input>
          </el-form-item>
          <el-form-item label="所属科目" >
            <!--<el-input v-model="subjectInfo.subjectName" placeholder="请输入所属科目"></el-input>-->
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
            <!--<el-input v-model="subjectInfo.subjectClass" placeholder="请输入科目种类"></el-input>-->
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
            <!--<el-input v-model="subjectInfo.subjectScouse" placeholder="请输入题目来源"></el-input>-->
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
            <!--<el-input v-model="subjectInfo.average" placeholder="请输入平均分"></el-input>-->
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
        <el-button type="primary" @click="sendSubjectInfo">立即创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isShow: Boolean,
    subjectNameList:{
      type: Array,
      default: function(){
        return []
      }
    },
    subjectClassList:{
      type: Array,
      default: function(){
        return []
      }
    },
    subjectScouseList:{
      type: Array,
      default: function(){
        return []
      }
    },
    averageList:{
      type: Array,
      default: function(){
        return []
      }
    }
  },
  data () {
    return {
      subjectInfo: {}
    }
  },
  methods: {
    sendSubjectInfo () {
      if (this.subjectInfo.titleName && this.subjectInfo.subjectName && this.subjectInfo.subjectClass && this.subjectInfo.subjectScouse && this.subjectInfo.average) {
        this.$emit('sendSubjectInfo', this.subjectInfo)
        this.isShow = false
      } else {
        this.$message.error('请将信息补充完整')
      }
    }
  },
  watch: {
    isShow () {
      this.$emit('update:isShow', this.isShow)
    }
  }

}
</script>

<style scoped>

</style>
