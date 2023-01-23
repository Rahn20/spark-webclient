/* eslint-disable no-undef */

"use strict";

let mq = require('mithril-query');
const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;

// views
const Payment = require('../src/views/payment');

// models
const Payments = require('../src/models/payment');
const Customer = require('../src/models/customer');


chai.should();

describe("Test payment view", () => {
    let paymentMock, accountMock;

    beforeEach(() => {
        paymentMock = sinon.stub(Payments, "getPayments");
        accountMock = sinon.stub(Customer, "getCustomerAccount");
        Customer.account =  {
            payment_method: "CARD",
            balance: "100.00",
        };

        Payments.allPayments =  [{
            customer_name: "Testing test",
            account_id: "1001",
            payment_method: "CARD",
            total: "20",
            date: "14-01-2023"
        }];
    });

    afterEach(() => {
        Payments.getPayments.restore();
        Customer.getCustomerAccount.restore();
        Customer.account = {};
        Payments.allPayments = [];
    });


    it("should render a header and show an overview of customer account", () => {
        const output  = mq(Payment);

        assert.isTrue(accountMock.calledOnce);

        output.should.have("h2");
        output.should.contain("Betalningar");
        output.should.have("div#payments_info > ul");
        output.should.contain("Betalningsmetod: CARD");
        output.should.contain("Nuvarande saldo: 100.00 kr");
    });



    it("should render a table that shows an overview of customer payments", () => {
        const output  = mq(Payment);

        assert.isTrue(paymentMock.calledOnce);

        output.should.have("table.table > tbody");
        output.should.contain("1");
        output.should.contain("Testing test");
        output.should.contain("1001");
        output.should.contain("CARD");
        output.should.contain("20kr");
        output.should.contain("14-01-2023");
    });

    describe("Test change payment method form", () => {
        let changePaymentMock;

        beforeEach(() => {
            changePaymentMock = sinon.stub(Payments, "changePaymentMethod");
            Payments.paymentMethod = "";
        });

        afterEach(() => {
            Payments.changePaymentMethod.restore();
        });


        it("should change the value of payment method to prepaid", () => {
            const output  = mq(Payment);

            output.should.have("form.payment_method");
            output.setValue("select[name='payment_method']", "Prepaid");
            output.trigger('form.payment_method', 'submit');

            assert.isTrue(changePaymentMock.calledOnce);
            expect(Payments.paymentMethod).to.equal("Prepaid");
        });


        it("should change the value of payment method to CARD", () => {
            const output  = mq(Payment);

            output.should.have("form.payment_method");
            output.setValue("select[name='payment_method']", "CARD");
            output.trigger('form.payment_method', 'submit');

            assert.isTrue(changePaymentMock.calledOnce);
            expect(Payments.paymentMethod).to.equal("CARD");
        });
    });


    describe("Test add money to account form", () => {
        let fillMoneytMock;

        beforeEach(() => {
            fillMoneytMock = sinon.stub(Payments, "fillMoney");
        });

        afterEach(() => {
            Payments.fillMoney.restore();
        });


        it("should call Payments.fillMoney with expected argument onsubmit", () => {
            const output  = mq(Payment);

            output.should.have("form.payment_balance");
            output.setValue("input[type='number']", "10");
            output.trigger('form.payment_balance', "submit");

            let money = parseFloat(Customer.account.balance) + parseFloat(Payments.money);

            expect(Payments.money).to.equal("10");
            expect(money).to.equal(110.00);
            expect(fillMoneytMock.calledOnce).to.be.true;
            expect(fillMoneytMock.calledWith(money.toString())).to.be.true;
        });
    });
});
