/**
 * Interface for options to pass to the spawn function.
 * @property {string | URL | undefined} cwd - The current working directory of the child process.
 * @property {boolean | string | undefined} shell - If true, runs command inside of a shell. Uses '/bin/sh' on Unix, and process.env.ComSpec on Windows. A different shell can be specified as a string.
 */
interface SpawnOptions {
  cwd?: string | URL | undefined
  shell?: boolean | string | undefined
}

/**
 * Spawns a new process using the given command, with command line arguments in args. If the args parameter is omitted, then it is assumed to be an empty array.
 * @param {string} command - The command to run.
 * @param {string[]} args - List of string arguments.
 * @param {SpawnOptions} options - The options used to spawn the process.
 * @returns {Promise<void>} A promise that resolves when the process has finished.
 */
function spawn(command: string, args?: any, options?: SpawnOptions): Promise<void> {
  return global.core.api?.spawnProcess(command, args, options)
}

/** Function to execute a command with sudo privileges
 * @param {string} command - The command to run.
 * @param {string[]} args - List of string arguments.
 * @returns {Promise<void>} A promise that resolves when the execution has finished.
 */
function sudoExec(command: string, args?: any): Promise<void> {
  return global.core.api?.sudoExec(command, args)
}

export const process = {
  spawn,
  sudoExec,
}