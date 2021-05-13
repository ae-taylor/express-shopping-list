const request = require("supertest");

const app = require("../app")
let db = require("../fakeDb")

let pumpkin = {
  name: "pumpkin",
  price: 1.45
}
let banana = {
  name: "banana",
  price: 1.45
}
//TODO add setup/teardown db.push(pumpkin)

describe("GET /items", function () {
  it("Gets a list of shopping items", async function () {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({
      items: [{
        name: "banana",
        price: 1.45
      }]
    });
  })
})

describe("GET /items/:name", function () {
  it("Gets a single item", async function () {
    const resp = await request(app).get(`/items/banana`);

    expect(resp.body).toEqual({
      name: "banana",
      price: 1.45
    });
  });

  it("Responds with 404 if can't find item", async function () {
    const resp = await request(app).get(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});

describe("POST /items", function () {
  it("Creates a new item", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({
        pumpkin
      });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toInclude({
      pumpkin
    });
  });
});

describe("PATCH /items/:name", function () {
  it("Updates a single item", async function () {
    const resp = await request(app)
      .patch(`/item/banana`)
      .send({
        name: "apple",
        price: 1.28
      });
    expect(resp.body).toEqual({
      name: "apple",
      price: 1.28
    });
  });

  it("Responds with 404 if name invalid", async function () {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});

describe("DELETE /items/:name", function () {
  it("Deletes a single a item", async function () {
    const resp = await request(app)
      .delete(`/items/apple`);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(db.Cat.all().length).toEqual(0);
  });
});