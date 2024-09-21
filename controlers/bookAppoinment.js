async function bookAppointment(req, res, shoreAuth) {
    const { merchantId, serviceId, startTime, duration, title, customerId } = req.body;
    
    const data = {
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
                "attachments": { "data": [] }
            }
        }
    };

    try {
        // Create the appointment
        const response = await shoreAuth.makeAuthenticatedRequest('post', '/v2/appointments', data, {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json'
        });

        console.log('Appointment created:', response);
        const { id, attributes, links } = response.data;
        console.log('Appointment ID:', id);

        // Check the state of the appointment
        if (attributes.state === 'pending' && links && links.accept) {
            console.log('Appointment is pending and can be accepted. Attempting to accept...');
            
            // Use the accept link provided by the API
            const acceptResponse = await shoreAuth.makeAuthenticatedRequest('patch', links.accept, null, {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            });

            console.log('Appointment accepted:', acceptResponse);
            res.json(acceptResponse);
        } else {
            console.log('Appointment state:', attributes.state);
            console.log('Cannot accept appointment. It may already be accepted or canceled.');
            res.json(response);
        }
    } catch (error) {
        console.error('Error booking appointment:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({
            error: 'Error booking appointment',
            details: error.response ? error.response.data : error.message
        });
    }
}

module.exports = bookAppointment;