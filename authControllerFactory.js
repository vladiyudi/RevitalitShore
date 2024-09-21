function createAuthenticatedController(shoreAuth, controllerFunction) {
    return async (req, res) => {
      try {
        if (!shoreAuth.accessToken) {
          await shoreAuth.initialize();
        }
        await controllerFunction(req, res, shoreAuth);
      } catch (error) {
        console.error('Controller error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
  }
  
  module.exports = createAuthenticatedController;