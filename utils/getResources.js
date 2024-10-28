const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
}


async function getResources(req, res, shoreAuth) {
    const response = await shoreAuth.makeAuthenticatedRequest('get', '/v2/resources?page[size]=20', null, headers);
    res.json(response);
    console.log(response.data);
}


module.exports = getResources;

