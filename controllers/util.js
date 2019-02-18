const config = require('../config')

module.exports = {
  createErrorResponse: message => (err) => {
    let errorResponse = { message }
    if(err &&  config.ENV !== 'prod'){
      errorResponse['error'] = err
    }
    return errorResponse;
  }
}