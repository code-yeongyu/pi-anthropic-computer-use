import { afterEach, describe, expect, it, vi } from "vitest";
import { createLinuxComputerOps, createMacOSComputerOps } from "../src/index.js";

type CommandCall = {
	command: string;
	args: string[];
};

type ExecFileCallback = (error: Error | null, stdout: string, stderr: string) => void;

const execFileState = vi.hoisted((): { calls: CommandCall[] } => ({ calls: [] }));

vi.mock("node:child_process", () => ({
	execFile: (command: string, args: string[], callback: ExecFileCallback): undefined => {
		execFileState.calls.push({ command, args });
		callback(null, "", "");
		return undefined;
	},
}));

afterEach(() => {
	execFileState.calls.length = 0;
});

describe("platform computer operations", () => {
	it("maps macOS click buttons to existing cliclick commands", async () => {
		const ops = createMacOSComputerOps();

		await ops.click("left");
		await ops.click("right");
		await ops.click("middle");

		expect(execFileState.calls).toEqual([
			{ command: "cliclick", args: ["c:."] },
			{ command: "cliclick", args: ["rc:."] },
			{ command: "cliclick", args: ["mc:."] },
		]);
	});

	it("maps macOS scroll directions to existing inverted cliclick wheel commands", async () => {
		const ops = createMacOSComputerOps();

		await ops.scroll("up", 2);
		await ops.scroll("down", 2);
		await ops.scroll("left", 2);
		await ops.scroll("right", 2);

		expect(execFileState.calls).toEqual([
			{ command: "cliclick", args: ["wd:2"] },
			{ command: "cliclick", args: ["wu:2"] },
			{ command: "cliclick", args: ["wl:2"] },
			{ command: "cliclick", args: ["wr:2"] },
		]);
	});

	it("maps Linux scroll directions to existing xdotool buttons", async () => {
		const ops = createLinuxComputerOps();

		await ops.scroll("up", 2);
		await ops.scroll("down", 2);
		await ops.scroll("left", 2);
		await ops.scroll("right", 2);

		expect(execFileState.calls).toEqual([
			{ command: "xdotool", args: ["click", "--repeat", "2", "4"] },
			{ command: "xdotool", args: ["click", "--repeat", "2", "5"] },
			{ command: "xdotool", args: ["click", "--repeat", "2", "6"] },
			{ command: "xdotool", args: ["click", "--repeat", "2", "7"] },
		]);
	});
});
