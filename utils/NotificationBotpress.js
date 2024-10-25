const axios = require('axios');
const webhookURL = process.env.BOTPRESS_WEBHOOK


function extractTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
}

const NotificationToBotpress = async (data) => {
    const conversationId = data.attributes.subject
    const startTime = extractTime(data.attributes.starts_at)
    try {
        const response = await axios.post(webhookURL, {
            conversationId,
            startTime
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


const MultpleNotificationToBotpress = async (data) => {
    try{
        for (const item of data) {
            console.log("ITEM", item);
            await NotificationToBotpress(item)
        }
    } catch (error) {
        console.log(error);
    }
   
}

module.exports = MultpleNotificationToBotpress