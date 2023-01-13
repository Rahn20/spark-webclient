/**
 * Profile view, the customer can see and his profile infomation.
 */

"use strict";

const m = require('mithril');
const Customer = require('../models/customer');


const Profile = {
    oninit: () => {
        //Customer.getCustomer();
        Customer.getCustomerAccount();
    },

    view: () => {
        return [
            m("h2", "Kund profil"),
            m("hr"),

            m("div#profile", [
                m("div.circle-border", m("p", "profil")),

                m("div.profile", [
                    m("ul", [
                        m("li", m("strong", "Användarnamn: "), Customer.customer.username),
                        // eslint-disable-next-line max-len
                        m("li", m("strong", "Namn: "), Customer.customer.first_name + " " + Customer.customer.last_name),
                        m("li", m("strong", "Mailadress: "),  Customer.customer.email),
                        m("li", m("strong", "Mobilnummer: "), Customer.customer.phone),
                    ]),

                    m("div.account", [
                        m("h4", "Konto"),
                        m.trust(`
                            ${Customer.account.payment_method ? `
                                <ul>
                                    <li> Betalningsmetod: ${Customer.account.payment_method}</li>
                                    <li> Saldot på konto: ${Customer.account.balance} kr </li>
                                </ul>
                                ` : `
                                <p> Kunden har inte registrerat ett konto.</p>
                            `}
                        `),
                    ])
                ])
            ])
        ];
    },
};

module.exports = Profile;
