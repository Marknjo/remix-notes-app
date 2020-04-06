export async function delay(secs: number = 2) {
  await new Promise(res => setTimeout(() => res(''), 1000 * secs))
}
