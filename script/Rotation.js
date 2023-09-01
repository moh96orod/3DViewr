import { OBJLoader } from "../script/OBJLoader.js";
import { OrbitControls } from "../script/OrbitControls.js";

export function Rotation(data) {
    var mod = document.getElementById("modify");

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    var zoomValueLoad = localStorage.getItem("zoom_value", "");
    var zoomValue;
    if (zoomValue != "") {
        zoomValue = zoomValueLoad;
    } else {
        zoomValue = 10;
    }

    var xValue, yValue, zValue;

    function run() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            .01,
            1000
        );

        function getCookie(cookie_name) {
            var name = cookie_name + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("modify").appendChild(renderer.domElement);
        var obj;

        window.addEventListener('resize', function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix;
        });

        const controls = new OrbitControls(camera, renderer.domElement);

        var fileName = document.getElementById("filename").innerHTML;
        fileName = fileName.trim();
        var loader = new OBJLoader();
        loader.load(`../UploadData/Data/${fileName}`, (object) => {
            scene.add(object);
            obj = object;
        });

        controls.rotateSpeed = 0.40;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.update();

        var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
        scene.add(light);
        camera.position.set(40, 0, 40);
        function animate() {
            // controls.update();
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update();
        }

        // scene.rotation.setFromVector3(new THREE.Vector3(Math.PI / xValue, yValue, 10));
        // scene.lookAt(Math.PI / xValue, xValue, 20);

        var saveData = (controls) => {
            controls.saveState();
            const { target0, position0, zoom0 } = controls;
            const state = { target0, position0, zoom0 };
            document.cookie = "";
            document.cookie = `data = ${JSON.stringify(state)};max-age=2`;
            console.log(getCookie("data"));
        };

        document.querySelector("canvas").addEventListener("click", function(){
            saveData(controls);
            console.log("Rotation Save");
        });


        const loadControls = (controls) => {
            var stateJSON = getCookie("data");

            if (stateJSON) {
                const { target0, position0, zoom0 } = JSON.parse(stateJSON);
                controls.target0.copy(target0);
                controls.position0.copy(position0);
                controls.zoom0 = zoom0;
                controls.reset();
            }
        };

        loadControls(controls);
        controls.update();

        animate();
    }
    removeAllChildNodes(mod);
    run();

    if (data === "close") {

    }
}