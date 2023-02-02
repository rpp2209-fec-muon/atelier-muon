const request = require("supertest");

const app = require("../server/index.js");


describe("Products Test", () => {
  test("GET /products", (done) => {
    request(app)
      .get("/products")
      .expect("Content-Type", /json/)
      .query({ type: '', product_id: '', params: {} })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /products/product_id", (done) => {
    request(app)
      .get("/products")
      .expect("Content-Type", /json/)
      .query( { type: '', product_id: '/71697', params: {} })
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(71697);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /products/product_id/styles", (done) => {
    request(app)
      .get("/products")
      .expect("Content-Type", /json/)
      .query( { type: '/styles', product_id: '/71697', params: {} })
      .expect(200)
      .expect((res) => {
        expect(res.body.product_id).toBe("71697");
        expect(res.body.results.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /products/product_id/related", (done) => {
    request(app)
      .get("/products")
      .expect("Content-Type", /json/)
      .query( { type: '/related', product_id: '/71697', params: {} })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("Reviews Test", () => {
  test("GET /reviews", (done) => {
    request(app)
      .get("/reviews")
      .expect("Content-Type", /json/)
      .query({ type: '', params: {
        product_id: 71697
      }})
      .expect(200)
      .expect((res) => {
        expect(res.body.product).toBe("71697");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /reviews/meta", (done) => {
    request(app)
      .get("/reviews")
      .expect("Content-Type", /json/)
      .query({ type: '/meta', params: {
        product_id: 71697
      }})
      .expect(200)
      .expect((res) => {
        expect(res.body.product_id).toBe("71697");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

