/**
 * Contains all routes 
 */

"use strict";

import m from "mithril";

// Navigation/layout
import { layout } from "./views/layout.js";

// view pages
import { history } from "./views/history.js";
import { payment } from "./views/payment.js";
import { register } from "./views/register.js";
import { account } from "./views/account.js";
import { home } from "./views/home.js";

// models
import { auth } from "./models/auth.js";


m.route(document.body, "/", {
    "/": {
        render: function() {
            if (auth.authenticated == true) {
                return m(layout, { nav: "#!/" }, m(account));
            }

            return m(home);
        }
    },


    "/payment": {
        render: function() {
            if (auth.authenticated == true) {
                return m(layout, { nav: "#!/payment" }, m(payment));
            }

            m.route.set('/')
        }
    },


    "/register": {
        render: function() {
            if (auth.authenticated == true) {
                return m(layout, { nav: "#!/" }, m(account));
            }

            return m(register);
        }
    },

    "/logout": {
        render: function() {
            if (auth.authenticated == true) {
                auth.authenticated = false
            }

            m.route.set('/')
        }
    },

    "/history": {
        render: function() {
            if (auth.authenticated == true) {
                return m(layout, { nav: "#!/history" }, m(history));
            }

            m.route.set('/')
        },
    }
});
