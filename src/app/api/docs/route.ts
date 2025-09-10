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
              description: "Success",
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
              description: "Error",
              content: {
                "application/json": {
                  examples: {
                    error: {
                      value: { message: "Some error message" },
                    },
                    fallback: {
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
