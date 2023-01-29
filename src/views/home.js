/**
 * Home/index/first page, customer can login and create new account
 */

"use strict";

const m = require("mithril");

const Auth = require("./../models/auth");

const Home = {
    oninit: () => {
        Auth.res = "";
    },

    view: () => {
        return m("div.home", [
            m("h1", "Välkommen till Spark kundens webbplats"),

            m(
                "p",
                "Här får du en överblick över dina betalningar, historik över dina resor och konto infomation. Du kan registrera dig som kund, logga in med email och lösenord eller med Google konto. Du har även möjlighet att ändra betlaningsmetoden och fylla på ditt bankkonto med pengar."
            ),

            m("div.content", [
                m("div.login_content", [
                    m("fieldset", [
                        m("h3", "Logga in"),
                        m("hr"),

                        m(
                            "form",
                            {
                                onsubmit: async (event) => {
                                    event.preventDefault();
                                    await Auth.login();
                                },
                            },
                            [
                                m("p", [
                                    m("label.label#email", "Email"),
                                    m(
                                        "input.input[type=email][required=required]",
                                        {
                                            oninput: (event) => {
                                                Auth.user.email =
                                                    event.target.value;
                                            },
                                            value: Auth.user.email,
                                        }
                                    ),
                                ]),

                                m("p", [
                                    m("label.label#password", "Lösenord"),
                                    m("input.input[type=password][required]", {
                                        oninput: (event) => {
                                            Auth.user.password =
                                                event.target.value;
                                        },
                                        value: Auth.user.password,
                                    }),
                                ]),

                                m(
                                    "div#login",
                                    m(
                                        "button.button btn btn-lg btn-primary[type=submit]",
                                        "Logga in"
                                    )
                                ),
                            ]
                        ),

                        m("p.res", Auth.res),
                    ]),

                    m(
                        "div#google_login",
                        m(
                            "button.btn btn-secondary w-100 [type=submit]",
                            {
                                oncreate: async (vnode) => {
                                    vnode.dom.addEventListener("click", () => {
                                        Auth.loginWithGoogle();
                                    });

                                    if (localStorage.getItem("oauth")) {
                                        localStorage.clear();
                                        await Auth.checkAuth();
                                    }
                                },
                            },
                            "Logga in med Google"
                        )
                    ),
                ]),

                m("div#register_text", [
                    m(
                        "h4",
                        "Har du inte ett konto, kan du skapa ett konto här:"
                    ),
                    m("p", m("a", { href: "#!/register" }, "Registrera dig")),
                ]),
            ]),
        ]);
    },
};

module.exports = Home;
