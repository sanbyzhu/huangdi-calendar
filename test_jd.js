function getJD(y, m, d) {
    let Y = y, M = m;
    if (M <= 2) { Y -= 1; M += 12; }
    const A = Math.floor(Y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + d + B - 1524.5;
}

console.log("JD(1975,1,21) = ", getJD(1975, 1, 21));
console.log("JD(2026,3,8) = ", getJD(2026, 3, 8));
console.log("2026-03-08 - 1975-01-21 = ", getJD(2026, 3, 8) - getJD(1975, 1, 21));
console.log("2026-03-08 - 2442431.5 = ", getJD(2026, 3, 8) - 2442431.5);
