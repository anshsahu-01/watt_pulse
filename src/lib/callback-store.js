import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDirectory = path.join(process.cwd(), "data");
const dataFile = path.join(dataDirectory, "callback-requests.json");

async function readRequests() {
  try {
    const content = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function appendCallbackRequest(request) {
  const requests = await readRequests();
  await mkdir(dataDirectory, { recursive: true });
  requests.push(request);
  await writeFile(dataFile, JSON.stringify(requests, null, 2), "utf8");
}
