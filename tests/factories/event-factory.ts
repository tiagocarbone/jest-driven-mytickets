import prisma from "../../src/database/index";
import {faker} from "@faker-js/faker"


export async function createNewEventFactory(){
    const event = {
        name: faker.person.fullName(),
        date: faker.date.future().toISOString()
    }
     
    return event;
}


export async function createNewEventFactoryWithDateInThePast(){
    const event = {
        name: faker.person.fullName(),
        date: faker.date.past().toISOString()
    }
     
    return event;
}

export async function createNewEventFactoryWithoutDate(){
    const event = {
        name: faker.person.fullName()
    }
     
    return event;
}

export async function createNewEventFactoryWithoutName(){
    const event = {
        date: faker.date.past().toISOString()
    }
     
    return event;
}