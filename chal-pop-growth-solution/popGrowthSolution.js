function nbYear(p0, percent, aug, p) {
    for (var y = 0; p0 < p; y++) {
        p0 = p0 * (1 + percent / 100) + aug;
    }
    return y;
  }
console.log(nbYear(1500, 5, 100, 5000)); 