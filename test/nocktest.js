const nock = require("nock");
const chai = require("chai");
const chaiNock = require("chai-nock");

const { userURL, policyURL } = require("../config/config");
const app = require("../index.js");

const { expect } = chai;

chai.use(chaiNock);

describe("test api ISOLATED", () => {
  describe("test get user by user Id", () => {
    afterEach(() => nock.cleanAll());
    it("return a user (right)", done => {
      const client = {
        id: "a0ece5db-cd14-4f21-812f-966633e7be86",
        name: "Britney",
        email: "britneyblankenship@quotezart.com",
        role: "admin"
      };
      const request = "a0ece5db-cd14-4f21-812f-966633e7be86";
      nock(userURL)
        .get(`/api/user/userId/${request}`)
        .reply(200);
      chai
        .request(app)
        .get(`/api/user/userId/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(JSON.parse(res.text)).to.deep.equal(client);
          done();
        });
    });
    it("return a user (wrong)", done => {
      const client = {
        id: "a0ece5db-cd14-4f21-812f-966633e7be86",
        name: "Britney",
        email: "britneyblankenship@quotezart.com",
        role: "admin"
      };
      const request = "e8fd159b-57c4-4d36-9bd7-a59ca13057bb";
      nock(userURL)
        .get(`/api/user/userId/${request}`)
        .reply(200, client);
      chai
        .request(app)
        .get(`/api/user/userId/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(JSON.parse(res.text)).to.not.deep.equal(client);
          done();
        });
    });
    it("return a user (bad request)", done => {
      const request = "badrequest";
      nock(userURL)
        .get(`/api/user/userId/${request}`)
        .reply(400);
      chai
        .request(app)
        .get(`/api/user/userId/${request}`)
        .end((err, res) => {
          expect(res.text).to.equal("Bad request");
          done();
        });
    });
  });

  describe("test get user by user name", () => {
    afterEach(() => nock.cleanAll());
    it("return a user (right)", done => {
      const client = {
        id: "ac2487f3-af05-40e3-98ea-360482dcf1e0",
        name: "Roberts",
        email: "robertsblankenship@quotezart.com",
        role: "admin"
      };
      const request = "Roberts";
      nock(userURL)
        .get(`/api/user/userName/${request}`)
        .reply(200, client);
      chai
        .request(app)
        .get(`/api/user/userName/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(JSON.parse(res.text)).to.deep.equal(client);
          done();
        });
    });
    it("return a user (wrong)", done => {
      const client = {
        id: "a0ece5db-cd14-4f21-812f-966633e7be86",
        name: "Britney",
        email: "britneyblankenship@quotezart.com",
        role: "admin"
      };
      const request = "Patsy";
      nock(userURL)
        .get(`/api/user/userName/${request}`)
        .reply(200, client);
      chai
        .request(app)
        .get(`/api/user/userName/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(JSON.parse(res.text)).to.not.deep.equal(client);
          done();
        });
    });
    it("return a user (bad request)", done => {
      const request = "Jimm";
      nock(userURL)
        .get(`/api/user/userName/${request}`)
        .reply(400);
      chai
        .request(app)
        .get(`/api/user/userName/${request}`)
        .end((err, res) => {
          expect(res.text).to.equal("Bad request");
          done();
        });
    });
  });

  describe("test get user by policy number", () => {
    afterEach(() => nock.cleanAll());
    it("return a user who has policies (authorizated user)", done => {
      const client = {
        id: "a0ece5db-cd14-4f21-812f-966633e7be86",
        name: "Britney",
        email: "britneyblankenship@quotezart.com",
        role: "admin"
      };
      const request = "6f514ec4-1726-4628-974d-20afe4da130c";
      nock(policyURL, { allowUnmocked: true })
        .get(`/api/user/policyNumber/${request}`)
        .reply(200, client);
      nock(userURL)
        .get(`/`)
        .reply(200);
      chai
        .request(app)
        .get(`/api/user/policyNumber/${request}`)
        .set("user", "Britney")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(JSON.parse(res.text)).to.deep.equal(client);
          done();
        });
    });
    it("return a user who has policies (authorizated user, bad request)", done => {
      const request = "badrequest";
      nock(policyURL, { allowUnmocked: true })
        .get(`/api/user/policyNumber/${request}`)
        .reply(400);
      chai
        .request(app)
        .get(`/api/user/policyNumber/${request}`)
        .set("user", "Britney")
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("test get list of policies by user name", () => {
    afterEach(() => nock.cleanAll());
    it("return a user who has policies (authorizated user)", done => {
      const request = "Britney";
      const header = "Britney";
      nock(policyURL, { allowUnmocked: true })
        .get(`/api/policies/${request}`)
        .reply(200);
      chai
        .request(app)
        .get(`/api/policies/${request}`)
        .set("user", header)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it("return a user who has policies (authorizated user)", done => {
      const request = "Rochelle";
      const header = "Britney";
      nock(policyURL, { allowUnmocked: true })
        .get(`/api/policies/${request}`)
        .reply(200);
      chai
        .request(app)
        .get(`/api/policies/${request}`)
        .set("user", header)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it("return a user who has policies (unauthorizated user, bad request)", done => {
      const request = "Rochelle";
      const header = "Lamb";
      nock(policyURL, { allowUnmocked: true })
        .get(`/api/policies/${request}`)
        .reply(403);
      chai
        .request(app)
        .get(`/api/policies/${request}`)
        .set("user", header)
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
  });
});
