/**
 * Contains all routes.
 */

"use strict";

const m = require('mithril');

// Navigation/layout
const Layout = require('./views/layout.js');

// view pages
const History = require('./views/history.js');
const Payment = require('./views/payment.js');
const Register = require('./views/register.js');
const Profile = require('./views/profile.js');
const Home = require('./views/home.js');

// models
const Auth = require('./models/auth.js');


m.route(document.body, "/", {
    "/": {
        render: () => {
            if (Auth.authenticated) {
                return m(Layout, { nav: "#!/" }, m(Profile));
            }

            //console.log(localStorage.getItem("id"));
            return m(Home);
        }
    },


    "/payment": {
        render: () => {
            if (Auth.authenticated) {
                return m(Layout, { nav: "#!/payment" }, m(Payment));
            }

            m.route.set('/');
        }
    },


    "/register": {
        render: () => {
            if (Auth.authenticated) {
                return m(Layout, { nav: "#!/" }, m(Profile));
            }

            return m(Register);
        }
    },

    "/logout": {
        render: () => {
            if (Auth.authenticated) {
                Auth.authenticated = false;
            }
            m.route.set('/');
        }
    },

    "/history": {
        render: () => {
            if (Auth.authenticated) {
                return m(Layout, { nav: "#!/history" }, m(History));
            }

            m.route.set('/');
        },
    }
});
