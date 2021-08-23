document.addEventListener("DOMContentLoaded", function() {
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     document.getElementById("geoLocation").innerHTML =
  //       "latitude: " +
  //       position.coords.latitude +
  //       "<br>longitude: " +
  //       position.coords.longitude;
  //   });
  // }

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

  var memory = false;
  var json = {};

  document.getElementById("getPhoto").addEventListener("click", function() {
    if (!memory) {
      const req = new XMLHttpRequest();
      console.log("about to get data from api");
      req.open("GET", " https://api.spacexdata.com/v4/launches/latest", true);
      req.send();
      req.onload = function() {
        json = JSON.parse(req.responseText);
        console.log("got data from api ");
        memory = true;
        const image = document.createElement("img");
        image.src = json.links.flickr.original[0];
        image.style.width = "80%";

        document.querySelector(".photo").appendChild(image);
        //        document.getElementsByClassName("photo")[0].innerHTML = (
        //          <IMG
        //            class="image"
        //            src={JSON.stringify(json.links.flickr.original[0])}
        //          ></IMG>
        //       );
        //<iframe width='99%' src='https://www.youtube.com/embed/"+JSON.stringify(json.links.youtube_id)+"' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>
      };
    } else {
      const image = document.createElement("img");
      image.src = json.links.flickr.original[0];
      image.style.width = "80%";

      document.querySelector(".photo").appendChild(image);
    }

    //document.getElementsByClassName('message')[0].textContent="Here is the message";
  });
  document.getElementById("getTitle").addEventListener("click", function() {
    if (!memory) {
      const req = new XMLHttpRequest();
      req.open("GET", "https://api.spacexdata.com/v4/launches/latest", true);
      req.send();
      req.onload = function() {
        json = JSON.parse(req.responseText);
        memory = true;
        //        console.log("response recieved ", json.name);
        const titleDiv = document.createElement("div");
        titleDiv.innerHTML = json.name + "<br/>" + json.details;
        titleDiv.style.margin = "auto";
        titleDiv.style.lineHeight = "2.5";
        document.querySelector(".title").appendChild(titleDiv);
      };
    } else {
      const titleDiv = document.createElement("div");
      titleDiv.innerHTML = json.details;
      document.querySelector(".title").appendChild(titleDiv);
    }
  });
});
