/**
 * customer can update profile information.
 */

"use strict";


const m = require('mithril');
const Customer = require('../models/customer');


const UpdateProfile = {
    oninit: () => {
        Customer.res = "";
    },

    view: () => {
        return [
            m("h2", "Uppdatera din profil"),
            m("hr"),

            m("form.update_profile form-group", {
                onsubmit: function(event) {
                    event.preventDefault();
                    Customer.updateCustomer();
                }
            },
            [
                m("label.form-label mt-4", "Användarnamn"),
                m(`input.form-control #readOnlyInput[type=text][name=username][readonly][value=${Customer.customer.username}]`),


                m("label.col-form-label mt-4", "Förnamn"),
                m("input.form-control[type=text][name=firstname][required]", {
                    oninput: (event) => {
                        Customer.updateProfile.firstName = event.target.value;
                    }, value: Customer.updateProfile.firstName
                }),

                m("label.col-form-label mt-4", "Efternamn"),
                m("input.form-control[type=text][name=lastname][required]", {
                    oninput: (event) => {
                        Customer.updateProfile.lastName = event.target.value;
                    }, value: Customer.updateProfile.lastName
                }),



                m("label.col-form-label mt-4", "Email"),
                m(`input.form-control[type=email][name=email][readonly][value=${Customer.customer.email}]`),

                m("label.col-form-label mt-4", "Mobilnummer"),
                m("input.form-control[type=tel][required][name=tel][pattern='[0-9]{10}'][placeholder=0700000000]", {
                    oninput: (event) => {
                        Customer.updateProfile.phone = event.target.value;
                    }, value: Customer.updateProfile.phone
                }),

                m("label.col-form-label mt-4", "lösenord"),
                m("input.form-control[type=password][name=password][required]", {
                    oninput: (event) => {
                        Customer.updateProfile.password = event.target.value;
                    }, value: Customer.updateProfile.password
                }),


                m("hr"),
                m("div.d-grid gap-2", m("button.btn btn-success[type=submit]", "Uppdatera")),
            ]),

            m("p.res", Customer.res),
        ];
    }
};

module.exports = UpdateProfile;
