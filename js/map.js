import {similarAdsData} from './data.js';
import {createCard} from './card.js';
import {makeInactive, makeActive} from './form.js';
makeInactive();

const MAP_CENTER = {
  lat: 35.67417,
  lng: 139.75712,
};

const addressAd = document.querySelector('#address');
const map = L.map('map-canvas')
  .on('load', () => {
    makeActive();
  })
  .setView(MAP_CENTER, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  MAP_CENTER, {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

addressAd.value = `${MAP_CENTER.lat}, ${MAP_CENTER.lng}`;

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  const coordinateLat = coordinates.lat.toFixed(5);
  const coordinateLng = coordinates.lng.toFixed(5);
  addressAd.value = `${coordinateLat}, ${coordinateLng}`;
});

similarAdsData.forEach((ad) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const {location: {lat, lng}} = ad;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon,
  });
  marker.addTo(map).bindPopup(createCard(ad));
});
