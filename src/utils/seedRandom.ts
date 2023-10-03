function SeedNumberRandomizer(s: number) {
  s = Math.sin(s) * 10000;
  return s - Math.floor(s);
}

export function strToUtf16Bytes(str: string) {
  str = String(str);
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    bytes.push(code & 255, code >> 8);
  }
  return bytes;
}

export function SeedStringRandomizer(s: string) {
  const bytes = Number(strToUtf16Bytes(s).join(""));
  return SeedNumberRandomizer(bytes);
}
