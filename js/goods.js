'use strict';

document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__load').classList.add('visually-hidden');
document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
document.querySelector('.goods__card-empty').classList.add('visually-hidden');

var itemTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
var goodTemplate = document.querySelector('#card-order').content.querySelector('.goods_card')
var itemsListElement = document.querySelector('.catalog__cards');
var goodsListElement = document.querySelector('.goods__cards');
var fragment = document.createDocumentFragment();

var names = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];

var pictures = [
  'img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-eggplant.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg'

];

var ingredients = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomСonsist = function (arr, qty) {
  var consist = getRandomElement(arr);
  for (var i = 1; i < qty; i++) {
    var element = getRandomElement(arr);
    consist = consist + ', ' + element;
    }
  return consist;
}

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getElements = function (arr, arrLength) {
  for (var i = 0; i < arrLength; i++) {
    arr [i] = {
      name: getRandomElement(names),
      picture: getRandomElement(pictures),
      amount: getRandomInteger(0, 20),
      price: getRandomInteger(100, 1500),
      weight: getRandomInteger(30, 300),
      rating: {
        value: getRandomInteger(1, 5),
        number: getRandomInteger(10, 900)
      },
      nutritionFacts: {
        sugar: Boolean(getRandomInteger(0, 1)),
        energy: getRandomInteger(70, 500),
        contents: getRandomСonsist(ingredients, getRandomInteger(3,10))
      }
    }
  }
  return arr;
};

var stars = {
  1: 'stars__rating--one',
  2: 'stars__rating--two',
  3: 'stars__rating--three',
  4: 'stars__rating--four',
  5: 'stars__rating--five'
};

var sweet = {
  true: 'Содержит сахар',
  false: 'Без саxара'
};

var itemListLength = 26;
var goodListLength = 3;
var items = [];
var goods = [];

getElements(items, itemListLength);
getElements(goods, goodListLength);

for (var i = 0; i < items.length; i++) {
  var itemElement = itemTemplate.cloneNode(true);
  itemElement.querySelector('.card__title').textContent = items[i].name;
  itemElement.querySelector('.card__img').src = items[i].picture;
  itemElement.querySelector('.card__img').alt = items[i].name;

  if (items[i].amount > 5) {
    itemElement.classList.add('card--in--stock');
  } else if (items[i].amount == 0) {
    itemElement.classList.add('card--soon');
  } else {
    itemElement.classList.add('card--little');
  };
  itemElement.querySelector('.card__price').innerHTML = items[i].price + '<span class="card__currency"> ₽</span><span class="card__weight">/ ' + items[i].weight + ' Г</span>';
  itemElement.querySelector('.stars__rating').classList.add(stars[items[i].rating.value]);
  itemElement.querySelector('.star__count').textContent = items[i].rating.number;
  itemElement.querySelector('.card__characteristic').textContent = sweet[items[i].nutritionFacts.sugar] + '. ' + items[i].nutritionFacts.energy + ' ккал';
  itemElement.querySelector('.card__composition-list').textContent = items[i].nutritionFacts.contents;

  fragment.appendChild(itemElement);
}

itemsListElement.appendChild(fragment);

for (var i = 0; i < goods.length; i++) {
  var goodElement = goodTemplate.cloneNode(true);
  goodElement.querySelector('.card-order__title').textContent = goods[i].name;
  goodElement.querySelector('.card-order__img').src = goods[i].picture;
  goodElement.querySelector('.card-order__img').alt = goods[i].name;
  goodElement.querySelector('.card-order__price').textContent = goods[i].price + ' ₽';
  goodElement.querySelector('.card-order__count').value = goods[i].amount;

  fragment.appendChild(goodElement);
}

goodsListElement.appendChild(fragment);
