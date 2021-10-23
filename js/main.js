//Функция, возвращающая случайное целое число из переданного диапазона включительно.
//Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveInteger (from, to) {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
getRandomPositiveInteger();
//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveFloat (from, to, digits = 1) {
  const lower = Math.min(Math.abs(from), Math.abs(to));
  const upper = Math.max(Math.abs(from), Math.abs(to));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}
getRandomPositiveFloat();
const getRandomArrayElement = (elements) => elements[_.random(0, elements.length - 1)];
const TITLES = [
  'Супер крутой заголовок',
  'Заголовок покруче',
  'Простецкий заголовок',
  'Над этим вообще не думали',
  'Кто-то что-то где-то сдаёт',
  'Фантазии нет, увы',
  'Но с этим, наверное, что-то можно сделать',
  'А ведь ещё описание придумывать..',
  'Будет интересно',
  'Наверное',
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
const SIMILAR_NUMBER_MIN = 1;
const SIMILAR_NUMBER_MAX = 10;

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKIN_OUTS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Что ж, пришло время описнания',
  'Как будет время и придумаю',
  'Исправлю это всё',
  'И заголовки, и описание',
  'А пока, что-то ничего не могу придумать',
  'А это только шестой пункт',
  'Ещё три',
  'Два',
  'Один',
  'Закончился..',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LOCATION = {
  lat: {
    min: MIN_LAT,
    max: MAX_LAT,
  },
  lng: {
    min: MIN_LNG,
    max: MAX_LNG,
  },
  round: DIGITS,
};
const createIdGeneratorFromRange = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error('Перебраны все числа из диапазона');
    };
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    };
    previousValues.push(currentValue);
    return currentValue;
  };
};
const getPhotoId = createIdGeneratorFromRange(SIMILAR_NUMBER_MIN, SIMILAR_NUMBER_MAX);
const createAvatarId = () => {
  const avatarId = getPhotoId();
  return String(avatarId).padStart(2, '0');
};
const createArrayOfRandomLengths = (array) => {
  const randomLength = getRandomPositiveInteger(1, array.length);
  return _.shuffle(array).slice(0, randomLength);
};
const createAuthor = () => ({
  avtar: `img/avatars/user${createAvatarId()}.png`,
});
const createLocation = () => ({
  lat: getRandomPositiveFloat(LOCATION.lat.min, LOCATION.lat.max, LOCATION.round),
  lng: getRandomPositiveFloat(LOCATION.lng.min, LOCATION.lng.max, LOCATION.round),
});
const createOffer = (location) => ({
  title: getRandomArrayElement(TITLES),
  address: `${location.lat}, ${location.lng}`,
  price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomPositiveInteger(MIN_ROOMS, MAX_ROOMS),
  guests: getRandomPositiveInteger(MIN_GUESTS, MAX_GUESTS),
  checkin: getRandomArrayElement(CHECKIN_OUTS),
  checkout: getRandomArrayElement(CHECKIN_OUTS),
  features: createArrayOfRandomLengths(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: createArrayOfRandomLengths(PHOTOS),
});
const createAnnouncement = () => {
  const location = createLocation();
  const author = createAuthor();
  const offer = createOffer(location);
  return {
    author: author,
    offer: offer,
    location: location,
  };
};
const descriptonSimilarAd = Array.from({length: NUMBERS_OF_OFFERS}, createAnnouncement);
descriptonSimilarAd;
