export class DelayUtil {
	static delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
}
