function timeRequiredToBuy(tickets: number[], k: number): number {
    let totalTime = 0;
    const targetTickets = tickets[k];

    for (let i = 0; i < tickets.length; i++) {
        if (i <= k) {
            // 前面的人（包括k自己），最多买 tickets[k] 张
            totalTime += Math.min(tickets[i], targetTickets);
        } else {
            // 后面的人，最多买 tickets[k] - 1 张
            totalTime += Math.min(tickets[i], targetTickets - 1);
        }
    }

    return totalTime;
}