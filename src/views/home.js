/**
 * Home/index/first page, customer can login and create new account
 */


"use strict";

import m from "mithril";
import { Auth } from "../models/auth";


const Home = {
    view: function () {
        return m("div.home", [
            m("h1", "Välkommen till Spark kundens webbplats"),

            // eslint-disable-next-line max-len
            m("p", "Här får du en överblick över dina betalningar, historik över dina resor och konto infomation. Du har även möjlighet att ändra betlaningsmetoden, skapa ett konto och fylla på ditt konto med pengar."),

            m("div.content", [
                m("fieldset", [
                    m("h3", "Logga in"),
                    m("form", {
                        onsubmit: (event) => {
                            event.preventDefault();
                            Auth.login();
                        }
                    },
                    [
                        m("p", [
                            m("label.label#email", "Email"),
                            m("input.input[type=email][required=required]", {
                                oninput: (event) => {
                                    Auth.user.email = event.target.value;
                                }, value: Auth.user.email
                            })
                        ]),
                        m("p", [
                            m("label.label#password", "Lösenord"),
                            m("input.input[type=password][required]", {
                                oninput: (event) => {
                                    Auth.user.password = event.target.value;
                                }, value: Auth.user.password
                            })
                        ]),
                        m("div#login", m("button.button[type=submit]", "Logga in")),
                    ]),

                    m("p", Auth.res)
                ]),

                m("p", m("a", { href: "#!/" }, "Logga in med GitHub")),
                m("p", m("a", { href: "#!/" }, "Logga in med Google")),

                m("h3", "Har du inte ett konto, kan du skapa ett konto här:"),
                m("p", m("a", { href: "#!/register" }, "Registrera dig"))
            ])
        ]);
    },
};

export { Home };
