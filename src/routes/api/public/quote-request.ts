import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'
import { render } from '@react-email/components'
import * as React from 'react'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const NOTIFY_TO = 'gentlemansoutdoorservices@gmail.com'

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  message: z.string().max(5000).optional().nullable(),
})

export const Route = createFileRoute('/api/public/quote-request')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !serviceKey) {
          return Response.json({ error: 'Server not configured' }, { status: 500 })
        }

        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }
        const parsed = schema.safeParse(body)
        if (!parsed.success) {
          return Response.json({ error: 'Invalid input' }, { status: 400 })
        }
        const data = parsed.data

        const supabase = createClient(supabaseUrl, serviceKey)

        // Insert the quote request
        const { data: inserted, error: insertError } = await supabase
          .from('quote_requests')
          .insert({
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            address: data.address || null,
            message: data.message || null,
          })
          .select('id')
          .single()

        if (insertError || !inserted) {
          console.error('Failed to insert quote request', insertError)
          return Response.json({ error: 'Failed to save request' }, { status: 500 })
        }

        // Pre-render and enqueue the notification email
        try {
          const entry = TEMPLATES['quote-request-notification']
          const html = await render(React.createElement(entry.component, data))
          const subject =
            typeof entry.subject === 'function' ? entry.subject(data) : entry.subject

          await supabase.rpc('enqueue_email', {
            queue_name: 'transactional_emails',
            payload: {
              to: NOTIFY_TO,
              subject,
              html,
              label: 'quote-request-notification',
              message_id: `quote-${inserted.id}`,
              queued_at: new Date().toISOString(),
            },
          })
        } catch (err) {
          // Don't fail the form if email enqueue fails — quote is already saved
          console.error('Failed to enqueue notification email', err)
        }

        return Response.json({ ok: true })
      },
    },
  },
})
