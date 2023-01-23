/* eslint-disable no-undef */

"use strict";

let mq = require('mithril-query');
const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;

// views
const UpdateProfile = require('../src/views/updateProfile');

// models
const Customer = require('../src/models/customer');

chai.should();

describe("Test updateprofile view", () => {
    let customerMock;

    beforeEach(() => {
        customerMock = sinon.stub(Customer, "updateCustomer");
        Customer.customer = {
            username: "test1",
            email: "example@bth.se"
        };
    });

    afterEach(() => {
        Customer.updateCustomer.restore();
        Customer.updateProfile = {};
    });

    it("should render a header and an update profile form", () => {
        const output  = mq(UpdateProfile);

        assert.isFalse(customerMock.calledOnce);

        output.should.have("h2");
        output.should.contain("Uppdatera din profil");
        output.should.have("form.update_profile");
    });



    it("should have the customer's username and email address printed in the input field", () => {
        const output  = mq(UpdateProfile);

        assert.isFalse(customerMock.calledOnce);
        output.should.have("input.form-control");
        output.should.have("input#readOnlyInput[name='username'][value='test1']");
        output.should.have("input[name='email'][value='example@bth.se']");
    });


    it("should update the customer profile information", () => {
        const output  = mq(UpdateProfile);

        output.setValue("input[name='firstname']", "firstname");
        output.setValue("input[name='lastname']", "lastname");
        output.setValue("input[type='tel']", "0700000000");
        output.setValue("input[type='password']", "password");
        output.trigger('form.update_profile', 'submit');

        assert.isTrue(customerMock.calledOnce);

        expect(Customer.updateProfile.password).to.equal("password");
        expect(Customer.updateProfile.firstName).to.equal("firstname");
        expect(Customer.updateProfile.lastName).to.equal("lastname");
        expect(Customer.updateProfile.phone).to.equal("0700000000");
    });
});
