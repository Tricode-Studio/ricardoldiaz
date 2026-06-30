const API_BASE_URL = (
  import.meta.env.VITE_TRICODE_PUBLIC_API_BASE_URL ??
  import.meta.env.VITE_TRICODE_API_BASE_URL ??
  'https://cms.tricode.studio/api/v1'
).replace(/\/+$/, '')
const TENANT_SLUG = import.meta.env.VITE_TRICODE_TENANT_SLUG ?? 'ricardo-l-diaz'

export async function submitAuctionAlertSubscription(phone: string): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/public/${encodeURIComponent(TENANT_SLUG)}/auction-alert-subscriptions`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ phone: phone.trim() }),
    },
  )

  if (!response.ok) {
    let detail = `No se pudo registrar el número (${response.status}).`
    try {
      const errorPayload = await response.json()
      const apiMessage = Array.isArray(errorPayload?.message)
        ? errorPayload.message.find((entry: unknown) => typeof entry === 'string')
        : errorPayload?.message
      if (typeof apiMessage === 'string' && apiMessage.trim()) detail = apiMessage.trim()
    } catch {
      // keep default message
    }
    throw new Error(detail)
  }
}
