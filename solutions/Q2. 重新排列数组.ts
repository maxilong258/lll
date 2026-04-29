function shuffle(nums: number[], n: number): number[] {
	const left = nums.slice(0, n);
	const right = nums.slice(n);
	const result: number[] = [];

	for (let i = 0; i < n; i++) {
		result.push(left[i], right[i]);
	}

	return result;
};