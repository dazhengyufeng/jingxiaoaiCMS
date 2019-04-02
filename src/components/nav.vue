<template>
    <div class="nav-div">
      <div class="nav-contain">
         <div class="nav-logo">
           logo
         </div>
         <div class="nav-menu">
           <el-menu :default-active="activeIndex" class="el-menu-demo"
                    mode="horizontal"
                    active-text-color="#4186F4"
                    @select="handleSelect">
             <el-menu-item index="1">题库</el-menu-item>
             <el-menu-item index="2">试卷</el-menu-item>
             <el-menu-item index="3">测试</el-menu-item>
             <el-menu-item index="4">阅卷</el-menu-item>
             <el-menu-item index="5">报告</el-menu-item>
             <el-menu-item index="6">数据报表</el-menu-item>
           </el-menu>
         </div>
        <div class="logo">
          <div class="info-logo">
            <img src="../assets/info.png" alt="">
            <div class="number-div"><span>0</span></div>
          </div>
          <div class="user-logo">
            <img src="../assets/user.png" alt="">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key) {
      if (key == 1) {
        this.$router.push('/subjectList')
      } else {
        this.$router.push('/tinymce')
      }
    }
  }
}
</script>

<style scoped>
  .nav-div{
    height: 70px;
    width: 100%;
    min-width: 1000px;
    background-color: #FFFFFF;
    box-shadow:0px 3px 12px 0px rgba(0,0,0,0.1);
  }
  @media (max-width: 500px) {
    .nav-div>>>.el-menu-item{
      padding: 0 5px 0 0;
    }
    .nav-logo{
      display: none !important;
    }
    .logo{
      display: none !important;;
    }
    .nav-div{
      min-width: auto;
    }
  }
  .nav-contain{
    margin: 0 5% 0 5%;
    width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }
  .nav-logo{
    color: #4186F4;
    font-size: 14px;
    width: 138px;
    height: 48px;
    background-color: #EFF5FF;
    display: flex;
    justify-content:center;
    align-items:Center;
    margin-right: 38px;
  }
  .nav-menu{
    height: 100%;
  }
  .nav-menu > ul{
    height: 100%;
  }
  .nav-menu>>>.el-menu--horizontal>.el-menu-item{
    height: 100%;
    line-height: 70px;
  }
  .nav-menu > .el-menu.el-menu--horizontal{
    border-bottom: 0px;
  }
  .logo{
    display: flex;
    height: 100%;
    position: absolute;
    right: 0px;
  }
  .info-logo{
    display: flex;
    justify-content:center;
    align-items:Center;
    position: relative;
    margin-right: 30px;
  }
  .info-logo > img{
    display: block;
    width: 20px;
    height: 19px;
  }
  .user-logo{
    display: flex;
    justify-content:center;
    align-items:Center;
  }
  .user-logo > img{
    display: block;
    width: 20px;
    height: 20px;
  }
  .number-div{
    color: #FFFFFF;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #FF666C;
    position: absolute;
    left: 13px;
    bottom: 33px;
    display: flex;
    justify-content:center;
    align-items:Center;
  }
</style>
