import { ChildProcessByStdio, spawn } from "child_process"

export async function run_yarn(targetDir: string): Promise<void> {
  const childProcess = spawn("yarn", ["--cwd", targetDir], {
    stdio: [process.stdin, process.stdout, process.stderr],
  })
  const status = await onExit(childProcess)
  if (status !== 0) {
    throw new ProcessError(status)
  }
}

class ProcessError extends Error {
  constructor(public exitStatus: number) {
    super(`process exited with status: ${exitStatus}`)
  }
}

function onExit(
  childProcess: ChildProcessByStdio<null, null, null>,
): Promise<number> {
  return new Promise((resolve, reject) => {
    childProcess.on("close", resolve)
    childProcess.on("error", reject)
  })
}
