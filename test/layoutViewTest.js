/* eslint-disable no-undef */

"use strict";

let mq = require('mithril-query');
const chai = require('chai');

// views
const Layout = require('../src/views/layout');

chai.should();

describe("Test layout view", () => {
    it("should render header and footer", () => {
        const output  = mq(Layout);

        output.should.have("nav.navbar");
        output.should.have("a.navbar-brand");
        output.should.contain("Spark");

        output.should.have("footer");
        output.should.contain("Spark 2022");
    });


    it("should render a main with an image and a container", () => {
        const output  = mq(Layout);

        output.should.have("main");
        output.should.have("img[src='img/background.png']");
        output.should.have("div.container");
    });

    it("should render the nav with links", () => {
        const output = mq(Layout, {nav: "#!/profile"});

        output.find("a.nav-link").should.have.length(3);

        // Assert that the profile link has class "active"
        output.should.have("a.nav-link.active[href='#!/profile']");

        // other links should not have class "active"
        output.should.not.have("a.nav-link.active[href='#!/payment']");
        output.should.not.have("a.nav-link.active[href='#!/history']");
    });
});
