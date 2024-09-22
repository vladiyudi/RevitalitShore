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


module.exports = {
    findMerchantIdByName,
    findServiceByNameAndMerchant
}