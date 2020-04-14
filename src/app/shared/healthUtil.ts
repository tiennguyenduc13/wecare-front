export function findMasterHealthSignal(healthSignals: string[]): string {
  let master = 'normal';
  master = healthSignals.includes('exposed') ? 'exposed' : master;
  master = healthSignals.includes('symptoms') ? 'symptoms' : master;
  master = healthSignals.includes('positive') ? 'positive' : master;

  return master;
}
