// utils/format.ts
export function formatRupiah(value: number | undefined | null): string {
  const angka = value ?? 0;
  return "Rp. " + angka.toLocaleString("id-ID");
}