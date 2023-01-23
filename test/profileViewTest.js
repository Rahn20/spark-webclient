/* eslint-disable no-undef */

"use strict";

let mq = require('mithril-query');
const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;

// views
const Profile = require('../src/views/profile');

// models
const Customer = require('../src/models/customer');

chai.should();

describe("Test profile view", () => {
    let customerMock;

    beforeEach(() => {
        customerMock = sinon.stub(Customer, "getCustomer");
        sinon.stub(Customer, "getCustomerAccount");
        Customer.account =  {
            payment_method: "CARD",
            balance: "100.00",
        };

        Customer.customer =  {
            username: "test1",
            first_name: "Test",
            last_name: "Testing",
            email: "test@example.com",
            phone: "0700000000"
        };
    });

    afterEach(() => {
        Customer.getCustomer.restore();
        Customer.getCustomerAccount.restore();
        Customer.account = {};
        Customer.customer = {};
    });

    it("should render a header and a list of customer information", () => {
        const output  = mq(Profile);

        output.should.have("h2");
        output.should.contain("Kund profil");
        output.should.have("div.profile > ul");
        output.should.contain("Användarnamn: test1");
        output.should.contain("Namn: Test Testing");
        output.should.contain("Mailadress: test@example.com");
        output.should.contain("Mobilnummer: 0700000000");
    });

    it("should render a list of customer account information", async () => {
        const output  = mq(Profile);

        assert.isTrue(customerMock.calledOnce);

        output.should.have("div.account > ul");
        output.should.contain("Betalningsmetod: CARD");
        output.should.contain("Saldot på konto: 100.00 kr");
    });

    it("should navigate to the update profile page on click", () => {
        const output  = mq(Profile);

        output.should.have("button.btn > a");
        output.should.contain("Uppdatera din profil");
        output.click('.btn-info');

        expect(output.has('a[href="#!/update_profile"]')).to.be.true;
    });
});
