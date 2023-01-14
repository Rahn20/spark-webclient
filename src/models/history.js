"use strict";

const m = require('mithril');
const Customer = require('./customer');


const Historys = {
    url: process.env.API_URL,
    historyData: [],

    // get customer log
    getHistory: async () => {
        const query = `
            query($customerId: String!) {
                getLogByCustomerId(customerId: $customerId) {
                    customer_name
                    scooter_id
                    customer_id
                    start_time
                    end_time
                    start_latitude
                    start_longitude
                    end_latitude
                    end_longitude  
                }
            }
        `;

        const variables = {
            customerId: Customer.customer.id
        };


        try {
            const result = await m.request({
                method: "POST",
                url: `${Historys.url}/graphql`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: { query, variables}
            });

            Historys.historyData = result.data.getLogByCustomerId;
        } catch (e) {
            console.log(e);
        }
    },
};


module.exports = Historys;
