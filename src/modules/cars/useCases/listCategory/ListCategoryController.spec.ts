import { app } from "@shared/infra/http/app";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";

let connection: Connection;

describe("List categories", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license) 
        VALUES 
        ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'AB')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "SUV",
        description: "Cool",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const responseList = await request(app).get("/categories");

    console.log(responseList.body);

    expect(responseList.status).toBe(200);
    expect(responseList.body.length).toBe(1);
  });
});
