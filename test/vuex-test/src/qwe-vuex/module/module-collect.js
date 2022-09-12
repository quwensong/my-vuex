import { forEach } from '../utils.js'
import Module from './module'

class ModuleCollection {
  constructor(options){
      this.root = null
      this.register([],options)
  }

  register(path,rootModule){
    const newModule = new Module(rootModule)

    if(path.length == 0){
      this.root = newModule
    }else{
      // 找父亲 
      const parent = path.slice(0,-1).reduce((pre,cur)=>{
        return pre.getChild(cur)
      },this.root)

      parent.addChild(path.at(-1),newModule)
      // parent._children[path.at(-1)] = newModule
      // 下面这种写法会把所有的模块都加在root上面，所以要找当前模块的父模块，操作如上面，先用slice把自己排除掉
      // this.root._children[path.at(-1)] = newModule
    }
    if(rootModule.modules){
      forEach(rootModule.modules,(module,key)=>{
        this.register(path.concat(key),module)
      })
    }
  }

}

export default ModuleCollection;