// Cross-platform dev launcher: starts the Gemini API server (port 3002) and Vite frontend (port 3001) together.
import { spawn } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const viteBin = resolve(rootDir, 'node_modules', 'vite', 'bin', 'vite.js');

const apiServer = spawn(process.execPath, ['server.js'], {
  cwd: rootDir,
  stdio: 'inherit',
  env: { ...process.env, API_PORT: process.env.API_PORT || '3002' },
});

const viteServer = spawn(process.execPath, [viteBin], {
  cwd: rootDir,
  stdio: 'inherit',
  env: process.env,
});

function shutdown(signal) {
  if (!apiServer.killed) apiServer.kill(signal);
  if (!viteServer.killed) viteServer.kill(signal);
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

apiServer.on('exit', (code) => {
  if (code !== null && code !== 0) {
    console.error(`API server exited with code ${code}`);
    shutdown('SIGTERM');
  }
});

viteServer.on('exit', (code) => {
  if (code !== null && code !== 0) {
    console.error(`Vite server exited with code ${code}`);
    shutdown('SIGTERM');
  }
});
