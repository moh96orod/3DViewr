import { OBJLoader } from "../script/OBJLoader.js";

export function run3(name) {
    var divLandmark = document.getElementById("landmarkdiv");
    var landmarkSave = localStorage.getItem("bookmarksName");
    var landmarkFile = localStorage.getItem("bookmarksFile");
    var sort = landmarkFile.split(",");
    var sortLandmarkData = landmarkSave.split(",");
    sortLandmarkData = sortLandmarkData.slice();

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        .01,
        1000
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("modify").appendChild(renderer.domElement);
    var obj;

    var fileName = name;
    console.log(fileName);
    document.getElementById("filename").innerHTML = name;
    var loader = new OBJLoader();
    loader.load(`../UploadData/Data/${fileName}`, (object) => {
        scene.add(object);
        obj = object;
    });

    var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
    scene.add(light);
    camera.position.set(40, 0, 40);
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    var zoomValue = localStorage.getItem("zoom_value", "");

    if (zoomValue != "") {
        function render() {
            if (zoomValue && camera.position.z > 10) {
                camera.position.z = zoomValue / 8;
            } else if (!zoomValue && camera.position.z < 100) {
                camera.position.z = zoomValue / 2;
            }
            requestAnimationFrame(render);
            renderer.render(scene, camera);

            localStorage.setItem("zoom_value", zoomValue);
        }

        render();
    } else {

    }
    animate();
}
