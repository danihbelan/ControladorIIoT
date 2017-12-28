/**
 * Created by danihbelan on 26/12/2017.
 */
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })

module.exports = csrfProtection;