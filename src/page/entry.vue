<template>
    <div>
      <navmodel></navmodel>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
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
