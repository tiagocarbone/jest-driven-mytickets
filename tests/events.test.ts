import httpStatus from "http-status"
import app from "../src/index";
import supertest from "supertest"
import { createNewEventFactory, createNewEventFactoryWithDateInThePast, createNewEventFactoryWithoutDate, createNewEventFactoryWithoutName, createNewEventOnDb } from "../tests/factories/event-factory";
import prisma from "../src/database/index";






const api = supertest(app);

afterEach(async () => {
    await prisma.event.deleteMany();
})

describe("teste post ", () => {
    it("should create an event and return it with status 201", async () => {
        const event = await createNewEventFactory();
        const { status, body } = await api.post("/events").send(event)
        expect(status).toBe(201);
        expect(body).toMatchObject(event)
    })

    it("should return error 422 date in the past", async () => {
        const event = await createNewEventFactoryWithDateInThePast();
        const { status } = await api.post("/events").send(event);
        expect(status).toBe(422)
    })


    it("should return error 422 without date ", async () => {
        const event = await createNewEventFactoryWithoutDate();
        const { status } = await api.post("/events").send(event);
        expect(status).toBe(422)
    })


    it("should return error without name", async () => {
        const event = await createNewEventFactoryWithoutName();
        const { status } = await api.post("/events").send(event);
        expect(status).toBe(422)
    })

    it("should return conflict unique name", async () => {
        const event = await createNewEventFactory();
        await api.post("/events").send(event)
        const { status, body } = await api.post("/events").send(event)
        expect(status).toBe(409);

    })


})


describe("teste get", () => {
    it("should return array length = 2 ", async () => {
        const event1 = await createNewEventFactory();
        await api.post("/events").send(event1);
        const event2 = await createNewEventFactory();
        await api.post("/events").send(event2);

        const { body } = await api.get("/events")
        expect(body).toHaveLength(2);
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    date: expect.any(String)
                })
            ])
        )

    })


    it("should return array length = 0 ", async () => {
        const { body } = await api.get("/events")
        expect(body).toHaveLength(0);

    })
})


describe("teste get/id", () => {
    
    it("should return an event ", async () => {
        const event = await createNewEventOnDb();

        const { body } = await api.get(`/events/${event.id}`)
        expect(body).toEqual({ ...event, date: event.date.toISOString() })

    })

    //400
    it("should return error param not valid", async () => {
        const event = await createNewEventOnDb();

        const { status } = await api.get(`/events/fluminense`)
        expect(status).toEqual(400);
    })

    it("should return error param not valid", async () => {
        const event = await createNewEventOnDb();

        const { status } = await api.get(`/events/0`)
        expect(status).toEqual(400);
    })


    //404
    it("should return error not found", async () => {
        const event = await createNewEventOnDb();

        const { status } = await api.get(`/events/1952`)
        expect(status).toEqual(404);
    })
})



