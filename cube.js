import * as THREE from 'three';

export function initCube(containerId) {
    const container = document.getElementById(containerId);
    const canvas=document.getElementById(containerId);
    const w=canvas.clientWidth;
    const h=canvas.clientHeight;
    //
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(45,w/h,0.1,1000);
    camera.position.set(0,0,2.5);
    camera.lookAt(0,0,0);
    //
    const renderer=new THREE.WebGLRenderer({alpha:true});//透明背景
    renderer.setSize(w,h);
    renderer.setClearColor(0x000000,0);//背景透明
    canvas.appendChild(renderer.domElement);
    //
    const ambientlight=new THREE.AmbientLight(0x404060);
    scene.add(ambientlight);
    const dirlight=new THREE.DirectionalLight(0xffffff,1);
    dirlight.position.set(2,3,4);
    scene.add(dirlight);
    const backLight=new THREE.DirectionalLight(0xff44ff,0.5);
    backLight.position.set(-2,1,-3);
    scene.add(backLight);
    //
    const loader=new THREE.TextureLoader();
    const sign=loader.load("logo.png");
    sign.colorSpace=THREE.SRGBColorSpace;
    //
    const frontMaterial=new THREE.MeshStandardMaterial({map:sign,metalness:0.2,roughness:0.3});
    const colors=[0x3DF8F8,0xE23AFB,0x74FF01,0x0E48C1];
    const color=colors.map(c=>new THREE.MeshStandardMaterial({color:c,metalness:0.7,roughness:0.3}));
    const materials=[
        color[0],
        color[1],
        color[2],
        color[3],
        frontMaterial,
        color[0]
    ];
    //
    const geometry=new THREE.BoxGeometry(1.1,1.1,1.1);
    const cube=new THREE.Mesh(geometry,materials);
    scene.add(cube);
    //
    function animate(){
        requestAnimationFrame(animate);
        cube.rotation.x+=0.01;
        cube.rotation.y+=0.01;
        //cube.rotation.z+=0.01;
        renderer.render(scene,camera);
    }
    animate();
    window.addEventListener('resize', () => {
        const newWidth = canvas.clientWidth;
        const newHeight = canvas.clientHeight;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
    });
    return { cube, scene, camera, renderer };
}