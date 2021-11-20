import {onFormReset, onFormSubmit} from './form.js';
import {validateForm} from './form-validation.js';
import {mapInitialization} from './map.js';
import {makeInactive} from './activation.js';

makeInactive();
onFormReset();
onFormSubmit();
validateForm();
mapInitialization();
