import net from "node:net";

export function parsePreferredPort(value, fallback) {
  if (value == null || value === "") return fallback;
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid port: ${value}`);
  }
  return port;
}

export function canListen(port, host = "127.0.0.1") {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once("error", () => resolve(false));
    server.listen({ host, port, exclusive: true }, () => {
      server.close(() => resolve(true));
    });
  });
}

export async function findAvailablePort(startPort, {
  excluded = new Set(),
  isAvailable = canListen,
  attempts = 200,
} = {}) {
  for (let offset = 0; offset < attempts; offset += 1) {
    const port = startPort + offset;
    if (port > 65535) break;
    if (!excluded.has(port) && await isAvailable(port)) return port;
  }
  throw new Error(`No available port found from ${startPort}`);
}
