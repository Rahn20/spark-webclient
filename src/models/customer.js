"use strict";

const m = require('mithril');
const Auth = require('./auth');



const Customer = {
    url: "http://localhost:1337/api/v1/graphql",
    allCustomers: [],
    customer: {},
    account: {},


    // get customer data and add it to customer object
    getCustomer: async () => {
        const query = `
            query($email: String!) {
                getCustomerByEmail(email: $email) {
                    user {
                        id
                        last_name
                        first_name
                        username
                        email
                        phone
                    }

                }
            }
        `;

        const variables = {
            email: Auth.user.email
        };

        try {
            const result = await m.request({
                method: "POST",
                url: Customer.url,
                body: { query: query, variables }
            });

            //console.log(result.data.getCustomerByEmail);
            Customer.customer = result.data.getCustomerByEmail[0].user;
        } catch (e) {
            console.log(e);
        }
    },


    // Get customer account data (payment method and balance)
    getCustomerAccount: async () => {
        const query = `
            query($id: String!) {
                getAccountByCustomerId(id: $id) {
                    balance,
                    payment_method
                }
            }
        `;

        const variables = {
            id: Customer.customer.id
        };

        try {
            const result = await m.request({
                method: "POST",
                url: Customer.url,
                body: { query: query, variables }
            });

            Customer.checkCustomerAcc(result.data.getAccountByCustomerId);
        } catch (e) {
            console.log(e);
        }
    },


    // Check if the customer has registered a payment account.
    checkCustomerAcc: (account) => {
        if (account.length != 0) {
            Customer.account = account[0];
        }
    },


    // Get all customers and add customer data to allCustomers list.
    getAllCustomers: async () => {
        const query = `
            query {
                getAllCustomers {
                    user {
                        username
                        email
                    }

                }
            }
      `;

        try {
            const result = await m.request({
                method: "POST",
                url: Customer.url,
                body: { query }
            });

            Customer.allCustomers = result.data.getAllCustomers;
        } catch (e) {
            console.log(e);
        }
    }
};


module.exports = Customer;
