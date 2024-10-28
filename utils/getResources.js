const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
}


async function getResources(req, res, shoreAuth) {
    const response = await shoreAuth.makeAuthenticatedRequest('get', '/v2/resources/852eabb1-ff93-41cb-8f19-427be046786f', null, headers);
    res.json(response);
    console.log(response.data);
}


module.exports = getResources;

