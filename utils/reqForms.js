const customerForm = (name, lastName, email, phone, merchantId) => {
    return {
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
}

module.exports = {
    customerForm
}