function maskPII(s: string): string {
    if (s.includes('@')) {
        const lower = s.toLowerCase();
        const [name, domain] = lower.split('@');
        return `${name[0]}*****${name[name.length - 1]}@${domain}`;
    }
    
    const digits = s.replace(/\D/g, '');
    const last4 = digits.slice(-4);
    const countryLen = digits.length - 10;
    
    return countryLen === 0 
        ? `***-***-${last4}` 
        : `+${'*'.repeat(countryLen)}-***-***-${last4}`;
}