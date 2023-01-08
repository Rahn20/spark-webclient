"use strict";

import m from 'mithril';


const Auth = {
    url: "http://localhost:1337/api/v1/auth/",
    token: "",
    authenticated: true,
    res: "",
    registerData: [],

    // users data
    user: {
        id: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
        username: "",
    },

    // log in user and add user data to user object.
    login: async () => {
        try {
            const result = await m.request({
                method: "POST",
                url: `${Auth.url}login`,
                body: {
                    email: Auth.user.email,
                    password: Auth.user.password
                }
            });

            Auth.user.password = "";
            Auth.token = result.user.token;
            Auth.user.firstname = result.user.first_name;
            Auth.user.lastname = result.user.last_name;
            Auth.user.username = result.user.username;
            Auth.user.phone = result.user.username;
            Auth.user.id = result.user.id;
            Auth.authenticated = true;
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
                    }
                });

                Auth.registerData = [];
                return m.route.set("/");
            } catch (e) {
                console.log(e);
            }
        }
    },


    // Returns true if the username or email address exists.
    checkUser: (customers) => {
        let email = Auth.registerData["email"];
        let username = Auth.registerData["username"];
        let res = false;

        for (let i = 0; i < customers.length; i++) {
            if (customers[i].user.username == username || customers[i].user.email == email) {
                res = true;
                break;
            }
        }

        return res;
    }
};


export { Auth };
