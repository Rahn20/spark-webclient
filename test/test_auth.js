/* eslint-disable max-len */
/* eslint-disable no-undef */

//const assert = require('assert');
const expect = require('chai').expect;
//const sinon = require('sinon');
//const m = require('mithril');


const Auth = require('../src/models/auth');


describe("Auth model", () => {
    describe("Testing checkUser()", () => {
        before( async () =>  {
            Auth.registerData["email"] = "test@bth.se";
            Auth.registerData["username"] = "test123";
        });

        it('Should return true when email exists and username does not exist', async () => {
            let res = Auth.checkUser([{
                user: {
                    username: "test1",
                    email: "test@bth.se"
                }
            }]);

            expect(res).to.be.true;
        });

        it('Should return true when username exists and email does not exist', async () => {
            let res = Auth.checkUser([{
                user: {
                    username: "test123",
                    email: "test1@bth.se"
                }
            }]);

            expect(res).to.be.true;
        });

        it('Should return true when both username and email exist.', async () => {
            let res = Auth.checkUser([{
                user: {
                    username: "test123",
                    email: "test@bth.se"
                }
            }]);

            expect(res).to.be.true;
        });

        it('Should return false when both username and email do not exist.', async () => {
            let res = Auth.checkUser([{
                user: {
                    username: "test1",
                    email: "test1@bth.se"
                }
            }]);

            expect(res).to.be.false;
        });
    });
});
