/**
 * Register page
 */

"use strict";


import m from "mithril";
import { Auth } from "../models/auth";
import { Customer } from "../models/customer";


const Register = {
    oninit: () => {
        Customer.getAllCustomers();
    },

    view: function () {
        return [
            m("h2", "Registrera dig här"),
            m("form.register", {
                onsubmit: function(event) {
                    event.preventDefault();
                    Auth.register(Customer.allCustomers);
                }
            },
            [
                m("p", [
                    m("label.label", "Användarnamn"),
                    m("input.input[type=text][required]", {
                        oninput: (event) => {
                            Auth.registerData.username = event.target.value;
                        }, value: Auth.registerData.username
                    })
                ]),

                m("p", [
                    m("label.label", "Förnamn"),
                    m("input.input[type=text][required]", {
                        oninput: (event) => {
                            Auth.registerData.firstName = event.target.value;
                        }, value: Auth.registerData.firstName
                    }),

                    m("label.label", "Efternamn"),
                    m("input.input[type=text][required]", {
                        oninput: (event) => {
                            Auth.registerData.lastName = event.target.value;
                        }, value: Auth.registerData.lastName
                    })
                ]),

                m("p", [
                    m("label.label", "Email"),
                    m("input.input[type=email][required]", {
                        oninput: (event) => {
                            Auth.registerData.email = event.target.value;
                        }, value: Auth.registerData.email
                    }),

                    m("label.label", "Mobilnummer"),
                    m("input.input[type=text][required]", {
                        oninput: (event) => {
                            Auth.registerData.phone = event.target.value;
                        }, value: Auth.registerData.phone
                    })
                ]),

                m("p", [
                    m("label.label", "lösenord"),
                    m("input.input[type=password][required]", {
                        oninput: (event) => {
                            Auth.registerData.password = event.target.value;
                        }, value: Auth.registerData.password
                    })
                ]),

                m("div#register", m("button.button[type=submit]", "Registrera")),
            ]),

            m("p", Auth.res)
        ];
    }
};


export { Register };
