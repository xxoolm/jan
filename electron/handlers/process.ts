import { ipcMain } from 'electron'
import { ProcessRoute } from '@janhq/core'
import { spawn, exec } from 'child_process'
import process from 'process'
import isElevated from 'native-is-elevated'

import sudoPrompt from '@vscode/sudo-prompt'

export function handleProcessIPCs() {
  ipcMain.handle(ProcessRoute.spawn, (events, command, args) => {
    spawn(command, { ...args })
  })

  ipcMain.handle(ProcessRoute.sudoExec, (events, command, args) => {
    // Under admin, run without requesting

    let isAdmin: boolean
    if (process.platform === 'win32') {
      isAdmin = isElevated()
    } else {
      isAdmin = process?.getuid?.() === 0
    }
    console.log(isAdmin)

    if (isAdmin) {
      console.log('running under root already')
      exec(command)
      return
    }

    // Under user, request sudo
    sudoPrompt.exec(
      command,
      args,
      function (error: any, stdout: any, stderr: any) {
        console.log('request permission and run')
        if (error) console.error(error)
        else {
          if (stdout) console.log('stdout: ' + stdout)
          if (stderr) console.log('stderr: ' + stderr)
        }
      }
    )
  })
}
