'use strict';

const appService = require('../services/app-service');

exports.post = function (request, response) {
    let stringHello = "hello";
    appService.authenticate(stringHello, function (res, body) {
        //response.json(res);
        response.json({success: true, data:body});

    });
};

exports.accessToken = function (request, response) {
    //var obj = request;
    console.log("requestBodyAccessToken"+JSON.stringify(request.body));
    var oauthToken =  JSON.stringify(request.body.oauth_token).replace(/"/g,"");
    var oauthTokenVerifier = JSON.stringify(request.body.oauth_verifier).replace(/"/g,"");
    console.log("oauthToken :" +oauthToken);
    console.log("oauthTokenVerifier :" +oauthTokenVerifier);
    console.log("type of oauthTokenVerifier: "+typeof(oauthTokenVerifier));
    let stringHello = "access token";
    appService.accessToken(oauthTokenVerifier, function (res) {
        response.json(res);
        // response.json({success: true, data:res});
    });
};

exports.getUsers = function(request, response) {
    var stringToPass = "getUsers";
    appService.getUsers(stringToPass, function(res, data) {
        //response.json(data);
        //var json = data.json();
        //console.log(data["_details"])
        response.json(data["_details"]);

    });
};

exports.delPhoto = function(request, response){
    var stringToPass = "deletePhoto";
    console.log(request.body.id);
    var delPhotoByID = request.body.id
    console.log(stringToPass);
    appService.deletePhoto(delPhotoByID, function (res, data) {
        response.json(data);
    });
};

exports.remPhotoTag = function(request, response){
    var stringToPass = "remPhotoTag";
    var tags = request.body.tags;
    var id = request.body.id;
    console.log(stringToPass);
    appService.removePhotoTag(tags, id, function (res, data) {
        response.json(data);
    });
};

exports.adPhotoTag = function(request, response){
    var stringToPass = "adPhotoTag";
    var tags = request.body.tags;
    var id = request.body.id;
    console.log(stringToPass);
    console.log("tags: "+tags+"id: "+id);
    appService.addPhotoTag(tags, id, function (res, data) {
        response.json(data);
    });
};


exports.upPhoto = function(request, response){
    var stringToPass = "upPhoto";
    var path = request.body.path;
    var name = request.body.name;
    var des = request.body.description;
    //var formData = request.body.path;
    console.log(stringToPass);
    console.log("path: "+path);
    appService.uploadPhoto(path, name, des,function(res, data){
        response.json(data);
    });
};


exports.getUserPhotos = function(request, response){
    var stringToPass = "getUserPhotos";
    appService.usersPhotos(stringToPass, function(res, data){
        response.json(data);
    });
};

exports.getPhotoLikes = function(request, response){
    var id = request.body.id;
    appService.photoLikes(id, function(res, data){
        response.json(data);
    });
};

exports.search = function(request, response){
    var searchTerm = request.body.term;
    var pageNum = request.body.page;
    //console.log
    appService.searchPhoto(searchTerm, pageNum, function(res, data){
        response.json(data);
    });

};


exports.comment = function(request, response){
    var comment = request.body.comment;
    var id = request.body.id;
    appService.postComment(comment, id, function(res, data){
        response.json(data);
    });
}

