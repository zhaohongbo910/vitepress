import { createLogger } from 'vite'
export const debugLog = (info: string) => {
  createLogger('info', { prefix: 'debug:info' }).info(info, { timestamp: true })
}
