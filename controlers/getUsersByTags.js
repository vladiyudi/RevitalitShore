const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
}


async function getUserByTags(req, res, shoreAuth) {
    let {  phone, instagramId } = req.body;

    if (!phone) {
        phone = '';
    }
    if (!instagramId) {
        instagramId = '';
    }

    const params  = new URLSearchParams({
        'filter[tags]': `${phone},${instagramId}`
    }).toString();


    try {
        const existingUser = await shoreAuth.makeAuthenticatedRequest('get', `/v2/customers?${params}`, null, headers);
        console.log(existingUser);
        res.json(existingUser);
    } catch (error) {
        console.error('Error creating customer:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({error: 'Error creating customer', details: error.response ? error.response.data : error.message});
    }
}

module.exports = getUserByTags;