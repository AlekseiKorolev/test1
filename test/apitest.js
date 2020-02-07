const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.js");

const { expect } = chai;

chai.use(chaiHttp);

describe("test api", () => {
  describe("test get user by user Id", () => {
    it("return a user (right)", done => {
      const client = {
        id: "a0ece5db-cd14-4f21-812f-966633e7be86",
        name: "Britney",
        email: "britneyblankenship@quotezart.com",
        role: "admin"
      };
      const request = "a0ece5db-cd14-4f21-812f-966633e7be86";
      chai
        .request(app)
        .get(`/api/user/userId/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(client);
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
      chai
        .request(app)
        .get(`/api/user/userId/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.not.deep.equal(client);
          done();
        });
    });
    it("return a user (bad request)", done => {
      const request = "badrequest";
      chai
        .request(app)
        .get(`/api/user/userId/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("test get user by user name", () => {
    it("return a user (right)", done => {
      const client = {
        id: "ac2487f3-af05-40e3-98ea-360482dcf1e0",
        name: "Roberts",
        email: "robertsblankenship@quotezart.com",
        role: "admin"
      };
      const request = "Roberts";
      chai
        .request(app)
        .get(`/api/user/userName/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(client);
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
      chai
        .request(app)
        .get(`/api/user/userName/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.not.deep.equal(client);
          done();
        });
    });
    it("return a user (bad request)", done => {
      const request = "Jimm";
      chai
        .request(app)
        .get(`/api/user/userName/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("test get user by policy number", () => {
    it("return a user who has policies (authorizated user)", done => {
      const client = {
        id: "a0ece5db-cd14-4f21-812f-966633e7be86",
        name: "Britney",
        email: "britneyblankenship@quotezart.com",
        role: "admin"
      };
      const request = "6f514ec4-1726-4628-974d-20afe4da130c";
      chai
        .request(app)
        .get(`/api/user/policyNumber/${request}`)
        .set("user", "Britney")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(client);
          done();
        });
    });
    it("return a user who has policies (authorizated user, bad request)", done => {
      const request = "badrequest";
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
    it("return a user who has policies (authorizated user)", done => {
      const request = "Britney";
      const header = "Britney";
      chai
        .request(app)
        .get(`/api/policies/${request}`)
        .set("user", header)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.lengthOf(102);
          done();
        });
    });
    it("return a user who has policies (authorizated user)", done => {
      const request = "Rochelle";
      const header = "Britney";
      chai
        .request(app)
        .get(`/api/policies/${request}`)
        .set("user", header)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.lengthOf(0);
          done();
        });
    });
    it("return a user who has policies (unauthorizated user, bad request)", done => {
      const request = "Rochelle";
      const header = "Lamb";
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
