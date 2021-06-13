const LoginPage  = require('./login');
const InventoryPage = require('./inventory')

module.exports = {
    ...LoginPage, ...InventoryPage,
};