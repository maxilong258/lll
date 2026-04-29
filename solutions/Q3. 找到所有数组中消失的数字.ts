function findDisappearedNumbers(nums: number[]): number[] {
	const counts = new Map<number, number>();

	for (const num of nums) {
		counts.set(num, (counts.get(num) ?? 0) + 1);
	}

	const missing: number[] = [];

	for (let num = 1; num <= nums.length; num++) {
		if (!counts.has(num)) {
			missing.push(num);
		}
	}

	return missing;
};
