import { forEach } from '../utils.js'
class Module {
  constructor(rootModule) {
    this._raw = rootModule
    this._children = {}
    this.state = rootModule.state
  }

  getChild(childName){
    return this._children[childName]
  }
  addChild(childName,module){
    this._children[childName] = module
  }
  forEachGetters(cb){
    this._raw.getters && forEach(this._raw.getters,cb)
  }
  forEachMutations(cb){
    this._raw.mutations && forEach(this._raw.mutations,cb)
  }
  forEachActions(cb){
    this._raw.actions && forEach(this._raw.actions,cb)
  }
  forEachChildren(cb){
    this._children && forEach(this._children,cb)
  }


}

export default Module
