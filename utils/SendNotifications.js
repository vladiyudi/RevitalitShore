const MultpleNotificationToBotpress = require('./NotificationBotpress');

function filterAppointments(appointments) {
    return appointments.filter(appointment => 
        appointment.attributes.subject &&
        appointment.attributes.state === "accepted"
    );
}


async function sendNotifications(req, res, shoreAuth) {
    console.log('Starting daily task at:', new Date().toLocaleString());

    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }

    const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

    const later = new Date();
        later.setDate(tomorrow.getDate() + 10);
        
    const startTime = new Date(tomorrow);
        startTime.setHours(9, 0, 0, 0);
        
    const endTime = new Date(tomorrow);
        endTime.setHours(21, 0, 0, 0);

        const params = new URLSearchParams({
            'filter[starts_at.gt]': startTime.toISOString(),
            'filter[starts_at.lt]': endTime.toISOString(), 
            "page[size]":1000
        }).toString();

    try {
        const response = await shoreAuth.makeAuthenticatedRequest('get', `/v2/appointments?${params}`, headers);
        await MultpleNotificationToBotpress(filterAppointments(response.data))
        console.log('Daily task completed at:', new Date().toLocaleString());
    } catch (error) {
        console.error(error);
    }
}

module.exports = sendNotifications;
