var Client = require('unirest');
var backendUrl = "http://localhost:8080";
var client  = {

    retrieveUser : function(user,  callback)
    {
        var user_name = user.username;
        var password = user.password;
        var headers =  {"Content-Type": "application/json"};
        var data = {username: user_name, password: password};

        var url = backendUrl+'/user/validate';

        Client.post(url)
            .headers(headers)
            .send(data)
            .end(function (response) {
                data = response.body;
                if (data && data.success) {
                    callback(null, data);
                }else {
                    callback({message:data.message});
                }
            });

    },

    getAllUsers:function (callback) {
        Client.get(backendUrl+'/user')
            .end(function (response) {
                if (response.status == 200) {
                    var data = response.body;
                    if(data ){
                        return callback(null, data);
                    }
                }
                return callback({message:'fail'});
            });

    },

    createUser:function(user,callback){
        var user_name = user.username;
        var password = user.password;
        var args = {
            data: {username: user_name, password: password},
            headers: {"Content-Type": "application/json"}
        };
        Client.post(backendUrl+'/user')
            .headers(args.headers)
            .send(args.data)
            .end(function (response) {
                var data = response.body;
                if (response.status == 200) {
                    if (data && data.success) {
                        callback(null, data);
                    }
                }else{
                    callback(data);
                }

            });

    },

    deleteUser:function(user,callback){
        var user_name = user.username;
        var args = {
            data: {username: user_name},
            headers: {"Content-Type": "application/json"}
        };
        Client.delete(backendUrl+'/user')
            .headers(args.headers)
            .send(args.data)
            .end(function (response) {
                var data = response.body;
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
            if (response.status == 200) {
                callback(null, {message:"fail"});
            }else {
                callback({message:"fail"});
            }


        });
    },
    adminChangePassword : function (user, callback) {
        var user_name = user.username;
        var old = user.old;
        var newPass = user.newPass;
        var confirm = user.confirm;
        var args = {
            data: {username: user_name, old: old,newPass : newPass, confirm:confirm},
            headers: {"Content-Type": "application/json"}
        };
        Client.post(backendUrl+'/user/admin')
            .headers(args.headers)
            .send(args.data)
            .end(function (response) {
                var data = response.body;
                if (response.status == 200) {
                    callback(null, {message:data.message});
                }else {
                    callback({message:data.message});
                }
            });


    },

    getUserPrivs:function (user, callback) {
        var user_name = user.username;

        var args = {
            headers: {"Content-Type": "application/json"}
        };
        Client.post(backendUrl+'/user/'+user_name, args, function (data, response) {
            if (response.status == 200) {
                callback(null, {data:data});
            }else {
                callback({message:data.message});
            }


        });
    }




};


module.exports = client;
