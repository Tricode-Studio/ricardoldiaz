const API_BASE_URL = (
  import.meta.env.VITE_TRICODE_PUBLIC_API_BASE_URL ??
  import.meta.env.VITE_TRICODE_API_BASE_URL ??
  'https://cms.tricode.studio/api/v1'
).replace(/\/+$/, '')
const TENANT_SLUG = import.meta.env.VITE_TRICODE_TENANT_SLUG ?? 'ricardo-l-diaz'

export type ContactFormPayload = {
  nombre: string
  empresa: string
  email: string
  telefono: string
  motivo: string
  mensaje: string
}

/** Backend (`PublicContactSubmissionDto`) exige firstName/lastName por separado -- el form solo pide un nombre completo. */
function splitName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim().replace(/\s+/g, ' ')
  const spaceIndex = trimmed.indexOf(' ')
  if (spaceIndex === -1) return { firstName: trimmed, lastName: '-' }
  return { firstName: trimmed.slice(0, spaceIndex), lastName: trimmed.slice(spaceIndex + 1) }
}

export async function submitContactForm(form: ContactFormPayload): Promise<void> {
  const { firstName, lastName } = splitName(form.nombre)
  const message = form.empresa.trim()
    ? `Empresa/Establecimiento: ${form.empresa.trim()}\n\n${form.mensaje.trim()}`
    : form.mensaje.trim()

  const response = await fetch(`${API_BASE_URL}/public/${encodeURIComponent(TENANT_SLUG)}/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      firstName,
      lastName,
      phone: form.telefono.trim(),
      email: form.email.trim(),
      subject: form.motivo.trim() || undefined,
      message,
    }),
  })

  if (!response.ok) {
    let detail = `No se pudo enviar el mensaje (${response.status}).`
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
