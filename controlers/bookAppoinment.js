const { bookApointmentForm } = require('../utils/reqForms.js');


async function bookAppointment(req, res, shoreAuth) {
    const { merchantId, serviceId, startTime, duration, title, customerId, resourceId } = req.body;
    const data = bookApointmentForm(merchantId, serviceId, startTime, duration, title, customerId, resourceId);
    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }

    try {
        const response = await shoreAuth.makeAuthenticatedRequest('post', '/v2/appointments', data, headers);
        console.log('Appointment created:', response);
        const { id, attributes, links } = response.data;
        
        if (attributes.state === 'pending' && links && links.accept) {
            const acceptResponse = await shoreAuth.makeAuthenticatedRequest('patch', links.accept, null, headers);
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