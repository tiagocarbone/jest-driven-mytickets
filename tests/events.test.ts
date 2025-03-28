import httpStatus from "http-status"
import app from "../src/index";
import supertest from "supertest"
import { createNewEventFactory, createNewEventFactoryWithDateInThePast, createNewEventFactoryWithoutDate, createNewEventFactoryWithoutName } from "../tests/factories/event-factory";
import prisma from "../src/database/index";




const api = supertest(app);

afterEach( async () =>{
    await prisma.event.deleteMany();
})

describe("teste post ", () => {
    it("should create an event and return it with status 201", async () => {
        const event = await  createNewEventFactory();
        const { status, body } = await api.post("/events").send(event)
        expect(status).toBe(201);
        expect(body).toMatchObject(event)
    })

    it("should return error 422 date in the past", async () => {
        const event = await createNewEventFactoryWithDateInThePast();
        const {status} = await api.post("/events").send(event);
        expect(status).toBe(422)
    })

    
    it("should return error 422 without date ", async () => {
        const event = await createNewEventFactoryWithoutDate();
        const {status} = await api.post("/events").send(event);
        expect(status).toBe(422)
    })

    
    it("should return error without name", async () => {
        const event = await createNewEventFactoryWithoutName();
        const {status} = await api.post("/events").send(event);
        expect(status).toBe(422)
    })

    it("should return conflict unique name", async () => {
        const event = await  createNewEventFactory();
        await api.post("/events").send(event)
        const { status, body } = await api.post("/events").send(event)
        expect(status).toBe(409);

    })


})


describe ("teste get", () => {
    
})