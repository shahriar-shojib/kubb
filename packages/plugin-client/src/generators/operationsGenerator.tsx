import { pluginClientName } from '@kubb/plugin-client'
import { createReactGenerator } from '@kubb/plugin-oas'
import { File, useApp } from '@kubb/react'
import { Operations } from '../components/Operations'
import type { PluginClient } from '../types'

export const operationsGenerator = createReactGenerator<PluginClient>({
  name: 'client',
  Operations({ operations }) {
    const {
      pluginManager,
      plugin: {
        options: { output },
      },
    } = useApp<PluginClient>()

    const name = 'operations'
    const file = pluginManager.getFile({ name, extName: '.ts', pluginKey: [pluginClientName] })

    return (
      <File baseName={file.baseName} path={file.path} meta={file.meta} banner={output?.banner} footer={output?.footer}>
        <Operations name={name} operations={operations} />
      </File>
    )
  },
})