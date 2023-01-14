"use strict";

const m = require('mithril');


const Auth = {
    url: process.env.API_URL,
    res: "",
    registerData: [],
    //token: "",
    authorized: false,

    // users data
    user: {
        email: "",
        password: "",
    },

    // Google user data
    oauth: {},

    // login user and add user id to user object.
    login: async () => {
        try {
            const result = await m.request({
                method: "POST",
                url: `${Auth.url}/auth/login`,
                body: {
                    email: Auth.user.email,
                    password: Auth.user.password,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            });


            if (result.user.token) {
                Auth.user.password = "";
                Auth.authorized = true;
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
                    url: `${Auth.url}/auth/register`,
                    body: {
                        username: Auth.registerData["username"],
                        password: Auth.registerData["password"],
                        phone: Auth.registerData["phone"],
                        email: Auth.registerData["email"],
                        firstName: Auth.registerData["firstName"],
                        lastName: Auth.registerData["lastName"],
                        roleId: "2",
                    },
                    headers: {
                        "Content-Type": "application/json",
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
        window.location.href = `${Auth.url}/auth//google`;
    },


    // check google authentication
    checkAuth: async () => {
        const res = await m.request({
            method: "GET",
            url: `${Auth.url}/auth/success`,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        if (res.status === 200 && res.user) {
            Auth.oauth = res.user;
            Auth.authorized = true;
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
