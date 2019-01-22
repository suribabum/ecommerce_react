import phones from './mockPhones';
import R from 'ramda';
import request from 'superagent';
import mockCategories from './mockCategories';
//import axios from 'axios';

export const fetchPhones = async () => {
    return new Promise(async (resolve) => {
        //fetch phones data from node api
        const phone_result = await request.get('http://localhost:4500/getphonesdata');
        console.log("phoneres", phone_result)
        resolve(phone_result.body.data);
    });

};

export const loadMore = async ({ offset }) => {
    return new Promise((resolve) => {
        resolve(phones);
    });
};

export const fetchPhoneById = async id => {
    return new Promise(async (resolve, reject) => {
        console.log("Id in api fetchPhones ", id);

        const phone_result = await request.get(`http://localhost:4500/getphonesdata/${id}`);
        console.log("phoneres", phone_result)
        resolve(phone_result.body.data);
    });
};

export const fetchCategories = async () => {
    return new Promise(async (resolve) => {

        const categories = await request.get('http://localhost:4500/getcategories');
        console.log(categories)
        resolve(categories.body.data)
    });
}