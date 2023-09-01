import { OBJLoader } from "../script/OBJLoader.js";
import { OrbitControls } from "../script/OrbitControls.js";
import { MOUSE } from "./three.module.js";

export function Selection() {
    var mod = document.getElementById("modify");
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

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
        controls.enabled = true;
        controls.update();


        var fileName = document.getElementById("filename").innerHTML;
        fileName = fileName.trim();
        var loader = new OBJLoader();
        loader.load(`../UploadData/Data/${fileName}`, (object) => {
            scene.add(object);
            obj = object;
        });

        document.querySelector("canvas").className = "selectionPointer";
        document.querySelector("canvas").addEventListener("mousemove", function () {
            var bin = document.getElementById("bin");
            bin.style.display = "block";
        });

        document.querySelector("canvas").addEventListener("click", function (event) {
            var x = event.clientX;
            var y = event.clientY;
            var z = controls.object.position.z;

            const shape = new THREE.Shape();
            shape.moveTo(120, 120);
            scene.add(shape);

            localStorage.setItem("x", x);
            localStorage.setItem("y", y);
            localStorage.setItem("z", z);
        });

        document.addEventListener("keydown", function (e) {
            if (e.ctrlKey) {
                controls.mouseButtons = {
                    LEFT: THREE.MOUSE.PAN,
                    MIDDLE: null,
                    RIGHT: null
                }
                controls.update();
                console.log("CTRL pressed!.");
            }
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

        controls.enableRotate = true;

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
        animate();
    }
    removeAllChildNodes(mod);
    run();
}