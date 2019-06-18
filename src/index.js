// CREATE MAP

const mapEl = document.querySelector("#map");

mapboxgl.accessToken =
  "pk.eyJ1IjoibG9uZXJzY29tcGFueSIsImEiOiJjandqNTlsYXIwNjduNDRwNjhkemhhZXVtIn0.c2PlH4OqBZUOQgDM4hg7fw";

if (mapEl) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/lonerscompany/cjwjajpvb1ly61cnqacst6b3k",
    center: [19.34928, 48.208772],
    zoom: 14,
    minZoom: 13,
    maxZoom: 18
  });

  // get siteboxes
  const siteBoxesArray = Array.from(
    document.getElementsByClassName("side-box")
  );
  const siteBoxesLocationsArray = siteBoxesArray.filter(el =>
    el.classList.contains("map-location")
  );

  console.log(siteBoxesLocationsArray);

  // get map-entries
  const mapEntryArray = Array.from(
    document.getElementsByClassName("map-entry")
  );

  // UTIL FUNCTION
  // Get Coordinates in array format
  const getCoordinates = el => {
    const coordinatesLon = Number(el.getAttribute("data-lon"));
    const coordinatesLat = Number(el.getAttribute("data-lat"));
    return [coordinatesLon, coordinatesLat];
  };

  // MIAN MAP UI EVENT
  // function for synchronize sidebox with map fly to
  // 1. Remoce all classes
  // 2. Add open classe
  // 3. modify map with map function
  // ---------------------------------
  const addMapEvent = obj => {
    obj.element.addEventListener("click", () => {
      siteBoxesArray.forEach(siteBox => siteBox.classList.remove("open"));
      siteBoxesArray[obj.index].classList.add("open");

      map.flyTo({
        center: obj.flyTo.coordinates,
        zoom: obj.flyTo.zoom,
        speed: obj.flyTo.speed
      });
    });
  };

  // create markes
  //------------------

  // Create geoJason Format
  const createGeoJason = (el, index) => {
    // get mark image src
    const imageSRC = el.querySelector(".icon img").src;

    // get mark coordinates
    const coordinates = getCoordinates(el);

    const completedObject = {
      index: index,
      properties: {
        icon: imageSRC
      },
      geometry: {
        coordinates: coordinates
      }
    };
    return completedObject;
  };

  const geojson = siteBoxesLocationsArray.map(createGeoJason);

  // // create and add markers to map
  geojson.forEach(marker => {
    // create a DOM element for the marker
    var el = document.createElement("div");
    el.innerHTML = `<img src="${marker.properties.icon}"> `;
    el.className = "marker icon img-round";

    var mapEntryObj = {
      element: el,
      index: marker.index + 1,

      flyTo: {
        coordinates: marker.geometry.coordinates,
        zoom: 16.6,
        speed: 1.5
      }
    };

    addMapEvent(mapEntryObj);

    // add marker to map
    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
  });

  // Create function object NOW FOR MAP ENTRY
  // 1. el
  // 2. index
  // 3. Coordinates
  // 4. Zoom
  //yarn audible-converter "./21Lessonsforthe21stCentury_ep6.aax" -o "neco" -p "./" -l
  const mapEntryObjArray = mapEntryArray.forEach((el, index) => {
    const mapEntryObj = {
      element: el,
      index: index + 1,

      flyTo: {
        coordinates: getCoordinates(el),
        zoom: 16.6,
        speed: 1.5
      }
    };

    addMapEvent(mapEntryObj);
  });

  // Add map event to all icon-cross
  // -------------------------------
  siteBoxesLocationsArray.forEach(el => {
    const crossBtn = el.querySelector(".icon-close");
    const sideBoxCross = {
      element: crossBtn,
      index: 0,
      flyTo: {
        center: [19.34928, 48.208772],
        zoom: 14,
        speed: 1.5
      }
    };

    console.log(crossBtn);
    addMapEvent(sideBoxCross);
  });
}

// TOGGLE FULL SCREEN MENU EVENTS
// --------------------------------

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
toggleMenu(menuBtn, siteHeader);
