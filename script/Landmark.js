export function showData(item) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var fullData = this.response;
            var bookmarkTag = new DOMParser();
            var xmlDoc = bookmarkTag.parseFromString(fullData, "text/xml");
            var landmarkTag = xmlDoc.querySelectorAll("landmark");

            for(var i = 0; i < landmarkTag.length; i++) {
                if(landmarkTag[i].getAttribute("name") === item) {
                    var dataName = landmarkTag[i].querySelector("fullname").innerHTML;
                    var dataShortName = landmarkTag[i].querySelector("shortname").innerHTML;
                    var dataImage1 = landmarkTag[i].querySelector("img1").innerHTML;
                    var dataImage2 = landmarkTag[i].querySelector("img2").innerHTML;
                    var dataDetails = landmarkTag[i].querySelector("details").innerHTML;

                    var divData = document.getElementById("showLandmarkData");
                    divData.style.display = "block";

                    if(dataImage1 === "") {
                        document.getElementById("image1").style.display = "none";
                    } else {
                        document.getElementById("image1").style.display = "inline";
                        document.getElementById("image1").src = dataImage1;
                    }

                    if(dataImage2 === "") {
                        document.getElementById("image2").style.display = "none";
                    } else {
                        document.getElementById("image2").style.display = "inline";
                        document.getElementById("image2").src = dataImage2;
                    }

                    document.getElementById("image2").src = dataImage2;
                    document.getElementById("fullname").innerHTML = "Full Name: " + dataName;
                    document.getElementById("shortname").innerHTML = "Short Name: " + dataShortName;
                    document.getElementById("des").innerHTML = "Details: " + dataDetails;
                }
            }

            
        }
    };
    xmlHttp.open("GET", "../UploadData/Landmark/landmark.xml", true);
    xmlHttp.send();
}