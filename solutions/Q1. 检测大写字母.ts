function detectCapitalUse(word: string): boolean {
    const n = word.length;
    if (n === 0) return true;
    
    // 判断首字母是否大写
    const isFirstUpper = word[0] >= 'A' && word[0] <= 'Z';
    
    if (isFirstUpper) {
        // 首字母大写：后面要么全大写，要么全小写
        if (n === 1) return true;
        const isSecondUpper = word[1] >= 'A' && word[1] <= 'Z';
        
        for (let i = 2; i < n; i++) {
            // 根据第二个字母决定后续应该全大写还是全小写
            if (isSecondUpper) {
                if (word[i] < 'A' || word[i] > 'Z') return false;
            } else {
                if (word[i] < 'a' || word[i] > 'z') return false;
            }
        }
        return true;
    } else {
        // 首字母小写：后面必须全小写
        for (let i = 1; i < n; i++) {
            if (word[i] < 'a' || word[i] > 'z') return false;
        }
        return true;
    }
}