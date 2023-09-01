import { OBJLoader } from "../script/OBJLoader.js";
import { OrbitControls } from "../script/OrbitControls.js";

export function zoom(event) {
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

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;
        controls.enablePan = false;
        controls.enableRotate = false;
        controls.update();

        var fileName = document.getElementById("filename").innerHTML;
        fileName = fileName.trim();
        var loader = new OBJLoader();
        loader.load(`../UploadData/Data/${fileName}`, (object) => {
            scene.add(object);
            obj = object;
        });

        // alert(event.clientX);

        // var zoomTools = document.getElementById("zooming");
        // var zoomValue = parseInt(zoomTools.value);
        // var zoomDataValue = parseInt(localStorage.getItem("zoom_value"));

        // if (zoomValue === zoomDataValue) {
        //     zoomValue = zoomDataValue;
        // } else {
        //     zoomValue = parseInt(zoomTools.value);
        // }

        // var zoomingIn = true;

        // function render() {
        //     if (zoomingIn && camera.position.z > 10) {
        //         camera.position.z = zoomValue / 8;
        //     } else if (!zoomingIn && camera.position.z < 100) {
        //         camera.position.z = zoomValue / 2;
        //     }
        //     requestAnimationFrame(render);
        //     renderer.render(scene, camera);

        //     localStorage.setItem("zoom_value", zoomValue);
        // }

        // render();

        var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
        scene.add(light);
        camera.position.set(40, 0, 40);
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
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

        var saveData = (controls) => {
            controls.saveState();
            const { target0, position0, zoom0 } = controls;
            const state = { target0, position0, zoom0 };
            document.cookie = `data = ${JSON.stringify(state)};`;
        };

        document.querySelector("canvas").addEventListener("wheel", function () {
                saveData(controls);
                controls.update();
        });

        animate();
    }
    run();
}
