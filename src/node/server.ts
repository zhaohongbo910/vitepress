import dns from 'dns'
import { createServer as createViteServer, type ServerOptions } from 'vite'
import { resolveConfig } from './config'
import { createVitePressPlugin } from './plugin'
import { debugLog } from './utils/utils'

export async function createServer(
  root: string = process.cwd(),
  serverOptions: ServerOptions & { base?: string } = {},
  recreateServer?: () => Promise<void>
) {
  debugLog('解析项目配置')
  const config = await resolveConfig(root)

  if (serverOptions.base) {
    config.site.base = serverOptions.base
    delete serverOptions.base
  }

  dns.setDefaultResultOrder('verbatim')
  debugLog('创建vite服务')
  return createViteServer({
    root: config.srcDir,
    base: config.site.base,
    cacheDir: config.cacheDir,
    plugins: await createVitePressPlugin(config, false, {}, {}, recreateServer),
    server: serverOptions,
    customLogger: config.logger
  })
}
