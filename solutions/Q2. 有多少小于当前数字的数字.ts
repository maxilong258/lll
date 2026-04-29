function smallerNumbersThanCurrent(nums: number[]): number[] {
	const sorted = [...nums].sort((a, b) => a - b);
	const counts = new Map<number, number>();

	for (let i = 0; i < sorted.length; i++) {
		if (!counts.has(sorted[i])) {
			counts.set(sorted[i], i);
		}
	}

	return nums.map((num) => counts.get(num)!);
};