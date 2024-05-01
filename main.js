import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//building a scene
const scene = new THREE.Scene();

// geometry is what the object looks like
const sphereGeometry = new THREE.SphereGeometry(3,64,64);
//material is how the object looks like, like what color it is,  what texture it has
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: '#00ffff',
});

//Mesh is a combination of geoetry and material (the ultimate object)
const mesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(mesh);  //adding the mesh to the scene


//adding a light 
const light = new THREE.PointLight(0xffffff,200,100)
light.position.set(0,10,10) // x- left/right y - up/down z = in/out
scene.add(light)

//sizes

const sizes = 
{
  width: window.innerWidth,
  height: window.innerHeight
}



//Adding a camera - the scene that the camera is looking at is the scen that is vissible
//Field of view = how much the camera can see
//Aspect ratio
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100)
camera.position.z = 20
scene.add(camera)




//we need to render the scene to the screen and we do it with canvas
const canvas = document.getElementsByClassName('webgl')[0]
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)


//controls

const controls = new OrbitControls(camera,canvas) //for controling the scne
controls.enableDamping=true;
controls.enablePan = false; //not allowing right and miidle mouse action
controls.enableZoom = false;

controls.autoRotate = true;
controls.autoRotateSpeed = 3;

const loop = () =>
{

  controls.update()
  renderer.render(scene,camera)
  requestAnimationFrame(loop)
}

loop()

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera aspect ratio
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(sizes.width, sizes.height);

  // Render the scene
  renderer.render(scene, camera);
});

