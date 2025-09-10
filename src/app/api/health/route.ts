export async function GET(request: Request) {
  try {
    const query = Object.fromEntries(new URL(request.url).searchParams)

    console.log(query)

    return Response.json({ message: "OK" }, { status: 200 })
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 404 })
    } else {
      return Response.json({ message: "404" }, { status: 404 })
    }
  }
}
