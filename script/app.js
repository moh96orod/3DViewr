import { zoom } from "./Zoom.js";
import { Rotation } from "./Rotation.js";
import { Move } from "./Move.js";
import { Selection } from "./Selection.js";

var zoomDiv = document.getElementById("zoom");
zoomDiv.addEventListener("click", function (event) {
    zoom(event);
    zoomDiv.style.backgroundColor = "#2a2b2e";
    // showMode.style.backgroundColor = "#3d3e42";
});

var div = document.getElementById("two-sec");
div.addEventListener("click", function () {
    zoomDiv.style.backgroundColor = "#3d3e42";
    // showMode.style.backgroundColor = "#2a2b2e";
});

var rotaion = document.getElementById("rotaion");
rotaion.addEventListener("click", function () {
    rotaion.style.backgroundColor = "#2a2b2e";
    Rotation("");
    // showMode.style.backgroundColor = "#3d3e42";
});

div.addEventListener("click", function () {
    rotaion.style.backgroundColor = "#3d3e42";
    // Rotation("close");
    // showMode.style.backgroundColor = "#2a2b2e";
    // document.getElementById("show-tools-item").style.display = "none";
});

var move = document.getElementById("move");
move.addEventListener("click", function () {
    move.style.backgroundColor = "#2a2b2e";
    // showMode.style.backgroundColor = "#3d3e42";
    Move();
});

div.addEventListener("click", function () {
    move.style.backgroundColor = "#3d3e42";
    // showMode.style.backgroundColor = "#2a2b2e";
});

var selection = document.getElementById("selection");
selection.addEventListener("click", function () {
    selection.style.backgroundColor = "#2a2b2e";
    // showMode.style.backgroundColor = "#3d3e42";

    Selection();
});

div.addEventListener("click", function () {
    selection.style.backgroundColor = "#3d3e42";
    // showMode.style.backgroundColor = "#2a2b2e";
});

var aiEngine = document.getElementById("aiEngine");
aiEngine.addEventListener("click", function(){
    var x = localStorage.getItem("x");
    var y = localStorage.getItem("y");
    var z = localStorage.getItem("z");

    document.body.style.backgroundColor = "gray";
    aiEngine.style.backgroundColor = "gray";

    var load = document.querySelector(".loading");
    load.style.display = "block";

    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            load.style.display = "none";
            alert("Request Sended...");
            document.body.style.backgroundColor = "#2a2b2e";
            aiEngine.style.backgroundColor = "#2a2b2e";
        }
    };
    request.open("GET", `../Server?x=${x}&y=${y}&z=${z}`, true);
    request.send();
});