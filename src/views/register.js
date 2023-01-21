/**
 * Register page
 */

"use strict";


const m = require('mithril');
const Auth = require('../models/auth');


const Register = {
    oninit: () => {
        Auth.res = "";
    },

    view: () => {
        return m("div#register_page", [
            m("h2", "Registrera dig här"),
            m("hr"),

            m("form.register", {
                onsubmit: async (event) => {
                    event.preventDefault();
                    let result = await Auth.checkUser();

                    // Register customer if customer is not already registered.
                    if (result === true) {
                        Auth.register();
                    }
                }
            },
            [
                m("p", m("label.label", "Användarnamn")),
                m("input.input[type=text][name=username][required]", {
                    oninput: (event) => {
                        Auth.registerData.username = event.target.value;
                    }, value: Auth.registerData.username
                }),


                m("p", m("label.label", "Förnamn")),
                m("input.input[type=text][name=firstname][required]", {
                    oninput: (event) => {
                        Auth.registerData.firstName = event.target.value;
                    }, value: Auth.registerData.firstName
                }),

                m("p", m("label.label", "Efternamn")),
                m("input.input[type=text][name=lastname][required]", {
                    oninput: (event) => {
                        Auth.registerData.lastName = event.target.value;
                    }, value: Auth.registerData.lastName
                }),


                m("p", m("label.label", "Email")),
                m("input.input[type=email][name=email][required]", {
                    oninput: (event) => {
                        Auth.registerData.email = event.target.value;
                    }, value: Auth.registerData.email
                }),

                m("p", m("label.label", "Mobilnummer")),
                m("input.input[type=tel][required][name=tel][pattern='[0-9]{10}'][placeholder=0712345678]", {
                    oninput: (event) => {
                        Auth.registerData.phone = event.target.value;
                    }, value: Auth.registerData.phone
                }),

                m("p", m("label.label", "lösenord")),
                m("input.input[type=password][name=password][required]", {
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
