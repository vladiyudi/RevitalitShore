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


function extractServicesData(servicesArray) {
    return servicesArray.map(service => {
        const { id: serviceId, attributes } = service;
        const { name, duration, cost, description } = attributes;
        const { amount } = cost;

        return {
            serviceId,
            name,
            duration,
            cost: amount,
            description,
            merchantId: service.relationships.merchant.data.id,
        };
    });
}


module.exports = {
    findMerchantIdByName,
    findServiceByNameAndMerchant,
    extractServicesData
}