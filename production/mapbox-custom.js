const mapboxCustom = () => {
  const siteBoxesArray = Array.from(
    document.getElementsByClassName("map-location")
  );

  const mapEntryArray = Array.from(
    document.getElementsByClassName("map-entry")
  );

  const getCoordinates = el => {
    const coordinatesLon = Number(el.getAttribute("data-lon"));
    const coordinatesLat = Number(el.getAttribute("data-lat"));
    return [coordinatesLon, coordinatesLat];
  };

  // create pins
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

  var geojson = siteBoxesArray.map(createGeoJason);

  var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
  // var $ = require("jquery");

  mapboxgl.accessToken =
    "pk.eyJ1IjoibG9uZXJzY29tcGFueSIsImEiOiJjandqNTlsYXIwNjduNDRwNjhkemhhZXVtIn0.c2PlH4OqBZUOQgDM4hg7fw";

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/lonerscompany/cjwjajpvb1ly61cnqacst6b3k",
    center: [19.34928, 48.208772],
    zoom: 14
  });

  const mapFlyTo = coordinates => {
    map.flyTo({
      center: coordinates,
      //offset: [($(window).width() - 32) / 8, -25],
      zoom: 16.8,
      speed: 1.5
    });
  };

  const addMapListener = obj => {
    obj.element.addEventListener("click", () => {
      siteBoxesArray.forEach(siteBox => siteBox.classList.remove("open"));
      siteBoxesArray[obj.index].classList.add("open");
      mapFlyTo(obj.coordinates);
    });
  };

  // add markers to map
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

  const foo = mapEntryArray.map((el, index) => {
    return {
      element: el,
      index: index,
      coordinates: getCoordinates(el)
    };
  });

  foo.forEach(addMapListener);
  console.log("hellou");
};

module.exports = mapboxCustom;
