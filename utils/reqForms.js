const customerForm = (name, lastName, email, phone, merchantId, instagramId=null) => {
    return {
        "data" : {
            "type" : "customers",
            "attributes" : {
                "opt_in": true,
                "opt_in_origin": "app-shell",
                "vip" : false,
                "custom_attributes" : [],
                "tags" : [instagramId.toString(), phone.toString()],
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
                    "name" : instagramId,
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



const bookApointmentForm = (merchantId, serviceId, startTime, duration, title, customerId, resourceId) => {
    return {
            "data": {
                "type": "appointments",
                "attributes": {
                    "starts_at": startTime,
                    "title": "Appointment from Bot",
                    "origin": "merchant_backend",
                    "color": "#FFA500",
                    "participant_count": 1,
                    "subject": title,
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
                            "resource_ids": [resourceId],
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
                        "data": []}
                }
            }
        };
    }

module.exports = {
    customerForm,
    bookApointmentForm
}