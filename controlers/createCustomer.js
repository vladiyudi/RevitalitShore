const { findMerchantIdByName } = require('../utils/worker');
const {customerForm} = require('../utils/reqForms');

const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
}

async function createCustomer(req, res, shoreAuth) {
    const { name, lastName, email, phone, location } = req.body;
    try {
        const merchants = await shoreAuth.makeAuthenticatedRequest('get', '/v2/merchants', null, headers)
        const merchant_id = findMerchantIdByName(location, merchants);
        const data = customerForm(name, lastName, email, phone, merchant_id);
        const response = await shoreAuth.makeAuthenticatedRequest('post', '/v2/customers', data, headers);
        res.json(response);
    } catch (error) {
        console.error('Error creating customer:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({error: 'Error creating customer', details: error.response ? error.response.data : error.message});
    }
}

module.exports = createCustomer;