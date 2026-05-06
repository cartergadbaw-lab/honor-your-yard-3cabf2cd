import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/unsubscribe')({
  component: UnsubscribePage,
})

function UnsubscribePage() {
  const [state, setState] = useState<'loading' | 'ready' | 'done' | 'already' | 'error'>('loading')
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('token')
    setToken(t)
    if (!t) { setState('error'); return }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(t)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.valid) setState('ready')
        else if (d.reason === 'already_unsubscribed') setState('already')
        else setState('error')
      })
      .catch(() => setState('error'))
  }, [])

  const confirm = async () => {
    if (!token) return
    const res = await fetch('/email/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    const d = await res.json()
    if (d.success) setState('done')
    else if (d.reason === 'already_unsubscribed') setState('already')
    else setState('error')
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1 className="font-serif text-3xl text-foreground">Unsubscribe</h1>
      {state === 'loading' && <p className="mt-4 text-muted-foreground">Loading...</p>}
      {state === 'ready' && (
        <>
          <p className="mt-4 text-muted-foreground">Click below to unsubscribe from emails.</p>
          <button onClick={confirm} className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Confirm Unsubscribe
          </button>
        </>
      )}
      {state === 'done' && <p className="mt-4 text-muted-foreground">You've been unsubscribed.</p>}
      {state === 'already' && <p className="mt-4 text-muted-foreground">You're already unsubscribed.</p>}
      {state === 'error' && <p className="mt-4 text-muted-foreground">This link is invalid or expired.</p>}
    </div>
  )
}
