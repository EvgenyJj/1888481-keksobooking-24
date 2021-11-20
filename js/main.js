import {onFormReset, onFormSubmit} from './form.js';
import {validateForm} from './form-validation.js';
import {mapInitialization} from './map.js';
import {makeInactive} from './activation.js';
import {loadAvatar, loadPhotoHousing} from './load-avatar-and-photo.js';

loadAvatar();
loadPhotoHousing();
makeInactive();
onFormReset();
onFormSubmit();
validateForm();
mapInitialization();
