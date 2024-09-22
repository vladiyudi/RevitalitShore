
async function findSlots(req, res, shoreAuth) {
    const {merchantId, serviceId, startTime, endTime} = req.body;
    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }
try {
    const availability = await shoreAuth.makeAuthenticatedRequest('get', `/v2/availability/slots/${merchantId}?required_capacity=1&search_weeks_range=2&starts_at=${startTime}&ends_at=${endTime}&services_resources[][service_id]=${serviceId}`, null, headers);
    res.json({
        slots:availability.slots,
    });
} catch (error) {
    console.error('Error finding slots:', error.message);
    res.status(500).json({ error: 'Internal server error' +" "+ error.message });
}
}


module.exports = findSlots;