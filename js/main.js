import {NUMBERS_OF_OFFERS, createAnnouncement} from './data.js';
import {createCard} from './generating-markup.js';
const similarAdsData = Array.from({length: NUMBERS_OF_OFFERS}, createAnnouncement);
similarAdsData;
const offerObject = similarAdsData[0];
const userCard = createCard(offerObject);
document.querySelector('#map-canvas').appendChild(userCard);
