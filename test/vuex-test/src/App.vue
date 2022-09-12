<template>
  <div id="app">
    {{$store.state.count}}
    {{$store.getters.myName}}
    {{$store.state.age}}
    <button @click="change">更改</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted(){
    console.log(this.$store.getters.myName)
    
  },
  methods: {
    change(){
      this.$store.dispatch('changeAge',10)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
