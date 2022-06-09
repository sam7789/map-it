var map;
var markers = [];
var polygon = null;

function initMap() {
  var styles = [
    {
      stylers: [
        {
          hue: "#2c3e50",
        },
        {
          saturation: 250,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          lightness: 50,
        },
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 43.803646,
      lng: -79.418942,
    },
    zoom: 13,
    styles: styles,
    mapTypeControl: false,
  });

  let locations = [
    {
      title: "KavkazRestaurant",
      location: {
        lat: 43.75,
        lng: -79.46723,
      },
    },
    {
      title: "YiddisheMame Restaurant",
      location: {
        lat: 43.80899,
        lng: -79.470651,
      },
    },
    {
      title: "BurgerKing",
      location: {
        lat: 43.836555,
        lng: -79.50531,
      },
    },
    {
      title: "StarBucks",
      location: {
        lat: 43.79635,
        lng: -79.417479,
      },
    },
    {
      title: "WallMart",
      location: {
        lat: 43.81191,
        lng: -79.452101,
      },
    },
    {
      title: "Jublee Restro",
      location: {
        lat: 43.81,
        lng: -79.452992,
      },
    },
  ];
  let largeInfowindow = new google.maps.InfoWindow();

  let defaultIcon = makeMarkerIcon("FF0000");

  let highlightedIcon = makeMarkerIcon("FFFF24");

  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;

    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i,
    });

    markers.push(marker);

    marker.addListener("click", function () {
      populateInfoWindow(this, largeInfowindow);
    });

    marker.addListener("mouseover", function () {
      this.setIcon(highlightedIcon);
    });
    marker.addListener("mouseout", function () {
      this.setIcon(defaultIcon);
    });
  }
  document.getElementById("show-list").addEventListener("click", showListings);
  document.getElementById("hide-list").addEventListener("click", hideListings);
}

function showListings() {
  document.getElementById("show-list").setAttribute("class", "red");
  document.getElementById("hide-list").setAttribute("class", null);
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

function hideListings() {
  document.getElementById("show-list").setAttribute("class", null);
  document.getElementById("hide-list").setAttribute("class", "red");
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|" +
      markerColor +
      "|40|_|%E2%80%A2",
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21, 34)
  );
  return markerImage;
}
