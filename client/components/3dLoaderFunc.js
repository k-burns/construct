import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'


const loader = (duckColor, scene, loader) =>{
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


  scene.background = new THREE.Color('black')

  {
    const skyColor = 0xb1e1ff // light blue
    const groundColor = 0xb97a00 // brownish orange
    const intensity = 0.75
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }

  {
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(0, 10, 0)
    light.target.position.set(-5, 0, 0)
    scene.add(light)
    scene.add(light.target)
  }

  {

    loader.load('./duck.obj', function(object) {
      object.traverse(function(child) {
        if (child.isMesh) {
          const oldMat = child.material

          child.material = new THREE.MeshPhongMaterial({
            color: duckColor,
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

export default loader
