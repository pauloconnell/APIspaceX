document.addEventListener("DOMContentLoaded", function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      document.getElementById("geoLocation").innerHTML =
        "latitude: " +
        position.coords.latitude +
        "<br>longitude: " +
        position.coords.longitude;
    });
  }
  document.getElementById("sendMessage").onclick = function() {
    const userName = document.getElementById("name").value;
    const url = "https://jsonplaceholder.typicode.com/posts";
    // pre set up url which accepst posts and sends back response object 'xhr.response'
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 201) {
        // 4=completed, 201=success
        const serverResponse = JSON.parse(xhr.response);
        document.getElementsByClassName("message")[0].textContent =
          serverResponse.userName + serverResponse.suffix;
      }
    };
    const body = JSON.stringify({
      userName: userName,
      suffix: " loves Rockets!"
    });
    xhr.send(body);
  };

  //fetch called on page load hit api too many times-try later
  // fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=DEMO_KEY')
  //     .then(response => response.json())
  //     .then(data => {
  //         //data = JSON.parse(data);
  //         let html="";
  //         //data.photos[0].rover.forEach(function(val){ For each ARRAY ONLY
  //         //json=json.filter(function(val){           if it was array, can use filter-NOT IN THIS CASE
  //         //return (val.id!==1);                      // remove item id=1
  //         //});
  //         for(dataItems in data.photos[0].rover){
  //          // keys=Object.keys(dataItems);
  //           html+="<li>";
  //          // keys.forEach(function(key){
  //             html+="<strong>"+dataItems+"</strong> "+data.photos[0].rover[dataItems]+" <br>";
  //          // });
  //           html+="</li>";
  //         };
  //         document.getElementById('message').innerHTML ="<H1>Rover on Mars</H1>"+html+"<IMG src="+JSON.stringify(data.photos[0].img_src)+"alt='photo of rover on mars'>";
  //     })

  document.getElementsByClassName("photo")[0].textContent =
    "The button will create an XMLHttpRequestuest to the SpaceX API to get details about the most recent launch, and an AstroPhotograph of the spaceship-enjoy!";

  document.getElementById("getPhoto").onclick = function() {
    const req = new XMLHttpRequest();
    req.open("GET", " https://api.spacexdata.com/v4/launches/latest", true);
    req.send();
    req.onload = function() {
      const json = JSON.parse(req.responseText);
      document.getElementsByClassName("photo")[0].innerHTML =
        "<IMG class='image' src=" +
        JSON.stringify(json.links.flickr.original[0]) +
        ">";
    };

    //document.getElementsByClassName('message')[0].textContent="Here is the message";
  };

  document.getElementsByClassName("title")[0].textContent =
    "Please click on either button above:";
  document.getElementById("getTitle").onclick = function() {
    const req = new XMLHttpRequest();
    req.open("GET", "https://api.spacexdata.com/v4/launches/latest", true);
    req.send();
    req.onload = function() {
      const json2 = JSON.parse(req.responseText);
      document.getElementsByClassName("title")[0].innerHTML =
        "<h3>" + JSON.stringify(json2.details) + "</h3>";
    };

    //document.getElementsByClassName('message')[0].textContent="Here is the message";
  };
});
