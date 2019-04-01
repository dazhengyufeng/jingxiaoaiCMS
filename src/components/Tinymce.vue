<template>
  <div style="position: relative">
    <div class='tinymce'>
      <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>

      <div v-html='tinymceHtml'></div>
    </div>
    <el-button @click="initTinymce">初始化</el-button>
  </div>

</template>

<script>
import 'tinymce/skins/ui/oxide/skin.css'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/media'
export default {
  name: 'tinymce',
  data () {
    return {
      tinymceHtml: '请输入内容',
      init: {
        language_url: '/static/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/lightgray',
        height: 300,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu media',
        toolbar:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false
      }
    }
  },
  mounted () {
    tinymce.init({})
    console.log('==================')
  },
  methods: {
    initTinymce () {

    }
  },
  components: {Editor}
}
</script>
<style scoped>
  .tinymce{
    width: 50%;
    height: 50%;
  }
  .el-button{
    position: absolute;
    right: 500px;
    top: 50px;
  }
</style>
