module.exports = {
    Building:{
        type:"object",
        properties:{
            buildingName:{
                type:"string",
                description:"Name of building"
            },
            address:{
                type:"string",
                description:"Address of building"
            },
            status:{
                type:"boolean",
                description:"Status of building"
            }
        },
        example:{
            building: {
                buildingName: "Building A",
                address: "123 Main St, Anytown, USA",
                status: true
            }
        }
    }
}