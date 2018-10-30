'use strict';
module.exports = function (app) {
    
    //Initialize routes
    let appRoutes = require('./routes/app-routes');
    appRoutes(app);
};
