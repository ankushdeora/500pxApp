

'use strict';
module.exports = function (app) {
    const appController = require('../controllers/app-controller');
    // Sticky Routes for search and create.
    app.route('/authorize')
        .get(appController.post);

    app.route('/access_token')
        .post(appController.accessToken);

    app.route('/users')
        .get(appController.getUsers);
    
    app.route('/photoDelete')
        .post(appController.delPhoto);

    app.route('/addPhotoTag')
        .post(appController.adPhotoTag);
    
    app.route('/remPhotoTag')
        .post(appController.remPhotoTag);

    app.route('/uploadPhoto')
        .post(appController.upPhoto);

    app.route('/usersPhotos')
        .get(appController.getUserPhotos);

    app.route('/photoLikes')
        .post(appController.getPhotoLikes);

    app.route('/search')
        .post(appController.search);

    app.route('/subComment')
        .post(appController.comment);
};