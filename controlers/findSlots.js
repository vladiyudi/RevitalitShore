function findMerchantIdByName(name, data) {
    const merchant = data.data.find(item => item.attributes.name === name);
    return merchant ? merchant.id : null;
}

function findServiceByNameAndMerchant(servicesArray, serviceName, merchantId) {
    const service = servicesArray.find(service => 
        service.attributes.name === serviceName && 
        service.relationships.merchant.data.id === merchantId
    );
    
    if (service) {
        return {
            serviceId: service.id,
            duration: service.attributes.duration
        };
    }

    return null; // Return null if no matching service is found
}

async function findSlots(req, res, shoreAuth) {
    const {location, service, startTime, endTime} = req.body;
    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }
try {
    const merachnts = await shoreAuth.makeAuthenticatedRequest('get', '/v2/merchants', null, headers);
    const merchant_id = findMerchantIdByName(location, merachnts);
    const services = await shoreAuth.makeAuthenticatedRequest('get', `/v2/services/?page[size]=1000`, null, headers);
    const {serviceId, duration} = findServiceByNameAndMerchant(services.data, service, merchant_id);
    const availability = await shoreAuth.makeAuthenticatedRequest('get', `/v2/availability/slots/${merchant_id}?required_capacity=1&search_weeks_range=2&starts_at=${startTime}&ends_at=${endTime}&services_resources[][service_id]=${serviceId}`, null, headers);
    res.json({
        slots:availability.slots,
        merchantId: merchant_id,
        serviceId: serviceId,
        duration: duration
    });
} catch (error) {
    console.error('Error finding slots:', error.message);
    res.status(500).json({ error: 'Internal server error' +" "+ error.message });
}
}


module.exports = findSlots;