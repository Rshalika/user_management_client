var Client = require('node-rest-client').Client;
var backendUrl = "http://localhost:8000";
var client  = {
    retrieveUser : function(user,  callback)
    {
        var user_name = user.username;
        var password = user.password;
        var args = {
            data: {username: user_name, password: password},
            headers: {"Content-Type": "application/json"}
        };
        Client.get(backendUrl+'/user/validate', args, function (data, response) {

            if (data && data.success) {
                callback(null, new User(data.user));
            }else {
                callback({message:data.message});
            }


        });
    },

    getAllUsers:function (callback) {
        var res = [];

        Client.get(backendUrl+'user', function (data, response) {
            if (data && data.success) {

                for (var i = 0 ; i < data.users.length; i ++ ){
                    res.push(new User([data.users[i]]));
                }
                callback(null, res);
            }else {
                callback({message:data.message});
            }


        });
    },

    createUser:function(user,callback){
        var user_name = user.username;
        var password = user.password;
        var args = {
            data: {username: user_name, password: password},
            headers: {"Content-Type": "application/json"}
        };
        Client.post(backendUrl+'/user', args, function (data, response) {
            if (data.success) {
                callback(null, {message:data.message});
            }else {
                callback({message:data.message});
            }


        });
    },

    deleteUser:function(user,callback){
        var user_name = user.username;
        var args = {
            data: {username: user_name},
            headers: {"Content-Type": "application/json"}
        };
        Client.delete(backendUrl+'/user', args, function (data, response) {
            if (data.success) {
                callback(null, {message:data.message});
            }else {
                callback({message:data.message});
            }


        });
    },

    changePrivilegies:function(user, privs,callback){
        var user_name = user.username;
        var args = {
            data: {username: user_name, new_privs:privs},
            headers: {"Content-Type": "application/json"}
        };
        Client.post(backendUrl+'/user/privs', args, function (data, response) {
            if (data.success) {
                callback(null, {message:data.message});
            }else {
                callback({message:data.message});
            }


        });
    }


};


module.exports = client;
