const Customer = require('../controllers/customer')
const Order = require('../controllers/order')

const router = require('express').Router();

router.get('/v1/customer/:id', (req, res) => {
    Customer.getCustomer(req, res);
});

router.get('/v1/customers', (req, res) => {
    Customer.getCustomers(req, res);
});

router.post('/v1/customer', (req, res) => {
    Customer.CreateCustomer(req, res)
});

router.patch('/v1/customer/:id', (req, res) => {
    Customer.updateCustomer(req, res)
});

router.delete('/v1/customer/:id', (req, res)=> {
    Customer.deleteCustomer(req, res);
})

// orders
router.get('/v1/order/:id', (req, res) => {
    Order.getOrder(req, res);
});

router.get('/v1/orders', (req, res) => {
    Order.getOrder(req, res);
});


router.post('/v1/order', (req, res) => {
    Order.CreateOrder(req, res)
});

router.patch('/v1/order/:id', (req, res) => {
    Order.updateOrder(req, res)
});

router.delete('/v1/order/:id', (req, res)=> {
    Order.deleteOrder(req, res);
})


module.exports = router;