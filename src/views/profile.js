/**
 * Profile view, the customer can see and his profile infomation.
 */

"use strict";

const m = require('mithril');
const Customer = require('../models/customer');
const Auth = require('./../models/auth');


const Profile = {
    oninit: () => {
        if (Auth.user.email) {
            Customer.getCustomerAccount();
        }
    },

    view: () => {
        if (Customer.customer.username) {
            return [
                m("h2", "Kund profil"),
                m("hr"),

                m("div#profile", [
                    m("div.circle-border", m("p", "profil")),

                    m("div.profile", [
                        m("ul", [
                            m("li", m("strong", "Användarnamn: "), Customer.customer.username),
                            m("li", m("strong", "Namn: "), Customer.customer.first_name + " " + Customer.customer.last_name),
                            m("li", m("strong", "Mailadress: "),  Customer.customer.email),
                            m("li", m("strong", "Mobilnummer: "), Customer.customer.phone),
                        ]),

                        m("div.account", [
                            m("h4", "Konto"),
                            m("ul", [
                                m("li", m("strong", "Betalningsmetod: "), Customer.account.payment_method),
                                m("li", m("strong", "Saldot på konto: "), Customer.account.balance + " Kr")
                            ])
                        ])
                    ])
                ])
            ];
        }

        return [
            m("h2", "Kund profil"),
            m("hr"),

            m("div#profile", [
                m("div.circle-border", m("p", "profil")),

                m("div.profile", [
                    m("ul", [
                        m("li", m("strong", "Användarnamn: "), Auth.oauth.username),
                        m("li", m("strong", "Namn: "), Auth.oauth.first_name + " " + Auth.oauth.last_name),
                        m("li", m("strong", "Mailadress: "),  Auth.oauth.email),
                        m("li", m("strong", "Mobilnummer: "), Auth.oauth.phone),
                    ]),

                    m("div.account", [
                        m("h4", "Konto"),
                        m("p", "Det finns inget konto att visa."),
                    ])
                ])
            ])
        ];
    },
};


module.exports = Profile;
