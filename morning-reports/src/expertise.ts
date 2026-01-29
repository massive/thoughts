import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";

const EXPERTISE_PATH = join(dirname(import.meta.dir), "expertise.md");

export async function loadExpertise(): Promise<string> {
  try {
    return await readFile(EXPERTISE_PATH, "utf-8");
  } catch (error) {
    console.error("Failed to load expertise profile:", error);
    return "";
  }
}
