/**
 * Home/index/first page, customer can login and create new account
 */


"use strict";

import m from "mithril";

let home = {
    view: function () {
        return [
            m("h1", "Välkommen till Spark kundens webbplats"),
            m("p", "Här får du en överblick över dina betalningar, historik över dina resor och konto infomation. Du har även möjlighet att ändra betlaningsmetoden, skapa ett konto och fylla på ditt konto med pengar."),
            
            m("div", [
                m("button", m("a", { href: "#!/" }, "Logga in med GitHub")),
                m("button", m("a", { href: "#!/" }, "Logga in med Google")),

                m("h3", "Har du inte ett konto, kan du skapa ett konto här:"),
                m("a", { href: "#!/register" }, "Registrera dig")
            ])
        ]
    },
};

export { home };
