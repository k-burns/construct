import React from 'react'
import * as THREE from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {editDuck, deleteDuck} from '../store/ducks'
import {connect} from 'react-redux'
import loader from './3dLoaderFunc'

class SavedDuck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {colorPicker: this.props.location.state.color,
    name: this.props.location.state.name,
    saved: false,
    deleted: false
  }
    this.scene = new THREE.Scene()
    this.objLoader = new OBJLoader()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateDuck = this.updateDuck.bind(this)
    this.deleteDuck = this.deleteDuck.bind(this)

  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const color = this.state.colorPicker
    let scene = this.scene
    this.objLoader.load('./duck.obj', function(object) {
      object.traverse(function(child) {
        if (child.isMesh) {
          const oldMat = child.material

          child.material = new THREE.MeshPhongMaterial({
            color: color,
            map: oldMat.map
          })
        }
      })
      scene.add(object)
    })
  }

  componentDidMount() {
    loader(this.state.colorPicker, this.scene, this.objLoader)
  }

  updateDuck(evt) {
    evt.preventDefault()

    if(this.state.name === undefined){
      window.alert('Please name your friend')
    }else{
      this.props.editDuck(
        this.state.colorPicker,
        this.state.name,
        this.props.location.state.id
      )
      this.setState({saved: true})
    }
  }

  deleteDuck(evt){
    evt.preventDefault()
    console.log('deleting')
    this.props.removeDuck(this.props.location.state.id)
    this.setState({deleted: true})
  }

  render() {
    return (
      <div>
        <canvas id = 'c'></canvas>
        <div ref={ref => (this.mount = ref)} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="colorPicker">Pick your color!</label>
          <input type="color" name="colorPicker" onChange={this.handleChange} />
          <button>Try</button>
        </form>
        <form onSubmit={this.updateDuck}>
          <label htmlFor="name">Update my Duck</label>
          <input type="text" name="name" onChange={this.handleChange} />
          <button>Save</button>
        </form>
        <button onClick = {this.deleteDuck}>Delete This Duck</button>
        <div>{this.state.deleted && <div>Duck Removed From Nest!</div>}</div>
        <div>{this.state.saved && <div>Duck Updated!</div>}</div>
      </div>
    )
  }
}

const mapState = state => ({
 state: state
})
const mapDispatch = dispatch => ({
  editDuck: (duckName, duckColor, duckId) =>
    dispatch(editDuck(duckName, duckColor, duckId)),
  removeDuck: (duckId) =>
    dispatch(deleteDuck(duckId))
})

export default connect(mapState, mapDispatch)(SavedDuck)
