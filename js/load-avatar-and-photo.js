const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const AVATAR_DEFAULT = 'img/muffin-grey.svg';
const IMAGE_SIZE = '70px';


const fileChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const fileFotoChooser = document.querySelector('.ad-form__input');
const photoPreview = document.querySelector('.ad-form__photo');

export const loadAvatar = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
};

export const loadPhotoHousing = () => {
  fileFotoChooser.addEventListener('change', () => {
    const file = fileFotoChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      const photoPreviewImg = document.createElement('img');
      photoPreviewImg.width = IMAGE_SIZE;
      photoPreviewImg.height = IMAGE_SIZE;
      photoPreviewImg.src = URL.createObjectURL(file);
      photoPreview.appendChild(photoPreviewImg);
    }
  });
};

export const clearAvatarPhoto = () => {
  avatarPreview.src = AVATAR_DEFAULT;
  photoPreview.querySelectorAll('img').forEach((element) => element.remove());
};
