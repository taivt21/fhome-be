const user = require('./user.docs')
const building = require('./building.docs')
module.exports={
    Rooms:{
        type: "object",
        properties: {
            size:{
                type:"nubmer",
                description:"Size of room"
            },
            price:{
                type:"nubmer",
                description:"Price of room"
            },
            description:{
                type:"string",
                description:"more description of room"
            },
            image:{
                type:"string",
                description:"Image of room"
            },
            status:{
                type:"boolean",
                description:"status of room"
            },
            ...building
            ,...user
        },
        example:{
            rooms: {
                size: 25,
                price: 2000,
                description: "This room has a great view of the city",
                image: "https://example.com/images/room.jpg",
                status: true,
                building: "Building A",
                users: "user123"
            }
        }
    }
}