"use strict";

const m = require('mithril');


const Auth = {
    url: process.env.API_URL,
    res: "",
    registerData: [],
    isLogin: false,

    // users data
    user: {
        id: 0,
        email: "",
        password: "",
    },


    // Returns true when user succeed with login
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
                Auth.user.id = result.user.id;
                Auth.isLogin = true;
                return true;
            }
        } catch (e) {
            Auth.res = "Något gick fel! antigen lösenordet eller mailadressen är fel.";
            console.log(e);
        }
    },


    // register new customer
    register: async () => {
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
    },


    // login with google
    loginWithGoogle: async () => {
        window.location.href = `${Auth.url}/auth/google`;
        localStorage.setItem("oauth", true);
    },


    // check google authentication
    checkAuth: async () => {
        try {
            const res = await m.request({
                method: "GET",
                url: `${Auth.url}/auth/success`,
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.status === 200 && res.user) {
                Auth.user.email = res.user.email;
                Auth.user.id = res.user.id;
                Auth.isLogin = true;
            }
        } catch (e) {
            console.log(e);
        }
    },

    // Returns true if the username or email address does not exists, otherwise return true
    checkUser: async () => {
        const query = `
            query($username: String!, $email: String!) {
                getUserByUsernameOrEmail(username: $username, email: $email) {
                    id
                }
            }
        `;

        const variables = {
            username: Auth.registerData["username"],
            email: Auth.registerData["email"]
        };

        try {
            const result = await m.request({
                method: "POST",
                url: `${Auth.url}/graphql`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: { query: query, variables }
            });


            if (result.data.getUserByUsernameOrEmail.length === 0) {
                return true;
            } else {
                Auth.res = "Användarnamnet eller email adressen används redan.";
            }
        } catch (e) {
            console.log(e);
        }
    },
};

module.exports = Auth;
