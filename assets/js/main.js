// get siteboxes
const siteBoxesArray = Array.from(document.getElementsByClassName("side-box"));

// get map-entries
const mapEntryArray = Array.from(document.getElementsByClassName("map-entry"));

// return coordinates from atributes
const getCoordinates = el => {
  const coordinatesLon = Number(el.getAttribute("data-lon"));
  const coordinatesLat = Number(el.getAttribute("data-lat"));
  return [coordinatesLon, coordinatesLat];
};

// Create geoJason Format
const createGeoJason = (obj, index) => {
  const coordinates = getCoordinates(obj);
  const imageSRC = obj.querySelector(".icon img").src;
  const completedObject = {
    type: "Feature",
    index: index,
    properties: {
      icon: imageSRC
    },
    geometry: {
      type: "Point",
      coordinates: coordinates
    }
  };
  return completedObject;
};

const addMapListener = obj => {
  obj.element.addEventListener("click", () => {
    siteBoxesArray.forEach(siteBox => siteBox.classList.remove("open"));
    siteBoxesArray[obj.index].classList.add("open");
    mapFlyTo(obj.coordinates);
  });
};

mapboxgl.accessToken =
  "pk.eyJ1IjoibG9uZXJzY29tcGFueSIsImEiOiJjandqNTlsYXIwNjduNDRwNjhkemhhZXVtIn0.c2PlH4OqBZUOQgDM4hg7fw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/lonerscompany/cjwjajpvb1ly61cnqacst6b3k",
  center: [19.34928, 48.208772],
  zoom: 14
});

// create entry objects
const mapEntryObject = mapEntryArray.map((el, index) => {
  return {
    element: el,
    index: index,
    coordinates: getCoordinates(el)
  };
});
mapEntryObject.forEach(addMapListener);

var geojson = siteBoxesArray.map(createGeoJason);

// // create and add markers to map
geojson.forEach((marker, index) => {
  // create a DOM element for the marker
  var el = document.createElement("div");
  el.innerHTML = `<img src="${marker.properties.icon}"> `;
  el.className = "marker icon img-round";

  addMapListener({
    element: el,
    index: index,
    coordinates: marker.geometry.coordinates
  });

  // add marker to map
  new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
});

const mapFlyTo = coordinates => {
  console.log("now");
  map.flyTo({
    center: coordinates,
    zoom: 16.8,
    speed: 1.5
  });
};

// add event listers

// function for toggle button and another element
const toggleMenu = (thisEl, parrentEl) => {
  thisEl.addEventListener("click", e => {
    thisEl.classList.toggle("open");
    parrentEl.classList.toggle("open");
  });
};

// toggle menu
const menuBtn = document.querySelector(".nav-hamburger");
const siteHeader = document.querySelector("body");
//toggleMenu(menuBtn, siteHeader);

// toggle siteboxes
siteBoxesArray.forEach(obj => {
  const crossBtn = obj.querySelector(".icon-cross");
  if (crossBtn) {
    crossBtn.addEventListener("click", e => {
      siteBoxesArray.forEach(siteBox => siteBox.classList.remove("open"));
      siteBoxesArray[0].classList.add("open");
      // map.flyTo({
      //   center: [19.34928, 48.208772],
      //   zoom: 14,
      //   speed: 1.5
      // });
    });
  }
});
