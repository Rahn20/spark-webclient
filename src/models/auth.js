"use strict";

const m = require('mithril');
const Customer = require('./customer');

const Auth = {
    url: "http://localhost:1337/api/v1/auth/",
    res: "",
    registerData: [],
    //token: "",
    authenticated: false,

    // users data
    user: {
        email: "",
        password: "",
    },


    // login user and add user id to user object.
    login: async () => {
        try {
            const result = await m.request({
                method: "POST",
                url: `${Auth.url}login`,
                body: {
                    email: Auth.user.email,
                    password: Auth.user.password,
                },
            });


            if (result.user.token) {
                Auth.user.password = "";
                Auth.authenticated = true;
                return true;
            } else {
                return false;
            }
        } catch (e) {
            Auth.res = "Något gick fel! antigen lösenordet eller mailadressen är fel.";
            console.log(e);
        }
    },


    // register new customer
    register: async (customers) => {
        let user = Auth.checkUser(customers);

        if (user) {
            Auth.res = "Användarnamnet eller email adressen används redan.";
        } else {
            try {
                await m.request({
                    method: "POST",
                    url: `${Auth.url}register`,
                    body: {
                        username: Auth.registerData["username"],
                        password: Auth.registerData["password"],
                        phone: Auth.registerData["phone"],
                        email: Auth.registerData["email"],
                        firstName: Auth.registerData["firstName"],
                        lastName: Auth.registerData["lastName"],
                        roleId: "2",
                    },
                });

                Auth.registerData = [];
                return m.route.set("/");
            } catch (e) {
                console.log(e);
            }
        }
    },


    loginWithGoogle: () => {
        window.location.href = `${Auth.url}/google`;
        Auth.checkAuth();
    },


    // check authenticat
    checkAuth: async () => {
        const res = await m
            .request({
                method: "GET",
                url: `${Auth.url}/success`,
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

        if (res.status === 200 && res.user) {
            //console.log(res.user);
            Customer.customer.id = res.user.id;
            Customer.customer.first_name = res.user.first_name;
            Customer.customer.last_name = res.user.last_name;
            Customer.customer.username = res.user.username;
            Customer.customer.phone = res.user.phone;

            Auth.authenticated = true;
        }
    },



    // Returns true if the username or email address exists.
    checkUser: (customers) => {
        let email = Auth.registerData["email"];
        let username = Auth.registerData["username"];
        let res = false;

        for (let i = 0; i < customers.length; i++) {
            if (
                customers[i].user.username == username ||
                customers[i].user.email == email
            ) {
                res = true;
                break;
            }
        }

        return res;
    },
};

module.exports = Auth;
