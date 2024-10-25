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



const bookApointmentForm = (merchantId, serviceId, startTime, duration, title, customerId) => {
    return {
            "data": {
                "type": "appointments",
                "attributes": {
                    "starts_at": startTime,
                    "title": title,
                    "origin": "merchant_backend",
                    "color": "#FFA500",
                    "participant_count": 1,
                    "subject": "Some Subject",
                    "service_ids": [serviceId],
                    "address": {
                        "line1": "",
                        "line2": "",
                        "city": "",
                        "state": "",
                        "country": "DE",
                        "postal_code": ""
                    },
                    "steps": [
                        {
                            "name": "Working step",
                            "break": false,
                            "with_customer": true,
                            "duration": duration,
                            "resource_ids": [],
                            "service_id": serviceId,
                            "employee_selected_by": "customer"
                        }
                    ]
                },
                "relationships": {
                    "merchant": {
                        "data": {
                            "type": "merchants",
                            "id": merchantId
                        }
                    },
                    "customer": {
                        "data": {
                            "type": "customers",
                            "id": customerId
                        }
                    },
                    "attachments": { 
                        "data": [title]}
                }
            }
        };
    }

module.exports = {
    customerForm,
    bookApointmentForm
}