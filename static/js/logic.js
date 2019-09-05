
var myMap = L.map("map", {
    center: [39.868938, -98.586317],
    zoom: 5
});

var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

var highContrast = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.high-contrast",
    accessToken: API_KEY
});

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url, function (response) {

    var circles5 = [];
    var circles4 = [];
    var circles3 = [];
    var circles2 = [];
    var circles1 = [];
    var circles0 = [];

    for (var i = 0; i < response.features.length; i++) {

        if (response.features[i].properties.mag > 5) {
            circles5.push(
                L.circleMarker([response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]], {
                    color: "#ff0000",
                    opacity: 1,
                    fillColor: "#ff0000",
                    fillOpacity: 0.75,
                    radius: 14
                }).bindPopup("<h3><strong>Magnitude: " + response.features[i].properties.mag + "</strong></h3> <hr> <h4>" + response.features[i].properties.place + "</h4>"))
        }

        else if (response.features[i].properties.mag > 4) {
            circles4.push(
                L.circleMarker([response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]], {
                    color: "#ff6600",
                    opacity: 1,
                    fillColor: "#ff0000",
                    fillOpacity: 0.75,
                    radius: 11
                }).bindPopup("<h3><strong>Magnitude: " + response.features[i].properties.mag + "</strong></h3> <hr> <h4>" + response.features[i].properties.place + "</h4>"))
        }

        else if (response.features[i].properties.mag > 3) {
            circles3.push(
                L.circleMarker([response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]], {
                    color: "#ff9900",
                    opacity: 1,
                    fillColor: "#ff9900",
                    fillOpacity: 0.75,
                    radius: 9
                }).bindPopup("<h3><strong>Magnitude: " + response.features[i].properties.mag + "</strong></h3> <hr> <h4>" + response.features[i].properties.place + "</h4>"))
        }

        else if (response.features[i].properties.mag > 2) {
            circles2.push(
                L.circleMarker([response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]], {
                    color: "#ffcc66",
                    opacity: 1,
                    fillColor: "#ffcc66",
                    fillOpacity: 0.75,
                    radius: 7
                }).bindPopup("<h3><strong>Magnitude: " + response.features[i].properties.mag + "</strong></h3> <hr> <h4>" + response.features[i].properties.place + "</h4>"))
        }

        else if (response.features[i].properties.mag > 1) {
            circles1.push(
                L.circleMarker([response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]], {
                    color: "#ffff66",
                    opacity: 1,
                    fillColor: "#ffff66",
                    fillOpacity: 0.75,
                    radius: 5
                }).bindPopup("<h3><strong>Magnitude: " + response.features[i].properties.mag + "</strong></h3> <hr> <h4>" + response.features[i].properties.place + "</h4>"))
        }

        else if (response.features[i].properties.mag > 0) {
            circles0.push(
                L.circleMarker([response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]], {
                    color: "#99ff66",
                    opacity: 1,
                    fillColor: "#99ff66",
                    fillOpacity: 0.75,
                    radius: 3
                }).bindPopup("<h3><strong>Magnitude: " + response.features[i].properties.mag + "</strong></h3> <hr> <h4>" + response.features[i].properties.place + "</h4>"))
        };
    };

    var quakes5 = L.layerGroup(circles5);
    var quakes4 = L.layerGroup(circles4);
    var quakes3 = L.layerGroup(circles3);
    var quakes2 = L.layerGroup(circles2);
    var quakes1 = L.layerGroup(circles1);
    var quakes0 = L.layerGroup(circles0);

    var overlayMaps = {
        "> 5 Mag": quakes5,
        "4-5 Mag": quakes4,
        "3-4 Mag": quakes3,
        "2-3 Mag": quakes2,
        "1-2 Mag": quakes1,
        "< 1 Mag": quakes0
    };

    var baseMaps = {
        "Standard": streets,
        "Contrast": highContrast
    };

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

});

