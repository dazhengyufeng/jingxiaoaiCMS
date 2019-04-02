<template>
  <div>
    <el-dialog :visible.sync="isShow">
      <div class="addTask">
        <el-form  label-width="80px" :model="subjectInfo">
          <el-form-item label="题目名称" >
            <el-input type="textarea" v-model="subjectInfo.titleName"  placeholder="请输入题目名称" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="所属科目" >
            <el-input v-model="subjectInfo.subjectName" placeholder="请输入所属科目" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="科目种类">
            <el-input v-model="subjectInfo.subjectClass" placeholder="请输入科目种类" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="题目来源">
            <el-input v-model="subjectInfo.subjectScouse" placeholder="请输入题目来源" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="平均分">
            <el-input v-model="subjectInfo.average" placeholder="请输入平均分" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'showSubjectInfo',
    props: {
      isShow: Boolean,
      subjectInfo:{}
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
