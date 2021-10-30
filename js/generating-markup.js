const mapTemplate = document.querySelector('#card').content;

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const makePopupFeatures = (popupElement, features) => {
  const popupFeatures = popupElement.querySelector('.popup__features');
  if (features.length === 0) {
    popupFeatures.style.display = 'none';
    return;
  }
  const popupFeaturesList = popupFeatures.querySelectorAll('.popup__feature');
  const facilities = features.map((feature) => `popup__feature--${feature}`);
  popupFeaturesList.forEach((popupFeaturesItem) => {
    const facilitie = popupFeaturesItem.classList[1];
    if (!facilities.includes(facilitie)) {
      popupFeaturesItem.remove();
    }
  });
};
makePopupFeatures;

const getPhoto = (popupElement, photos) => {
  const popupPhotos = popupElement.querySelector('.popup__photos');
  if (photos.length === 0) {
    popupPhotos.style.display = 'none';
    return;
  }
  const popupPhoto = popupPhotos.querySelector('.popup__photo');
  const popupPhotoClone = popupPhoto.cloneNode(true);
  popupPhoto.remove();
  photos.forEach((photoSrc) => {
    const photo = popupPhotoClone.cloneNode(true);
    photo.src = photoSrc;
    popupPhotos.appendChild(photo);
  });
};

export const createCard = (offerObject) => {
  const userCard = mapTemplate.querySelector('.popup').cloneNode(true);
  userCard.querySelector('.popup__title').textContent = offerObject.offer.title;
  userCard.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  userCard.querySelector('.popup__text--price').textContent = `${offerObject.offer.price} ₽/ночь`;
  userCard.querySelector('.popup__type').textContent = offerTypes[offerObject.offer.type];
  userCard.querySelector('.popup__text--capacity').textContent = `${offerObject.offer.rooms } комнаты для ${ offerObject.offer.guests } гостей`;
  userCard.querySelector('.popup__text--time').textContent = `Заезд после ${offerObject.offer.checkin}, выезд до ${ offerObject.offer.checkout}`;
  userCard.querySelector('.popup__features').textContent = offerObject.offer.features;
  userCard.querySelector('.popup__description').textContent = offerObject.offer.description;
  userCard.querySelector('.popup__photos img').src = getPhoto(userCard, offerObject.offer.photos);
  userCard.querySelector('.popup__avatar').src = offerObject.author.avatar;
  return userCard;
};
createCard;
