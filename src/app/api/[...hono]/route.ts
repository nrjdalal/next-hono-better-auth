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
                "404": {
                  description: "Not found / generic error",
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
                        error: {
                          summary: "Custom error",
                          value: { message: "Some error message" },
                        },
                        fallback: {
                          summary: "Not found",
                          value: { message: "404" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "/api/auth/get-session": {
            get: {
              summary: "Get session",
              description:
                "Returns the current session and user information if authenticated; otherwise returns null.",
              tags: ["Authorization"],
              responses: {
                "200": {
                  description: "Session info or null",
                  content: {
                    "application/json": {
                      schema: {
                        oneOf: [
                          {
                            type: "object",
                            properties: {
                              session: {
                                type: "object",
                                properties: {
                                  expiresAt: { type: "string", format: "date-time" },
                                  token: { type: "string" },
                                  createdAt: {
                                    type: "string",
                                    format: "date-time",
                                  },
                                  updatedAt: {
                                    type: "string",
                                    format: "date-time",
                                  },
                                  ipAddress: { type: "string" },
                                  userAgent: { type: "string" },
                                  userId: { type: "string" },
                                  id: { type: "string" },
                                },
                                required: [
                                  "expiresAt",
                                  "token",
                                  "createdAt",
                                  "updatedAt",
                                  "ipAddress",
                                  "userAgent",
                                  "userId",
                                  "id",
                                ],
                              },
                              user: {
                                type: "object",
                                properties: {
                                  name: { type: "string" },
                                  email: { type: "string", format: "email" },
                                  emailVerified: { type: "boolean" },
                                  image: { type: "string", format: "uri" },
                                  createdAt: {
                                    type: "string",
                                    format: "date-time",
                                  },
                                  updatedAt: {
                                    type: "string",
                                    format: "date-time",
                                  },
                                  id: { type: "string" },
                                },
                                required: [
                                  "name",
                                  "email",
                                  "emailVerified",
                                  "image",
                                  "createdAt",
                                  "updatedAt",
                                  "id",
                                ],
                              },
                            },
                            required: ["session", "user"],
                          },
                          { type: "null" },
                        ],
                      },
                      examples: {
                        authenticated: {
                          summary: "Authenticated",
                          value: {
                            session: {
                              expiresAt: "2025-09-17T21:13:38.056Z",
                              token: "tBigPbR8QS9nPjzKl6zywRSNap5rOXpt",
                              createdAt: "2025-09-10T21:13:38.057Z",
                              updatedAt: "2025-09-10T21:13:38.057Z",
                              ipAddress: "",
                              userAgent:
                                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
                              userId: "x0M37MFmIvTKLzaF95TSTLZaYMz8uRvQ",
                              id: "rZXc0QQJvKncmjXCtU6m3gWR2uw9hy3F",
                            },
                            user: {
                              name: "Neeraj Dalal",
                              email: "nd941z@gmail.com",
                              emailVerified: true,
                              image: "https://avatars.githubusercontent.com/u/58145505?v=4",
                              createdAt: "2025-09-10T21:08:04.654Z",
                              updatedAt: "2025-09-10T21:08:04.654Z",
                              id: "x0M37MFmIvTKLzaF95TSTLZaYMz8uRvQ",
                            },
                          },
                        },
                        unauthenticated: {
                          summary: "Not authenticated",
                          value: null,
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
    }
  }),
)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
