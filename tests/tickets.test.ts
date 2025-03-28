import httpStatus from "http-status"
import app from "../src/index";
import supertest from "supertest"
import prisma from "../src/database/index";







const api = supertest(app);

afterEach(async () => {
    await prisma.event.deleteMany();
})




describe("teste post ", () => {
    it("should create an ticket and return it with status 201", async () => {
       
    })

   


})



