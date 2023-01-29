/* eslint-disable no-undef */

"use strict";

let m = require('mithril');
let mq = require('mithril-query');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;

// views
const Home = require('../src/views/home');

// models
const Auth = require('../src/models/auth');

chai.should();

describe("Test home view", () => {
    describe("Render the elements", () => {
        it("should render a header and a paragraph inside home div", () => {
            const output  = mq(Home);

            output.should.have("div.home");
            output.should.have("div.home > h1");
            output.should.contain("Välkommen till Spark kundens webbplats");
            output.should.have("div.home > p");
        });

        it("should render a login form inside fieldset", () => {
            const output = mq(Home);

            output.should.have("div.login_content > fieldset");
            output.should.contain("Logga in");
            output.should.have("fieldset > form");
        });

        it("should navigate to register page on click", () => {
            const output = mq(Home);

            output.should.have("div#register_text");
            output.should.contain("Har du inte ett konto, kan du skapa ett konto här:");
            output.should.have("p > a");
            output.should.contain("Registrera dig");
            output.click('a');

            expect(output.has('a[href="#!/register"]')).to.be.true;
        });
    });


    describe("Test login with email and password", () => {
        let request, loginMock;

        beforeEach(() => {
            request = sinon.stub(m, 'request');
            request.resolves({ user: { token: '123', id: 1 } });
            loginMock = sinon.spy(Auth, 'login');
        });

        afterEach(() => {
            loginMock.restore();
            request.restore();
        });


        it("should login user", () => {
            const output = mq(Home);

            output.setValue("input[type='email']", "test@example.com");
            output.setValue("input[type='password']", "password");
            output.trigger('form', 'submit');

            expect(loginMock.calledOnce).to.be.true;
            expect(request.calledOnce).to.be.true;
            expect(Auth.user.email).to.equal("test@example.com");
            expect(Auth.user.password).to.equal("password");
        });
    });


    describe("Test login with Google", () => {
        let googleLoginMock;

        beforeEach(() => {
            googleLoginMock = sinon.stub(Auth, "loginWithGoogle");
        });

        afterEach(() => {
            Auth.loginWithGoogle.restore();
        });


        it("should login customer with Google", () => {
            const output = mq(Home);

            output.should.have("div#google_login > button");
            output.should.contain("Logga in med Google");
            output.click(".btn.btn-secondary");

            assert.isTrue(googleLoginMock.calledOnce);
        });
    });
});
