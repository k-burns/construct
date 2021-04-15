import React from 'react'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {createDuck} from '../store/ducks'
import {connect} from 'react-redux'

class DuckLoader extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {colorPicker: '#fafafa',
    name: ''
  }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.main = this.main.bind(this)
    this.saveDuck = this.saveDuck.bind(this)
  }

  componentDidMount() {
    this.main()
  }

  main() {
    const canvas = document.querySelector('#c')
    const renderer = new THREE.WebGLRenderer({canvas})

    const fov = 45
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 100
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 10, 20)

    const controls = new OrbitControls(camera, canvas)
    controls.target.set(0, 5, 0)
    controls.update()

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('black')
    const scene = this.scene

    {
      const skyColor = 0xb1e1ff // light blue
      const groundColor = 0xb97a00 // brownish orange
      const intensity = 0.75
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
      this.scene.add(light)
    }

    {
      const color = 0xffffff
      const intensity = 1
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(0, 10, 0)
      light.target.position.set(-5, 0, 0)
      this.scene.add(light)
      this.scene.add(light.target)
    }

    {
      const color = this.state.colorPicker
      const scene = this.scene
      this.objLoader = new OBJLoader()
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

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }
      return needResize
    }

    function render() {
      renderer.render(scene, camera)

      requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
    console.log(evt.target.value)
  }

  handleSubmit(evt) {

    evt.preventDefault()
    console.log('hi there')
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
  saveDuck(evt) {
    evt.preventDefault()
    console.log(this.props)
    this.props.addDuck(
      this.state.colorPicker,
      this.state.name,
      this.props.userId
    )
  }
  render() {
    return (
      <div>
        <div ref={ref => (this.mount = ref)} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="colorPicker">Pick your color!</label>
          <input type="color" name="colorPicker" onChange={this.handleChange} />
          <button>Try</button>
        </form>
        <form onSubmit={this.saveDuck}>
          <label htmlFor="name">Save my Duck</label>
          <input type="text" name="name" onChange={this.handleChange} />
          <button>Save</button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  name: state.name,
  color: state.colorPicker
})
const mapDispatch = dispatch => ({
  addDuck: (duckColor, duckName, userId) =>
    dispatch(createDuck(duckColor, duckName, userId))
})

export default connect(mapState, mapDispatch)(DuckLoader)
