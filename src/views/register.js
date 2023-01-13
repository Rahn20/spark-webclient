/**
 * Register page
 */

"use strict";


const m = require('mithril');
const Auth = require('../models/auth');
const Customer = require('../models/customer');


const Register = {
    oninit: () => {
        Customer.getAllCustomers();
    },

    view: () => {
        return m("div#register_page", [
            m("h2", "Registrera dig här"),
            m("hr"),

            m("form.register", {
                onsubmit: function(event) {
                    event.preventDefault();
                    Auth.register(Customer.allCustomers);
                }
            },
            [
                m("p", m("label.label", "Användarnamn")),
                m("input.input[type=text][required]", {
                    oninput: (event) => {
                        Auth.registerData.username = event.target.value;
                    }, value: Auth.registerData.username
                }),


                m("p", m("label.label", "Förnamn")),
                m("input.input[type=text][required]", {
                    oninput: (event) => {
                        Auth.registerData.firstName = event.target.value;
                    }, value: Auth.registerData.firstName
                }),

                m("p", m("label.label", "Efternamn")),
                m("input.input[type=text][required]", {
                    oninput: (event) => {
                        Auth.registerData.lastName = event.target.value;
                    }, value: Auth.registerData.lastName
                }),



                m("p", m("label.label", "Email")),
                m("input.input[type=email][required]", {
                    oninput: (event) => {
                        Auth.registerData.email = event.target.value;
                    }, value: Auth.registerData.email
                }),

                m("p", m("label.label", "Mobilnummer")),
                m("input.input[type=tel][required][pattern='[0-9]{10}'][placeholder=0712345678]", {
                    oninput: (event) => {
                        Auth.registerData.phone = event.target.value;
                    }, value: Auth.registerData.phone
                }),

                m("p", m("label.label", "lösenord")),
                m("input.input[type=password][required]", {
                    oninput: (event) => {
                        Auth.registerData.password = event.target.value;
                    }, value: Auth.registerData.password
                }),



                m("hr"),
                m("div#register", m("button.registerbtn[type=submit]", "Registrera")),
            ]),

            m("p", Auth.res),
        ]);
    }
};

module.exports = Register;
