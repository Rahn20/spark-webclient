/**
 * Layout and navigation for all pages when customer is logged in.
 */

"use strict";

const m = require('mithril');

const Layout = {

    // Only displayed when the customer is logged in
    links: [
        { name: "konto", route: "#!/" },
        { name: "Betalningar", route: "#!/payment" },
        { name: "Historik", route: "#!/history" },
    ],

    view: (vnode) => {
        let nav = vnode.attrs.nav;

        return [
            m("nav.navbar navbar-expand-lg navbar-dark bg-primary", [
                m("div.container-fluid", [
                    m("a.navbar-brand", "Spark"),

                    m("div.navbar-collapse", [
                        m("ul.navbar-nav me-auto", Layout.links.map(function(link) {
                            return m("li.nav-item", [
                                m("a.nav-link", {
                                    href: link.route,
                                    class: nav == link.route ? "active" : null
                                }, link.name)
                            ]);
                        })),

                        m("div.d-flex", m("a.btn btn-secondary my-2 my-sm-0", { href: "#!/logout" }, "Logga ut")),
                    ]),
                ])
            ]),

            m("main", [
                m("img#startimage", { src: "img/background.png" }),
                m("div.container", vnode.children),
            ]),

            m("footer#footer", [
                m("p", m.trust("Copyright &copy; Spark 2022")),
            ])
        ];
    },
};

module.exports = Layout;
