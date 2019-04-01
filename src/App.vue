<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    min-width: 1000px;
    background-color: #f6f6f6;
    margin: 0px;
  }
  @media (max-width: 500px) {
    body {
      min-width: auto;
    }
  }
</style>
