!function(e){var o={};function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)t.d(n,r,function(o){return e[o]}.bind(null,r));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=0)}([function(e,o){var t=document.querySelector("#map");if(mapboxgl.accessToken="pk.eyJ1IjoibG9uZXJzY29tcGFueSIsImEiOiJjandqNTlsYXIwNjduNDRwNjhkemhhZXVtIn0.c2PlH4OqBZUOQgDM4hg7fw",t){var n=new mapboxgl.Map({container:"map",style:"mapbox://styles/lonerscompany/cjwjajpvb1ly61cnqacst6b3k",center:[19.34928,48.208772],zoom:13,minZoom:7,maxZoom:18}),r=Array.from(document.getElementsByClassName("side-box")),c=r.filter((function(e){return e.classList.contains("map-location")})),a=Array.from(document.getElementsByClassName("map-entry")),i=function(e){return[Number(e.getAttribute("data-lon")),Number(e.getAttribute("data-lat"))]},l=function(e){e.element.addEventListener("click",(function(){r.forEach((function(e){return e.classList.remove("open")})),r[e.index].classList.add("open"),n.flyTo({center:e.flyTo.coordinates,zoom:e.flyTo.zoom,speed:e.flyTo.speed})}))};c.map((function(e,o){return{index:o,properties:{icon:e.querySelector(".icon img").src},geometry:{coordinates:i(e)}}})).forEach((function(e){var o=document.createElement("div");o.innerHTML='<img src="'.concat(e.properties.icon,'"> '),o.className="marker icon img-round";var t={element:o,index:e.index+1,flyTo:{coordinates:e.geometry.coordinates,zoom:16.6,speed:1.5}};l(t),new mapboxgl.Marker(o).setLngLat(e.geometry.coordinates).addTo(n)}));a.forEach((function(e,o){var t={element:e,index:o+1,flyTo:{coordinates:i(e),zoom:16.6,speed:1.5}};l(t)}));c.forEach((function(e){var o=e.querySelector(".icon-close");l({element:o,index:0,flyTo:{center:[19.34928,48.208772],zoom:14,speed:1.5}})}))}var u,s,m=document.querySelector(".nav-hamburger"),d=document.querySelector("body");s=d,(u=m).addEventListener("click",(function(e){u.classList.toggle("open"),s.classList.toggle("open")}))}]);