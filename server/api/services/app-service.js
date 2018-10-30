
'use strict';
var config = require('../config.js');
var Api500px = require('api_500px');
var request = require('request');
var fs = require("fs");
var accToken;
var accSec;

var api = new Api500px(
    {
        key: config.consumerkey,
        secret: config.consumersecret,
        callback: 'http://localhost:4200/oauth_callback'
    });

exports.authenticate = function (stringPassed, callback) {
    console.log(stringPassed);
    api.authRequest(function(err, authToken, authSecret, results)
    {
        if (err) return callback(err);

        // redirect client to OAuth page
        //console.log(authToken);
        callback(null,'https://api.500px.com/v1/oauth/authorize?oauth_token='+authToken);
    });
};

exports.accessToken = function (tokenVerifier, callback) {
    console.log("tokenvarifier: "+tokenVerifier);
    api.getAccessToken(tokenVerifier, function(err, accessToken, accessSecret, results)
    {
        if (err) return callback(err);

        // access token's been stored within the api instance as well
        if(accessToken!= null) {
            accToken = accessToken;
            accSec = accessSecret;
        }
        console.log("accessToken: "+accToken);
        console.log("accessSecret: "+accessSecret);
        callback(null, {status: 'ready'});
        // console.log("accessToken:"+accessToken);
    });
};

exports.getUsers = function (stringPassed, callback){
    console.log(stringPassed);
    api.getUser(function(err, userData)
    {
        if (err) return callback(err);

        // user's info has been stored within the api instance
        // - normalized: api.data.user.id and api.data.user.username
        // - original: api.data.user._details
        // "returned" userData has same format
        //  console.log("userData:"+userData);
        callback(null, userData);
    });
};

exports.deletePhoto = function (photoID, callback){
    console.log("deletePhoto");
    var oauth =
        { consumer_key: config.consumerkey
            , consumer_secret: config.consumersecret
            , token: accToken
            , token_secret: accSec
        }
        , url = 'https://api.500px.com/v1/photos/'+photoID
        , qs ={
        id : photoID
    };
    request.del({url:url, oauth:oauth, qs:qs, json:true}, function (e, r, userData) {
        callback(null, userData);
    });

};

exports.removePhotoTag = function(tags, id, callback){
    var oauth =
        { consumer_key: config.consumerkey
            , consumer_secret: config.consumersecret
            , token: accToken
            , token_secret: accSec
        }
        , url = 'https://api.500px.com/v1/photos/'+id+'/tags'
        , qs ={
        tags : tags
    };
    request.del({url:url, oauth:oauth, qs:qs, json:true}, function (e, r, userData) {
        console.log(userData);
        callback(null, userData);
    });
};

exports.addPhotoTag = function(tags, id, callback){
    var oauth =
        { consumer_key: config.consumerkey
            , consumer_secret: config.consumersecret
            , token: accToken
            , token_secret: accSec
        }
        , url = 'https://api.500px.com/v1/photos/'+id+'/tags'
        , qs ={
        tags : tags
    };
    request.post({url:url, oauth:oauth, qs:qs, json:true}, function (e, r, userData) {
        console.log(userData);
        callback(null, userData);
    });
};


exports.uploadPhoto = function(path, name, des, callback){
    var filepath = "/Users/*/*/"+path;
    var readStream = fs.createReadStream(filepath);
    //console.log(readStream);
    // let headers = new Headers();
    // /** No need to include Content-Type in Angular 4 */
    // headers.append('Content-Type', 'multipart/form-data');

    var oauth =
        { consumer_key: config.consumerkey
            , consumer_secret: config.consumersecret
            , token: accToken
            , token_secret: accSec
        }
        , url = 'https://api.500px.com/v1/photos/upload'
        , qs = {
        name: name,
        description: des,
        tags: "carTag"
    }
        , formData = {
        file : readStream
    };

    request.post({url:url, oauth:oauth, qs:qs, formData: formData, json:true}, function (e, r, user) {
        console.log(user)
    });
};



exports.usersPhotos  = function(stringPassed, callback){
    console.log(stringPassed);
    var oauth =
        { consumer_key: config.consumerkey
            , consumer_secret: config.consumersecret
            , token: accToken
            , token_secret: accSec
        }
        , url = 'https://api.500px.com/v1/photos'
        , qs = {
        feature: 'user',
        user_id: '24439129',
        sort: 'created_at',
        image_size: '6,2',
        tags: 1
    }

    request.get({url: url, oauth: oauth, qs:qs, json:true}, function(e, r, data){
        //console.log(user);
        if (e) return callback(e);

        callback(null, data);
    });
};


exports.photoLikes = function (id, callback){
    console.log("photoLikes. id: "+id);
    var oauth =
        { consumer_key: config.consumerkey
            , consumer_secret: config.consumersecret
            , token: accToken
            , token_secret: accSec
        }
        , url = 'https://api.500px.com/v1/photos/'+id+'/votes'
        , qs = {

    }
    request.get({url: url, oauth: oauth, qs:qs, json:true}, function(e, r, data){
        //console.log(user);
        if (e) return callback(e);

        callback(null, data);
    });
};

exports.searchPhoto = function(searchTerm, pageNum,callback){
    console.log("seatchTerm: "+searchTerm);
    var oauth =
        { consumer_key: config.consumerkey
            , consumer_secret: config.consumersecret
            , token: accToken
            , token_secret: accSec
        }
        , url = 'https://api.500px.com/v1/photos/search'
        , qs = {
        term : searchTerm,
        page : pageNum
    }

    request.get({url: url, oauth: oauth, qs:qs, json:true}, function(e, r, data){
        //console.log(user);
        if (e) return callback(e);

        callback(null, data);
    });
};


exports.postComment = function(comment, id, callback){
    var oauth =
        { consumer_key: config.consumerkey
            , consumer_secret: config.consumersecret
            , token: accToken
            , token_secret: accSec
        }
        , url = 'https://api.500px.com/v1/photos/'+id+'/comments'
        , qs = {
        body : comment
    }

    request.post({url: url, oauth: oauth, qs:qs, json:true}, function(e, r, data){
        //console.log(data);
        if (e) return callback(e);

        callback(null, data);
    });
}



