export class BadRequestError extends Error {
	status = 400

	constructor(public message: string) {
		super(message)
	}

	toResponse() {
		return Response.json(
			{
				error: this.message,
				code: this.status,
			},
			{
				status: 400,
			},
		)
	}
}
