const { findMerchantIdByName, extractServicesData } = require('../utils/worker');

async function getServiceByMerchant(req, res, shoreAuth) {
    const { merchant } = req.body;
    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }
    try {
        const merachnts = await shoreAuth.makeAuthenticatedRequest('get', '/v2/merchants', null, headers);
        const merchantId = findMerchantIdByName(merchant, merachnts);
        const services = await shoreAuth.makeAuthenticatedRequest('get', `/v2/services/?page[size]=1000`, null, headers);
        const servicesBelongToMerchant = services.data.filter(service => service.relationships.merchant.data.id === merchantId);
        const servicesData = extractServicesData(servicesBelongToMerchant);
        res.json(servicesData);
    } catch (error) {
        console.error('Error finding slots:', error.message);
        res.status(500).json({ error: 'Internal server error' +" "+ error.message });
    }
    
}


module.exports = getServiceByMerchant