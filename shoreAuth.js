const axios = require('axios');
const cron = require('node-cron');

class ShoreAPIAuth {
  constructor(apiUrl, username, password) {
    this.apiUrl = apiUrl;
    this.username = username;
    this.password = password;
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = null;
  }

  async initialize() {
    await this.getInitialToken();
    this.scheduleTokenRefresh();
  }

  async getInitialToken() {
    try {
      const response = await axios.post(`${this.apiUrl}/v2/tokens`, {
        grant_type: 'password',
        username: this.username,
        password: this.password
      });

      this.setTokens(response.data);
    } catch (error) {
      console.error('Error getting initial token:', error.message);
      throw error;
    }
  }

  setTokens(data) {
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.expiresAt = Date.now() + data.expires_in * 1000;
  }

  scheduleTokenRefresh() {
    // Schedule token refresh every 55 minutes (assuming 1-hour expiration)
    cron.schedule('*/55 * * * *', async () => {
      await this.refreshAccessToken();
    });
  }

  async refreshAccessToken() {
    try {
      const response = await axios.post(`${this.apiUrl}/v2/tokens`, {
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken
      });

      this.setTokens(response.data);
      console.log('Access token refreshed successfully');
    } catch (error) {
      console.error('Error refreshing access token:', error.message);
      // If refresh fails, try to get a new token with credentials
      await this.getInitialToken();
    }
  }

  async makeAuthenticatedRequest(method, endpoint, data = null, additionalHeaders = {}) {
    if (!this.accessToken || Date.now() >= this.expiresAt) {
        await this.refreshAccessToken();
    }

    try {
        const response = await axios({
            method,
            url: `${this.apiUrl}${endpoint}`,
            data,
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                ...additionalHeaders
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error making authenticated request:', error.message);
        throw error;
    }
}
}

module.exports = ShoreAPIAuth;