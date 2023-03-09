module.exports = {
  get: {
    tags: ["Posting"],
    summary: "Get all postings",
    description: "Returns all postings",
    produces: "application/json",
    responses: {
      200: {
        description: "Get all posting successful",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "Success",
                },
                messages: {
                  type: "string",
                  example: "Get all successfully!",
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      Id: {
                        type: "string",
                        description: "the id of the post",
                      },
                      Title: {
                        type: "string",
                        description: "the title of the post",
                      },
                      Description: {
                        type: "string",
                        description: "the description of the post",
                      },
                      building: {
                        type: "string",
                        description: "the building of the room",
                      },
                      roomtype: {
                        type: "string",
                        description: "the type of the room",
                      },
                      userPosting: {
                        type: "string",
                        description: "the id of the user post",
                      },
                      Image: {
                        type: "string",
                        description: "the images url of the this post",
                      },
                      status: {
                        type: "boolean",
                        description: "Show status of room",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      400: {
        description: "Bad request",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Bad request",
                },
              },
            },
          },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Unauthorized",
                },
              },
            },
          },
        },
      },
      403: {
        description: "Forbidden",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Forbidden",
                },
              },
            },
          },
        },
      },
      404: {
        description: "Not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Not found any post of list",
                },
              },
            },
          },
        },
      },
      500: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Internal server error",
                },
              },
            },
          },
        },
      },
    },
  },
};
