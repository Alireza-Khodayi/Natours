/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

var greenIcon = L.icon({
  iconUrl: '/img/pin.png',
  iconSize: [30, 30], // size of the icon
});

var map = L.map('map', {
  //   zoomControl: false,
  //   scrollWheelZoom: false,
  //   dragging: false,
  //   boxZoom: false,
}).setView([locations[0].coordinates[1], locations[0].coordinates[0]], 8);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const markers = locations.forEach(loc => {
  const el = document.createElement('div');
  el.className = 'marker';
  console.log(loc.coordinates);
  L.marker([loc.coordinates[1], loc.coordinates[0]], {
    icon: greenIcon,
    element: el,
  }).addTo(map);
});
