module.exports={
    Posting:{
        type: "object",
        properties: {
            Title:{
                type:"string",
                description: "the title of the post"
            },
            Description:{
                type:"string",
                description:"the description of the post"
            },
            building:{
                type:"string",
                description:"the building of the room"
            },
            roomtype:{
                type:"string",
                description:"the type of the room"
            },
            userPosting:{
                type:"string",
                description:"the id of the user post"
            },
            Image:{
                type:"string",
                description: "the images url of the this post"
            },
            status:{
                type:"boolean",
                description:"Show status of room"
            }
        },
        example:
              {title: "Apartment for rent",
              description: "Beautiful apartment for rent in the city center",
              status: true,
              buildings: "614c6f9a0cbf8418a86077b2",
              rooms: "614c6f9a0cbf8418a86077b3",
              userPosting: "614c6f9a0cbf8418a86077b4",
              img: "https://example.com/images/apartment.jpg"
            }
    }
}