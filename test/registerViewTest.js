/* eslint-disable no-undef */

"use strict";

let mq = require('mithril-query');
const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;

// views
const Register = require('../src/views/register');

// models
const Auth = require('../src/models/auth');

chai.should();

describe("Test register view", () => {
    let registerMock;

    beforeEach(() => {
        registerMock = sinon.stub(Auth, "register");
        const output  = mq(Register);

        output.setValue("input[name='username']", "username");
        output.setValue("input[name='firstname']", "firstname");
        output.setValue("input[name='lastname']", "lastname");
        output.setValue("input[type='email']", "email@example.com");
        output.setValue("input[type='tel']", "0700000000");
        output.setValue("input[type='password']", "password");
    });

    afterEach(() => {
        Auth.register.restore();
        Auth.registerData = [];
    });

    it("should render a header and a register form", () => {
        const output  = mq(Register);

        output.should.have("h2");
        output.should.contain("Registrera dig här");
        output.should.have("form.register");
    });


    it("should not register a new customer when checkUser returns None", () => {
        const checkMock = sinon.stub(Auth, "checkUser").returns();
        const output = mq(Register);

        output.trigger('form.register', 'submit');

        assert.isTrue(checkMock.calledOnce);
        assert.isFalse(registerMock.calledOnce);

        expect(Auth.registerData["password"]).to.equal("password");
        expect(Auth.registerData["username"]).to.equal("username");
        expect(Auth.registerData["email"]).to.equal("email@example.com");

        // restore
        Auth.checkUser.restore();
    });


    it("should register a new customer when checkUser returns true.", async () => {
        const checkMock = sinon.stub(Auth, "checkUser").resolves(true);
        const output = mq(Register);

        await registerMock();

        output.trigger('form.register', 'submit');

        assert.isTrue(registerMock.calledOnce);
        assert.isTrue(checkMock.calledOnce);

        expect(Auth.registerData["password"]).to.equal("password");
        expect(Auth.registerData["username"]).to.equal("username");
        expect(Auth.registerData["email"]).to.equal("email@example.com");

        // restore
        await Auth.checkUser.restore();
    });
});
