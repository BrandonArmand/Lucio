const request = require("request");
const server = require("../../src/server");
const base = `http://localhost:${server.port}/api/pet`;

describe("routes : pet", () => {
  describe("GET /api/pet", () => {
    it("should return a status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("GET /pet/new", () => {
    it("should render a new pet api", (done) => {
      request.get(`${base}/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Topic");
        done();
      });
    });
  });
});