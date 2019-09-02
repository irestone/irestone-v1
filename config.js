const env = (varName) => {
  if (process.env[varName] === undefined) {
    throw new Error(`Environmental variable "${varName}" has not been set.`)
  }

  return process.env[varName]
}

export const DBCredentials = {
  host: env('DB_HOST'),
  port: env('DB_PORT'),
  name: env('DB_NAME'),
  user: env('DB_USER'),
  pass: env('DB_PASS'),
}

export const port = env('PORT')
