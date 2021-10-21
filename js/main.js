//Функция, возвращающая случайное целое число из переданного диапазона включительно.
//Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

const getRandomArrayElement = (elements) => {
  return elements[_.random(0, elements.length - 1)];
};

const TITLE = [
  'Супер крутой заголовок',
  'Заголовок покруче',
  'Простецкий заголовок',
  'Над этим вообще не думали',
  'Кто-то что-то где-то сдаёт',
  'Фантазии нет, увы',
  'Но с этим, наверное, что-то можно сделать',
  'А ведь ещё описание придумывать..',
  'Будет интересно',
  'Наверное'
];

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const DIGITS = 5;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const MIN_ROOMS = 0;
const MAX_ROOMS = 100;
const MIN_GUESTS = 1;
const MAX_GUESTS = 100;
const NUMBERS_OF_OFFERS = 10;

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN_OUT = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parcking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTION = [
  'Что ж, пришло время описнания',
  'Как будет время и придумаю',
  'Исправлю это всё',
  'И заголовки, и описание',
  'А пока, что-то ничего не могу придумать',
  'А это только шестой пункт',
  'Ещё три',
  'Два',
  'Один',
  'Закончился..'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const LOCATION = {
  lat: {
    min: MIN_LAT,
    max: MAX_LAT
  },
  lng: {
    min: MIN_LNG,
    max: MAX_LNG
  },
  round: DIGITS
};

const NUMBERS_OF_USERS = 10;
const USER_NUMBER = [];
for (let i = 1; i <= NUMBERS_OF_USERS; i++) {
  if (i < 10) {
    i = `0${i}`;
  };
  USER_NUMBER.push(i);
};

const createAuthor = () => {
  const NUMBER = USER_NUMBER.shift();
  return {
    avatar: `img/avatars/user${NUMBER}.png`
  };
};

const createArrayOfRandomLengths = (array) => {
  const randomLength = getRandomPositiveInteger(1, array.length);
  return _.shuffle(array).slice(0, randomLength);
};

const createLocation = () => ({
  lat: getRandomPositiveFloat(LOCATION.lat.min, LOCATION.lat.max, LOCATION.round),
  lng: getRandomPositiveFloat(LOCATION.lng.min, LOCATION.lng.max, LOCATION.round)
});

const createOffer = (location) => ({
  title: getRandomArrayElement(TITLE),
  address: `${location.lat}, ${location.lng}`,
  price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
  type: getRandomArrayElement(TYPE),
  rooms: getRandomPositiveInteger(MIN_ROOMS, MAX_ROOMS),
  guests: getRandomPositiveInteger(MIN_GUESTS, MAX_GUESTS),
  checkin: getRandomArrayElement(CHECKIN_OUT),
  checkout: getRandomArrayElement(CHECKIN_OUT),
  features: createArrayOfRandomLengths(FEATURES),
  description: getRandomArrayElement(DESCRIPTION),
  photos: createArrayOfRandomLengths(PHOTOS)
});

const createAnnouncement = () => {
  const newLocation = createLocation();
  const newAuthor = createAuthor();
  const newOffer = createOffer(newLocation);
  return {
    author: newAuthor,
    offer: newOffer,
    location: newLocation
  };
};

const descriprionSimilarAd = Array.from({length: NUMBERS_OF_OFFERS}, createAnnouncement);
