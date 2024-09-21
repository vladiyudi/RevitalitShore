async function cancelAppointment(req, res, shoreAuth) {

const { appointmentId } = req.body;
    const data = {
        "data" : {
            "id" : appointmentId,
            "type" : "appointments",
            "meta" : {
                "reason" : "The optional reason why the appointment was canceled"
            }
        }
    }

    try {
        const response = await shoreAuth.makeAuthenticatedRequest('patch', `/v2/appointments/${appointmentId}/actions/cancel`, data, {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json'
        });
        res.json(response);
    } catch (error) {
        console.error('Error booking appointment:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({
            error: 'Error booking appointment',
            details: error.response ? error.response.data : error.message
        });
    }
}

module.exports = cancelAppointment;