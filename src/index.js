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
            if (Auth.isLogin) {
                return m.route.set("/profile");
            }

            return m(Home);
        }
    },

    "/profile": {
        render: () => {
            if (Auth.isLogin) {
                return m(Layout, { nav: "#!/profile" }, m(Profile));
            }

            return m.route.set("/");
        }
    },


    "/payment": {
        render: () => {
            if (Auth.isLogin) {
                return m(Layout, { nav: "#!/payment" }, m(Payment));
            }

            return m.route.set("/");
        }
    },


    "/register": {
        render: () => {
            if (Auth.isLogin) {
                return m(Layout, { nav: "#!/profile" }, m(Profile));
            }

            return m(Register);
        }
    },


    "/logout": {
        render: () => {
            if (Auth.isLogin) {
                Auth.isLogin = false;
                localStorage.clear();
            }

            return m.route.set("/");
        }
    },


    "/history": {
        render: () => {
            if (Auth.isLogin) {
                return m(Layout, { nav: "#!/history" }, m(History));
            }

            return m.route.set("/");
        },
    }
});
