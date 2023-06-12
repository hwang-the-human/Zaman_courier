// const server = 'https://infinite-eyrie-01907.herokuapp.com/';
const server = 'http://192.168.1.59:3000/';

const Api = {
  couriers: {
    me: server + 'api/couriers/me',
    sign_in: server + 'api/couriers/sign_in',
    save_device_token: server + 'api/couriers/save_device_token',
    change_status: server + 'api/couriers/change_status',
  },
  orders: {
    find_order_for_courier: server + 'api/orders/find_order_for_courier',
    get_order_for_courier: server + 'api/orders/get_order_for_courier',
    finish_order_for_courier: server + 'api/orders/finish_order_for_courier',
    get_order_history: server + 'api/orders/get_order_history',
  },
};

export default Api;
