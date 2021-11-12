import {similarAdsData} from './data.js';
import {createCard} from './card.js';
import {makeInactive, makeActive} from './form.js';
makeInactive();

const MAP_CENTER_LAT = 35.67417;
const MAP_CENTER_LNG = 139.75712;
const MAP_ZOOM = 14;

const  MainPin = {
  WIDTH: 52,
  HEIGHT: 52,
};
const Pin = {
  WIDTH: 40,
  HEIGHT: 40,

};

const addressAd = document.querySelector('#address');
const map = L.map('map-canvas')
  .on('load', () => {
    makeActive();
  })
  .setView({
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LNG,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MainPin.WIDTH, MainPin.HEIGHT],
  iconAnchor: [MainPin.WIDTH / 2, MainPin.HEIGHT],
});

const mainPinMarker = L.marker({
  lat: MAP_CENTER_LAT,
  lng: MAP_CENTER_LNG,
},
{
  draggable: true,
  icon: mainPinIcon,
},
);
mainPinMarker.addTo(map);

addressAd.value = `${MAP_CENTER_LAT}, ${MAP_CENTER_LNG}`;

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  const coordinateLat = coordinates.lat.toFixed(5);
  const coordinateLng = coordinates.lng.toFixed(5);
  addressAd.value = `${coordinateLat}, ${coordinateLng}`;
});

similarAdsData.forEach((ad) => {
  const lat = ad.location.lat;
  const lng = ad.location.lng;
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [Pin.WIDTH, Pin.HEIGHT],
    iconAnchor: [Pin.WIDTH / 2, Pin.HEIGHT],
  });
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon,
  });
  marker.addTo(map).bindPopup(createCard(ad));
});
