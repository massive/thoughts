import { $ } from "bun";

export async function openInObsidian(filePath: string): Promise<void> {
  try {
    // Open the file with Obsidian using the obsidian:// URI scheme
    // This opens the specific file in the vault
    const obsidianUri = `obsidian://open?path=${encodeURIComponent(filePath)}`;
    await $`open "${obsidianUri}"`;

    // Give Obsidian a moment to open, then bring it to foreground
    await new Promise((resolve) => setTimeout(resolve, 500));
    await $`osascript -e 'tell application "Obsidian" to activate'`;

    console.log(`Opened ${filePath} in Obsidian`);
  } catch (error) {
    console.error("Failed to open Obsidian:", error);
    // Fall back to just opening the file with the default app
    try {
      await $`open "${filePath}"`;
    } catch (fallbackError) {
      console.error("Fallback open also failed:", fallbackError);
    }
  }
}
