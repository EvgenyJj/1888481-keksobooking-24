const cardPopup = document.querySelector('#card').content.querySelector('.popup');

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderFeatures = (features, cardFeatures) => {
  features.forEach((element) => {
    const feature = document.createElement('li');

    feature.classList.add('popup__feature', `popup__feature--${element}`);
    cardFeatures.append(feature);
  });
};

const renderPhotos = (photos, cardPhotos, cardPhoto) => {
  photos.forEach((element) => {
    const photo = cardPhoto.cloneNode(true);
    if (element) {
      photo.src = element;
      cardPhotos.append(photo);
    } else {
      photo.alt = '';
      cardPhotos.classList.add('visually-hidden');
    }
  });
};

export const createCard = ({author, offer}) => {
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    description,
    features,
    photos,
  } = offer;
  const {avatar} = author;
  const userCard = cardPopup.cloneNode(true);

  const titleElement = userCard.querySelector('.popup__title');
  if  (!offer.title) {
    titleElement.remove();
  } else {
    titleElement.textContent = title;
  }

  const addressElement = userCard.querySelector('.popup__text--address');
  if (!offer.address) {
    addressElement.remove();
  } else {
    addressElement.textContent = address;
  }

  const priceElement = userCard.querySelector('.popup__text--price');
  if (!offer.address) {
    addressElement.remove();
  } else {
    addressElement.textContent = offer.address;

    priceElement.textContent = `${price} ₽/ночь`;
  }

  const typeElement = userCard.querySelector('.popup__type');
  if (!offer.type) {
    typeElement.remove();
  } else {
    typeElement.textContent = offerTypes[type];
  }

  const capacityElement = userCard.querySelector('.popup__text--capacity');
  if (!offer.rooms || !offer.guests) {
    capacityElement.remove();
  } else {
    capacityElement.textContent = `${rooms } комнаты для ${ guests } гостей`;
  }

  const timeElement = userCard.querySelector('.popup__text--time');
  if (!offer.checkin || !offer.checkout) {
    timeElement.remove();
  } else {
    timeElement.textContent = `Заезд после ${checkin}, выезд до ${ checkout}`;
  }

  const featuresElement = userCard.querySelector('.popup__features');
  if (!features) {
    featuresElement.remove();
  } else {
    featuresElement.innerHTML = '';
    renderFeatures(features, featuresElement);
  }

  const descriptionElement = userCard.querySelector('.popup__description');
  if (!offer.description) {
    descriptionElement.remove();
  } else {
    descriptionElement.textContent = description;
  }

  const photosElement = userCard.querySelector('.popup__photos');
  const photoElement = userCard.querySelector('.popup__photo');
  if (!photos) {
    photosElement.remove();
  } else {
    photosElement.innerHTML = '';
    renderPhotos(photos, photosElement, photoElement);
  }

  const avatarElement = userCard.querySelector('.popup__avatar');
  avatarElement.src = avatar;

  return userCard;
};
