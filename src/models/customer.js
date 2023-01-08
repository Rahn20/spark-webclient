"use strict";

import m from 'mithril';


const Customer = {
    url: "http://localhost:1337/api/v1/graphql",
    res: "",
    allCustomers: [],

    getCustomer: function() {
        // add to customerData list
    },

    updateCustomer: function() {
    },

    // Get all customers and add customer data to the allCustomers list.
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


export { Customer };
