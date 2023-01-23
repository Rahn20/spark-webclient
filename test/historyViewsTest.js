/* eslint-disable no-undef */

"use strict";

let mq = require('mithril-query');
const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

// views
const History = require('../src/views/history');

// models
const Historys = require('../src/models/history');

chai.should();

describe("Test history view", () => {
    let historyMock;

    beforeEach(() => {
        historyMock = sinon.stub(Historys, "getHistory");
        Historys.historyData = [
            {
                scooter_id: "1",
                start_time: "2012-12-23 13:12",
                end_time: "2012-12-23 13:10",
                start_latitude: "59.23232",
                start_longitude: "17.323232",
                end_latitude: "58.323232",
                end_longitude: "18.323232",
            }
        ];
    });

    afterEach(() => {
        Historys.getHistory.restore();
        Historys.historyData = [];
    });

    it("should render a header and a table", () => {
        const output  = mq(History);

        assert.isTrue(historyMock.calledOnce);
        output.should.have("h2");
        output.should.contain("Kund Historik");
        output.should.have("table");
    });

    it("should render a table with history data", () => {
        const output  = mq(History);

        output.should.have("table > tbody");
        output.should.contain("1");
        output.should.contain("2012-12-23 13:12");
        output.should.contain("2012-12-23 13:10");
        output.should.contain("59.23232, 17.323232");
        output.should.contain("58.323232, 18.323232");
    });
});
