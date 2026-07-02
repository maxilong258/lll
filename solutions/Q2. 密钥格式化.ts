function licenseKeyFormatting(s: string, k: number): string {
    const res: string[] = [];
    let count = 0;
  
    for (let i = s.length - 1; i >= 0; i--) {
      if (s[i] === '-') continue;
  
      if (count > 0 && count % k === 0) {
        res.push('-');
      }
  
      res.push(s[i].toUpperCase());
      count++;
    }
  
    return res.reverse().join('');
  }