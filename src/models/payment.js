"use strict";

const m = require('mithril');
const Customer = require('./customer');


const Payments = {
    url: "http://localhost:1337/api/v1/graphql",
    allPayments: [],
    res: "",
    money: null,
    paymentMethod: "",


    // Get all customer payments
    getPayments: async () => {
        const query = `
            query($customerId: String!) {
                getPaymentByCustomerId(customerId: $customerId) {
                    payment_method
                    account_id
                    customer_name
                    email
                    total
                    date
                }
            }
        `;

        const variables = {
            customerId: Customer.customer.id
        };

        try {
            const result = await m.request({
                method: "POST",
                url: Payments.url,
                body: { query: query, variables }
            });

            Payments.allPayments = result.data.getPaymentByCustomerId;
        } catch (e) {
            console.log(e);
        }
    },

    // adds money to the customer account.
    fillMoney: async (money) => {
        const mutation = `
            mutation($customer_id: String!, $balance: String!) {
                AddMoneyToAccountByCustomerId(customer_id: $customer_id, balance: $balance) {
                    id
                }
            }
        `;

        const variables = {
            customer_id: Customer.customer.id,
            balance: money
        };

        try {
            const result = await m.request({
                method: "POST",
                url: Payments.url,
                body: { query: mutation, variables }
            });

            if (result.data.AddMoneyToAccountByCustomerId === null) {
                Payments.res = Payments.money + " kr har satts in på kontot.";
            }
        } catch (e) {
            console.log(e);
        }
    },


    // Updates customer payment metohd
    changePaymentMethod: async () => {
        const mutation = `
            mutation($customer_id: String!, $payment_method: String!) {
                updatePaymentMethodByCustomerId(customer_id: $customer_id, payment_method: $payment_method) {
                    id
                }
            }
        `;

        const variables = {
            customer_id: Customer.customer.id,
            payment_method: Payments.paymentMethod
        };

        try {
            const result = await m.request({
                method: "POST",
                url: Payments.url,
                body: { query: mutation, variables }
            });

            if (result.data.updatePaymentMethodByCustomerId === null) {
                Payments.res = "Betalningsmetoden har ändrats.";
            }
        } catch (e) {
            console.log(e);
        }
    },
};

module.exports = Payments;
