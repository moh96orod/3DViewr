import { OBJLoader } from "../script/OBJLoader.js";
import { OrbitControls } from "../script/OrbitControls.js";

export function Move() {
    var mod = document.getElementById("modify");

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    removeAllChildNodes(mod);

    function run() {
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

        window.addEventListener('resize', function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix;
        });

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = false;
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.update();

        controls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: null,
            RIGHT: null
        }

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

        var saveData = (controls) => {
            controls.saveState();
            const { target0, position0, zoom0 } = controls;
            const state = { target0, position0, zoom0 };
            var clean = getCookie("data");
            var setting = "data=" + clean;
            document.cookie = setting + ";max-age=0";
            document.cookie = `data = ${JSON.stringify(state)}`;
            console.log("saved");
        };

        document.querySelector("canvas").addEventListener("click", function () {
            localStorage.removeItem("orbitControls");
            saveData(controls);
            controls.update();
        });

        var fileName = document.getElementById("filename").innerHTML;
        fileName = fileName.trim();
        var loader = new OBJLoader();
        loader.load(`../UploadData/Data/${fileName}`, (object) => {
            scene.add(object);
            obj = object;
        });


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

        // var x = localStorage.getItem("rotation_x");
        // var y = localStorage.getItem("rotation_y");
        // var z = localStorage.getItem("rotation_z");

        // if (x != null) {
        //     controls.object.position.x = x;
        //     controls.object.position.y = y;
        //     controls.object.position.z = z;


        // }

        var cameraData = camera.toJSON();

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

    run();
}