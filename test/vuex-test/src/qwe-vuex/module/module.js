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

}

export default Module
