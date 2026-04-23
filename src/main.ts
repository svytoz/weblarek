import './scss/styles.scss';

import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';

import { Api } from './components/base/Api';
import { AppApi } from './components/AppApi';

import { Products } from './components/Models/Products';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';

// модели
const productsModel = new Products();
const cartModel = new Cart();
const buyerModel = new Buyer();

// тест каталога
productsModel.setItems(apiProducts.items);
console.log('Каталог:', productsModel.getItems());

const firstProduct = productsModel.getItems()[0];
productsModel.setSelected(firstProduct);
console.log('Выбранный товар:', productsModel.getSelected());

console.log('Поиск по id:', productsModel.getById(firstProduct.id));

// тест корзины
cartModel.add(firstProduct);
console.log('После добавления:', cartModel.getItems());
console.log('Сумма:', cartModel.getTotal());
console.log('Количество:', cartModel.getCount());

const secondProduct = productsModel.getItems()[1];
cartModel.add(secondProduct);

console.log('После добавления второго товара:', cartModel.getItems());
console.log('Сумма:', cartModel.getTotal());
console.log('Количество:', cartModel.getCount());

cartModel.remove(firstProduct.id);
console.log('После удаления одного товара:', cartModel.getItems());

console.log('Проверка наличия:', cartModel.has(secondProduct.id));

cartModel.clear();
console.log('После очистки:', cartModel.getItems());

// тест покупателя
buyerModel.setData({ address: 'Москва' });
buyerModel.setData({ payment: 'online' });
buyerModel.setData({ email: 'test@test.ru' });
buyerModel.setData({ phone: '+79999999999' });

console.log('Данные покупателя:', buyerModel.getData());
console.log('Ошибки валидации:', buyerModel.validate());

buyerModel.clear();
console.log('После очистки:', buyerModel.getData());
console.log('Ошибки после очистки:', buyerModel.validate());

// API
const api = new Api(API_URL);
const appApi = new AppApi(api);

// запрос товаров с сервера
appApi.getProducts()
    .then(data => {
        productsModel.setItems(data.items);
        console.log('Каталог с сервера:', productsModel.getItems());
    })
    .catch(err => {
        console.error('Ошибка загрузки товаров:', err);
    });