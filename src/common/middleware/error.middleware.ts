import { Elysia } from 'elysia'

import { log } from '../../utils'

export const errorMiddleware = new Elysia()
    .onError(({ code, error, set }) => {
        log.error('Application error', {
            code: String(code),
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        })

        if (code === 'VALIDATION') {
            set.status = 400
            return {
                error: 'Validation Error',
                message: error instanceof Error ? error.message : 'Invalid input',
            }
        }

        switch (code) {
            case 'NOT_FOUND':
                set.status = 404
                return {
                    error: 'Not Found',
                    message: 'Resource not found',
                }
            case 'PARSE':
                set.status = 400
                return {
                    error: 'Parse Error',
                    message: 'Invalid request format',
                }
            default:
                set.status = 500
                return {
                    error: 'Internal Server Error',
                    message: 'An unexpected error occurred',
                }
        }
    })
