//Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRandomIntFromRange (from, to) {
  if (from >= to) {
    return new Error(' Не верно указан диапазон: значение "от" первышет или равно "до" ');
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from + 1) + from);
}
getRandomIntFromRange(0, 199);

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

function getRandomIntFloat (from, to, decimalPlaces) {
  if (from >= to) {
    return new Error(' Не верно указан диапазон: значение "от" первышет или равно "до" ');
  }
  const result = Math.random() * (to - from + 1) + from;
  return result.toFixed(decimalPlaces);
}
getRandomIntFloat(0, 199, 3);
