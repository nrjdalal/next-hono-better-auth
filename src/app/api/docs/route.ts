import { ApiReference } from "@scalar/nextjs-api-reference"

export const GET = ApiReference({
  content: JSON.stringify({
    openapi: "3.1.1",
    info: { title: "Next.js", version: "1.0.0" },
    paths: {
      "/api/health": {
        get: {
          summary: "Health",
          responses: {
            "200": {
              description: "Successful request",
              content: {
                "application/json": {
                  examples: {
                    success: {
                      value: { message: "OK" },
                    },
                  },
                },
              },
            },
            "404": {
              description: "Not Found / Error occurred",
              content: {
                "application/json": {
                  examples: {
                    errorWithMessage: {
                      value: { message: "Some error message" },
                    },
                    genericError: {
                      value: { message: "404" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }),
})
