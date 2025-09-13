import { Scalar } from "@scalar/hono-api-reference"
import { Hono } from "hono"
import { handle } from "hono/vercel"

import { auth } from "@/lib/auth"

const app = new Hono().basePath("/api")

app.on(["GET", "POST"], "/auth/**", (c) => auth.handler(c.req.raw))
app.get("/health", (c) => c.json({ message: "OK" }))
app.get(
  "/docs",
  Scalar(() => {
    return {
      content: JSON.stringify({
        openapi: "3.1.1",
        info: { title: "Next.js", version: "1.0.0" },
        paths: {
          "/api/health": {
            get: {
              summary: "Health",
              description: "Simple health check for the API.",
              tags: ["System"],
              responses: {
                "200": {
                  description: "Service is healthy",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          message: { type: "string" },
                        },
                        required: ["message"],
                      },
                      examples: {
                        ok: { summary: "Healthy", value: { message: "OK" } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
    }
  }),
)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
