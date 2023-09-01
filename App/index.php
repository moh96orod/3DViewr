<?php $fileName = $_GET["project"]; ?>
<?php if ($_GET["lang"] === "FA") {
  $lang = "EN";
} else {
  $lang = "FA";
} ?>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tooth |
    <?php print $_GET["project"]; ?>
  </title>
  <link rel="shortcut icon" href="../image/movement.png" type="image/x-icon">
  <link rel="stylesheet" href="../style/bootstrap.min.css">
  <link rel="stylesheet" href="../style/style.css">
  <style>
    html,
    body {
      margin: 0;
    }
  </style>
</head>

<body>
  <div class="fluid-container">
    <div class="dark-menu">
      <b>Tooth 3d App</b>
      <span class="project-data"> |
        <b id="filename">
          <?php print $_GET["project"]; ?>
        </b>
      </span>
      <br />
      <div class="row menus" id="div">
        <div class="col-md-1">
          <img src="../image/arabic.png" title="Language" class="litle-icon">
          <br>
          <span class="description">
            <a href="./FAApp?project=<?php print $fileName; ?>&lang=<?php print $lang; ?>"><?php print $lang; ?>
              Lang</a>
          </span>
        </div>
        <div id="zoom" class="col-md-1">
          <img src="../image/zoom-in.png" title="Zoom" class="litle-icon">
          <p class="description">Zoom</p>
          <!-- <span class="description" style="display: none;" id="show-tools-item">
            <b>+</b>
            <b style="padding-left: 59px">-</b>
            <input type="range" min="1" max="1000" value="500" id="zooming">
          </span> -->
        </div>
        <div class="col-md-1" id="rotaion">
          <img src="../image/rotation.png" title="Rotation" class="litle-icon">
          <span class="description">
            <p>Rotation</p>
          </span>
        </div>
        <div class="col-md-1" id="selection">
          <img src="../image/touchscreen.png" title="Selection" class="litle-icon">
          <span class="description">
            <p>Selection</p>
          </span>
        </div>
        <div class="col-md-1" id="move">
          <img src="../image/movement.png" title="Movement" class="litle-icon">
          <span class="description">
            <p>Movement</p>
          </span>
        </div>
        <div class="col-md-1" onclick="exit()">
          <img src="../image/close.png" title="Exit" class="litle-icon">
          <span class="description">
            <p>Exit</p>
          </span>
        </div>
        <div class="col-md-2" id="aiEngine">
          <p class="ai-engine" style="color: red">AI Engine</p>
        </div>
      </div>
    </div>
  </div>
  <div class="row section" id="two-sec">
    <div class="col-md-8">
      <div class="first-section">
        <div class="loading">
          <img src="../image/loading.gif" alt="Loading" />
          <p>Saving...</p>
        </div>
        <div id="bin" class="bin"></div>
        <div id="modify"></div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="second-section">
        <p>Choose LandMark:</p>
        <br />
        <div id="landmarkdiv" class="bookmark">

        </div>
      </div>
      <div class="third-section" id="data_landmark">
        <p>LandMark Details:</p>
        <span id="showLandmarkData" style="display: none">
          <img style="width: 100px; height: 50px;" id="image1" />
          <img style="width: 100px; height: 50px;" id="image2" />
          <p id="fullname"></p>
          <p id="shortname"></p>
          <p id="des"></p>
          <p id="lang"></p>
        </span>
      </div>
    </div>
  </div>
</body>
<script src="../script/query.min.js"></script>
<script src="../script/bootstrap.min.js"></script>
<script src="../script/three.js"></script>
<script src="../script/gsap.min.js"></script>
<script type="module" src="../script/OBJLoader.js"></script>
<script type="module" src="../script/app.js"></script>
<script type="module">
  import { OBJLoader } from "../script/OBJLoader.js";

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


  run();

  document.cookie = "";
</script>
<script>
  function exit() {
    localStorage.clear();
    var win = window.open("", "_self");
    win.close();
  }
</script>
<script type="module">
  import { showData } from "../script/Landmark.js";

  var landmarkDiv = document.getElementById("landmarkdiv");
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var data = this.responseXML;
      var landmarkModule = data.getElementsByTagName("name");
      var nameArray = new Array();

      for (var i = 0; i < landmarkModule.length; i++) {
        nameArray.push(landmarkModule[i].childNodes[0].nodeValue);
      }


      for (var i = 0; i < nameArray.length; i++) {
        var pTag = document.createElement("p");
        pTag.innerHTML = nameArray[i];
        pTag.style.cursor = "pointer";
        pTag.className = nameArray[i];
        landmarkDiv.appendChild(pTag);
        var hr = document.createElement("hr");
        landmarkDiv.appendChild(hr);
      }

      let btns = document.querySelectorAll('.bookmark > p');

      var selectLandmark = "";

      for (i of btns) {
        (function (i) {
          i.addEventListener('click', function () {
            selectLandmark = i.innerHTML;
            showData(selectLandmark);
          });
        })(i);
      }

    }
  };
  xmlHttpRequest.open("GET", "../UploadData/Landmark/landmark.xml", true);
  xmlHttpRequest.send();
</script>

</html>