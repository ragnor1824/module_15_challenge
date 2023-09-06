// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
let myMap = L.map("map", {
    center: [40.25, -112.40],
    zoom: 5
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

// Store our API endpoint as url.
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Fetching data from the API using D3 and processing it once received
d3.json(geoData).then(function(data) {
  //point to layer for coordinates
  L.geoJSON(data, {
    pointToLayer: function (feature, latlgn) {
      let mag = feature.properties.mag;
      let geojsonMarkerOptions = {
        radius: mag * 5,
        fillColor: colors(feature.geometry.coordinates[2]),
        fillOpacity: 0.7,
        weight: 0.5
      }
      return L.circleMarker(latlgn, geojsonMarkerOptions);
    },
    //function to display mag and depth of earthquake
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "Mag: " + feature.properties.mag + "<br />" +
        "Depth: " + feature.geometry.coordinates[2]
      )
    }
  }).addTo(myMap)


// color scale
function colors(depth) {

  // variable to hold the color
  let color = "";

  if (depth <= 1) {
      return color = "#84fd6c";
  }
  else if (depth <= 2) {
      return color = "#bfd16e";
  }
  else if (depth <= 3) {
      return color = "#ddbf5c";
  }
  else if (depth <= 4) {
      return color = "#e79b37";
  }
  else if (depth <= 5) {
      return color = "#ec7141";
  }
  else {
      return color = "#f82720";
  }

}

});