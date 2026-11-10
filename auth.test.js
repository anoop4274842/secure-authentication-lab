const request = require("supertest");
const app = require("../server");

describe("Secure Authentication Tests", () => {
    const email = `test${Date.now()}@example.com`;
    const password = "SecurePass123!";

    test("Register a new user", async () => {
        const res = await request(app)
            .post("/register")
            .send({ email, password });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Registration successful");
    });

    test("Reject duplicate registration", async () => {
        const res = await request(app)
            .post("/register")
            .send({ email, password });

        expect(res.statusCode).toBe(409);
    });

    test("Reject invalid email", async () => {
        const res = await request(app)
            .post("/register")
            .send({ email: "invalid-email", password });

        expect(res.statusCode).toBe(400);
    });

    test("Reject weak password", async () => {
        const res = await request(app)
            .post("/register")
            .send({ email: `weak${Date.now()}@example.com`, password: "123" });

        expect(res.statusCode).toBe(400);
    });

    test("Login and access protected profile", async () => {
        const agent = request.agent(app);

        const login = await agent
            .post("/login")
            .send({ email, password });

        expect(login.statusCode).toBe(200);

        const profile = await agent.get("/profile");

        expect(profile.statusCode).toBe(200);
        expect(profile.body.email).toBe(email);
    });

    test("Reject incorrect password", async () => {
        const res = await request(app)
            .post("/login")
            .send({ email, password: "WrongPassword123!" });

        expect(res.statusCode).toBe(401);
    });

    test("Reject profile access without login", async () => {
        const res = await request(app).get("/profile");

        expect(res.statusCode).toBe(401);
    });
});