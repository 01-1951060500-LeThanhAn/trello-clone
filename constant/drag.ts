function drag<T>(list: T[], start: number, end: number) {
  const results = Array.from(list);
  const [removed] = results.splice(start, 1);
  results.splice(end, 0, removed);

  return results;
}

export default drag;
