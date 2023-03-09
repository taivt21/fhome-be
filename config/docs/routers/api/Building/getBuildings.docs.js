module.exports = {
  get: {
    tags: ["Users"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    summary: "Get a Building by ID",
    description: "Returns a single Building object by ID",
    parameters: {
      name: "buildingId",
      in: path,
      description: "ID of the Building to return",
      required: true,
      type: "string",
      example: "123",
    },
    responses: {
      200: {
        description: "Building retrieved successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                buildingName: {
                  type: "string",
                  example: "Name of building",
                },
                address: {
                  type: "string",
                  example: "Address of building",
                },
                status: {
                  type: "boolean",
                  example: "Status of building",
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
                  example: "Not found any building of list",
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
