/**
 * History page, the customer can see a history of the trips he made.
 */

"use strict";

import m from "mithril";

const History = {
    oninit: function() {
        // load user's history -> Models
    },

    view: function () {
        // show user's history
        return m("h2", "Historik över resorna");
    },

};


export { History };
