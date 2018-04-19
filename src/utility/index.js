export function getPerformanceNow() {
  const g = window;
  if (g != null) {
    const perf = g.performance;
    if (perf != null) {
      try {
        const performaceNow = perf.now();
        if (typeof performaceNow === 'number') {
          return performaceNow;
        }
        // eslint-disable-next-line
      } catch (e) { }
    }
  }
  return null;
}
