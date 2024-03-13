/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

const map = L.map('map', {
  zoomControl: true,
  scrollWheelZoom: false,
  //   dragging: false,
  //   boxZoom: false,
}).setView([locations[0].coordinates[1], locations[0].coordinates[0]], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const bounds = L.latLngBounds(locations[0], locations[locations.length - 1]);
locations.forEach(loc => {
  const icon = L.divIcon({
    className: 'marker',
    iconSize: [28, 35],
    // html: "<div class='marker'></div>",
  });
  L.marker([loc.coordinates[1], loc.coordinates[0]], { icon: icon })
    .addTo(map)
    .bindPopup(
      `<p style="font-size:16px;">Day ${loc.day}: ${loc.description}</p>`,
    );
  bounds.extend([loc.coordinates[1], loc.coordinates[0]]);
});
map.fitBounds(bounds);
