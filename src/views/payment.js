/**
 * Payment page, the customer can see his payments, change payment method and
 * fill up his account with money.
 */

"use strict";

const m = require('mithril');
const Payments = require('./../models/payment');
const Customer = require('./../models/customer');

const Payment = {
    oninit: () => {
        Customer.getCustomerAccount();
        Payments.getPayments();
        Payments.res = "";
        Payments.money = null;
    },

    view: () => {
        let count = 1;

        if (Customer.account.payment_method) {
            return [
                m("h2", "Betalningar"),
                m("hr"),

                m("div#payments_info", [
                    m("ul", [
                        m("li", "Betalningsmetod: " + Customer.account.payment_method),
                        m("li", "Nuvarande saldo: " + Customer.account.balance + " kr")
                    ]),
                ]),

                m("form.payment_method", {
                    onsubmit: (event) => {
                        event.preventDefault();
                        Payments.changePaymentMethod();
                    }
                },
                [
                    m("p", [
                        m("label.payment_method_label [for=payment_mthod]", "Ändra betalningsmetod"),
                        m("select#payment_method[name=payment_method]", {
                            onchange: (event) => {
                                Payments.paymentMethod = event.target.value;
                            }
                        },
                        [
                            m("option", "välj betalningsmetod"),
                            m("option", { value: "CARD" }, "CARD"),
                            m("option", { value: "Prepaid" }, "Prepaid")
                        ]),

                        m("button.btn btn-primary[type=submit]", "Ändra"),
                    ])
                ]),


                m("form.payment_balance", {
                    onsubmit: (event) => {
                        let money = parseFloat(Customer.account.balance) + parseFloat(Payments.money);

                        event.preventDefault();
                        Payments.fillMoney(money.toString());
                    }
                },
                [

                    m("p", [
                        m("label.payment_balance_label[for=payment_balance]", "Lägg till pengar"),
                        m("input#payment_balance[type=number][required]", {
                            oninput: (event) => {
                                Payments.money = event.target.value;
                            }, value: Payments.money
                        }),

                        m("button.btn btn-primary[type=submit]", "Ändra"),
                    ]),
                ]),

                m("p", Payments.res),

                m("div", [
                    m("table.table table-hover", [
                        m("thead", [
                            m("tr.table-primary", [
                                m("th", { scope: "col" }, "Nr"),
                                m("th", { scope: "col" }, "Namn"),
                                m("th", { scope: "col" }, "Konto nummer"),
                                m("th", { scope: "col" }, "Summan"),
                                m("th", { scope: "col" }, "Datum"),

                            ]),
                        ]),

                        m("tbody", [
                            Payments.allPayments.map((res) => {
                                return m("tr.table-active", [
                                    m("td", count++),
                                    m("td", res.customer_name),
                                    m("td", res.account_id),
                                    m("td", res.total + "kr"),
                                    m("td", res.date),
                                ]);
                            })
                        ])
                    ])
                ])
            ];
        } else {
            return [
                m("h2", "Betalningar"),
                m("hr"),
                m("p", "Kunden har inte registrerat en betaltjänst.")
            ];
        }
    },
};


module.exports = Payment;
