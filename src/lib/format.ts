/** Formatea un precio en dólares con coma decimal (formato uruguayo), ej. 4.5 -> "US$ 4,50". */
export function formatUsd(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) return undefined
  return `US$ ${value.toFixed(2).replace('.', ',')}`
}
