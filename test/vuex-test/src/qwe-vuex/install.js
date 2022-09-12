export let Vue;

function install(_Vue){
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      let options = this.$options;
      if(options.store){
        // 根组件
        this.$store = options.store;

      }else{
        // 子组件(保证是子组件且父组件上面有$store)
        if(this.$parent && this.$parent.$store){
          this.$store = this.$parent.$store;
        }
        
      }
      
    }
  })

}

export default install