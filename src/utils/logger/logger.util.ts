import pino from 'pino'

const isDevelopment = Bun.env.NODE_ENV === 'development' || !Bun.env.NODE_ENV

export const logger = pino({
	level: Bun.env.LOG_LEVEL || 'info',
	transport: isDevelopment
		? {
				target: 'pino-pretty',
				options: {
					colorize: true,
					translateTime: 'HH:MM:ss',
					ignore: 'pid,hostname',
					singleLine: false,
				},
			}
		: undefined,
	formatters: {
		level: label => {
			return { level: label.toUpperCase() }
		},
	},
	timestamp: pino.stdTimeFunctions.isoTime,
})

export const log = {
	info: (message: string, data?: Record<string, any>) => {
		logger.info(data, message)
	},
	warn: (message: string, data?: Record<string, any>) => {
		logger.warn(data, message)
	},
	error: (message: string, error?: Error | Record<string, any>) => {
		if (error instanceof Error) {
			logger.error({ err: error }, message)
		} else {
			logger.error(error, message)
		}
	},
	debug: (message: string, data?: Record<string, any>) => {
		logger.debug(data, message)
	},
	trace: (message: string, data?: Record<string, any>) => {
		logger.trace(data, message)
	},
}
