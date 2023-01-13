/**
 * History page, the customer can see a history of the trips he made.
 */

"use strict";

const m = require('mithril');
const Historys = require('./../models/history');


const History = {
    oninit: () => {
        Historys.getHistory();
    },

    view: () => {
        let count = 1;

        return [
            m("h2", "Kund Historik"),
            m("hr"),

            m("table.table table-hover", [
                m("thead", [
                    m("tr.table-primary", [
                        m("th", { scope: "col" }, "Nr"),
                        m("th", { scope: "col" }, "Sparkcykel id"),
                        m("th", { scope: "col" }, "Starttid"),
                        m("th", { scope: "col" }, "Sluttid"),
                        m("th", { scope: "col" }, "Start position"),
                        m("th", { scope: "col" }, "Slut position")
                    ]),
                ]),

                m("tbody", [
                    Historys.historyData.map((res) => {
                        return m("tr.table-active", [
                            m("td", count++),
                            m("td", res.scooter_id),
                            m("td", res.start_time),
                            m("td", res.end_time),
                            m("td", res.start_latitude + ", " + res.start_longitude),
                            m("td", res.end_latitude + ", " + res.end_longitude),
                        ]);
                    })
                ])
            ])
        ];
    },

};


module.exports = History;
