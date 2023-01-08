/**
 * Contains all routes
 */

"use strict";

import m from "mithril";

// Navigation/layout
import { Layout } from "./views/layout.js";

// view pages
import { History } from "./views/history.js";
import { Payment } from "./views/payment.js";
import { Register } from "./views/register.js";
import { Account } from "./views/account.js";
import { Home } from "./views/home.js";

// models
import { Auth } from "./models/auth.js";


m.route(document.body, "/", {
    "/": {
        render: function() {
            if (Auth.authenticated == true) {
                return m(Layout, { nav: "#!/" }, m(Account));
            }

            return m(Home);
        }
    },

    "/payment": {
        render: function() {
            if (Auth.authenticated == true) {
                return m(Layout, { nav: "#!/payment" }, m(Payment));
            }

            m.route.set('/');
        }
    },


    "/register": {
        render: function() {
            if (Auth.authenticated == true) {
                return m(Layout, { nav: "#!/" }, m(Account));
            }

            return m(Register);
        }
    },

    "/logout": {
        render: function() {
            if (Auth.authenticated == true) {
                Auth.authenticated = false;
            }

            m.route.set('/');
        }
    },

    "/history": {
        render: function() {
            if (Auth.authenticated == true) {
                return m(Layout, { nav: "#!/history" }, m(History));
            }

            m.route.set('/');
        },
    }
});
