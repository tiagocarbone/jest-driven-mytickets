import httpStatus from "http-status"
import app from "../src/index";
import supertest from "supertest"


const api = supertest(app);

describe("teste health", () => {
    it("should return  http ok + message", async () => {
        const { status, text } = await api.get("/health");
        const result = await api.get("/health");
        console.log(result)
        expect(status).toBe(200);
        expect(text).toBe("I'm okay!")
    })
})