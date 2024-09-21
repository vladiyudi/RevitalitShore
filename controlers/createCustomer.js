const e = require("express");

async function createCustomer(req, res, shoreAuth) {
    const { name, lastName, email, phone, merchantId } = req.body;
    const data = {
        "data" : {
            "type" : "customers",
            "attributes" : {
                "opt_in": true,
                "opt_in_origin": "app-shell",
                "vip" : false,
                "custom_attributes" : [],
            "given_name" : name,
            "surname" : lastName,
            "addresses" : [
                {
                    "name" : "",
                    "line1" : "",
                    "line2" : "",
                    "city" : "",
                    "state" : "",
                    "country" : "DE",
                    "postal_code" : ""
                }
            ],
            "phones" : [
                {
                    "name" : "Home",
                    "value" : phone
                }
            ],
            "emails" : [
                {
                    "name" : "Work",
                    "value" : email
                }
            ]
        },
        "relationships" : {
            "merchant" : {
                "data" : {
                    "type" : "merchants",
                    "id" : merchantId
                }
            }
        }
    }
    }
    try {
        const response = await shoreAuth.makeAuthenticatedRequest('post', '/v2/customers', data, {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json'
        });
        res.json(response);
    } catch (error) {
        console.error('Error creating customer:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({error: 'Error creating customer', details: error.response ? error.response.data : error.message});
    }
}

module.exports = createCustomer;