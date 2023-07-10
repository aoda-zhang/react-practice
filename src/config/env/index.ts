const currentEnv = process.env?.NODE_ENV ?? 'develop'
// eslint-disable-next-line @typescript-eslint/no-var-requires
interface envType {
  baseURL: string
  commonErrorMessage: string
  welcomeMessage: string
  auth: {
    inputAuthCode: string
    authCode: string
    noAuthMessage: string
  }
  inputAuthCode: string
  colorPrimary: string
  authCode: string
  noAuthMessage: string
  backendBaseURL: string
}
const envConfig: envType = require(`./${currentEnv}`)
export default envConfig
