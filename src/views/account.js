/**
 * Account view, the customer can see and change his infomation.
 */

"use strict";

import m from "mithril";

const Account = {
    oninit: function() {
        // load customer's info -> Models
    },

    view: function () {
        // show customer's account info
        return m("h2", "Kontoöversikt");
    },
};


export { Account };
