/**
 * Layout and navigation for all pages when customer is logged in.
 */

"use strict";

import m from "mithril";

let layout = {
    
    // Only displayed when the customer is logged in
    links: [
        { name: "konto", route: "#!/" },
        { name: "Betalningar", route: "#!/payment" },
        { name: "Historik", route: "#!/history" },
    ],

    view: function (vnode) {
        let nav = vnode.attrs.nav;

        return [
            m("h1", "Spark"),
            m("nav.top-nav", layout.links.map(function(link) {
                return m("li", [
                    m("a", {
                        href: link.route,
                        class: nav == link.route ? "active" : null
                    }, link.name)
                ])
            }),
            
            m("p", m("a", { href: "#!/logout" }, "Logga ut"))),

            m("main", vnode.children),

            m("footer", [
                m("p", m.trust("Copyright &copy; Spark 2022")),
            ])
        ];
    },
};

export { layout };
