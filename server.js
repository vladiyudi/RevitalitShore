require('dotenv').config();
const express = require('express');
const app = express();
const cron = require('node-cron');
const port = process.env.PORT || 8080;
const ShoreAPIAuth = require('./shoreAuth');
const createAuthenticatedController = require('./authControllerFactory');
const findSlots = require('./controlers/findSlots');
const bookAppoinment = require('./controlers/bookAppoinment');
const cancelAppointment = require('./controlers/cancelAppointment');
const createCustomer = require('./controlers/createCustomer');
const getServiceByMerchant = require('./controlers/getServiceByMerchant');
const sendNotifications = require('./utils/SendNotifications');
const getUserByTags = require('./controlers/getUsersByTags');
const getResources = require('./utils/getResources');

app.use(express.json());

const shoreAuth = new ShoreAPIAuth(
    process.env.SHORE_API_URL,
    process.env.SHORE_API_USERNAME,
    process.env.SHORE_API_PASSWORD
);

const findSlotsController = createAuthenticatedController(shoreAuth, findSlots);
const bookAppoinmentController = createAuthenticatedController(shoreAuth, bookAppoinment);
const cancelAppointmentController = createAuthenticatedController(shoreAuth, cancelAppointment);
const createCustomerController = createAuthenticatedController(shoreAuth, createCustomer);
const getServiceByMerchantController = createAuthenticatedController(shoreAuth, getServiceByMerchant);
const getUserByTagsController = createAuthenticatedController(shoreAuth, getUserByTags);
const getResourcesController = createAuthenticatedController(shoreAuth, getResources);

const sendNotificationsController = createAuthenticatedController(shoreAuth, sendNotifications);

cron.schedule('00 18 * * *', sendNotificationsController);

const ensureAuth = async (req, res, next) => {
    if (!shoreAuth.accessToken) {
        try {
            await shoreAuth.initialize();
        } catch (error) {
            return res.status(500).json({ error: 'Failed to initialize authentication' });
        }
    }
    next();
};

app.use(ensureAuth);

app.get('/', (req, res) => {
    res.send('App is running');
});
app.post('/findSlots', findSlotsController);
app.post('/bookAppointment', bookAppoinmentController);
app.post('/cancelAppointment', cancelAppointmentController);
app.post('/createCustomer', createCustomerController);
app.post('/servicesInMerchant', getServiceByMerchantController);
app.post('/checkExistingUser', getUserByTagsController);
app.get('/getResources', getResourcesController);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('Cron job scheduled for 6 PM daily');
});