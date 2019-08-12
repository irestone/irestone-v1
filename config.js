const isDefined = (...values) => values.every((v) => v !== undefined)

const errNoVar = (varName) => {
  throw new Error(`Environmental variable ${varName} has not been set.`)
}

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env
if (!isDefined(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS))
  errNoVar('(DB_HOST | DB_PORT | DB_NAME | DB_USER | DB_PASS)')

export const db = {
  host: DB_HOST,
  port: DB_PORT,
  name: DB_NAME,
  user: DB_USER,
  pass: DB_PASS,
}

export const dbURI = `mongodb://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}`
