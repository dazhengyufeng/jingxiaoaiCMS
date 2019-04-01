<template>
    <div>
      <navmodel></navmodel>
      <keep-alive include="SubjectList">
        <router-view/>
      </keep-alive>
    </div>
</template>

<script>
import navmodel from '../components/nav'
export default {
  name: 'entry',
  components: {
    navmodel
  }
}
</script>

<style scoped>

</style>
