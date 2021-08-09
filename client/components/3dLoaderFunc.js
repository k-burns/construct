import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

//function to make 3-D environment

const loader = (duckColor, scene, loader) => {
  const manager = new THREE.LoadingManager();
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })
  //camera position
  const fov = 45
  const aspect = 2
  const near = 0.1
  const far = 75
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 10, 20)
  //rotation and zooming controls
  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 5, 0)
  controls.update()

  scene.background = new THREE.Color('black')

  {
    //hemispherelight settings
    const skyColor = 0xb1e1ff
    const groundColor = 0xb97a00
    const intensity = 0.75
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }

  {
    //directional light settings
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(0, 10, 0)
    light.target.position.set(-5, 0, 0)
    scene.add(light)
    scene.add(light.target)
  }

  {
    //loading duck and color
    loader.load('./duck.obj', function (object) {
      object.traverse(function (child) {
        if (child.isMesh) {
          const oldMat = child.material

          child.material = new THREE.MeshPhongMaterial({
            color: duckColor,
            map: oldMat.map,
          })
        }
      })
      scene.add(object)
    })
  }
  //render scene in canvas
  function render() {
    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

export default loader
