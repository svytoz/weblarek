import './scss/styles.scss';

import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';

import { Api } from './components/base/Api';
import { AppApi } from './components/base/AppApi';

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

// тест корзины
cartModel.add(firstProduct);
console.log('Корзина после добавления:', cartModel.getItems());

cartModel.remove(firstProduct.id);
console.log('Корзина после удаления:', cartModel.getItems());

cartModel.add(firstProduct);
console.log('Общая сумма:', cartModel.getTotal());
console.log('Количество:', cartModel.getCount());

// тест покупателя
buyerModel.setData({ address: 'Москва' });
buyerModel.setData({ payment: 'card' });
buyerModel.setData({ email: 'test@test.ru' });
buyerModel.setData({ phone: '+79999999999' });

console.log('Данные покупателя:', buyerModel.getData());
console.log('Ошибки валидации:', buyerModel.validate());

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