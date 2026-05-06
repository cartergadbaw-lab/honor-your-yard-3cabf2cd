import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { template as quoteRequestTemplate } from '@/lib/email-templates/quote-request'

const SENDER_DOMAIN = 'notify.gentlemansoutdoorservices.com'
const FROM_DOMAIN = 'gentlemansoutdoorservices.com'
const SITE_NAME = "Gentleman's Outdoor Services"

const Schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  address: z.string().trim().max(500).optional().or(z.literal('')),
  message: z.string().trim().max(5000).optional().or(z.literal('')),
})

export const Route = createFileRoute('/api/public/quote-request')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = process.env.SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !serviceKey) {
          return Response.json({ error: 'Server not configured' }, { status: 500 })
        }

        let parsed
        try {
          parsed = Schema.parse(await request.json())
        } catch {
          return Response.json({ error: 'Invalid input' }, { status: 400 })
        }

        const supabase = createClient(supabaseUrl, serviceKey)
        const messageId = crypto.randomUUID()
        const recipient = quoteRequestTemplate.to!

        const data = {
          name: parsed.name,
          email: parsed.email,
          phone: parsed.phone || '',
          address: parsed.address || '',
          message: parsed.message || '',
        }

        const element = React.createElement(quoteRequestTemplate.component, data)
        const html = await render(element)
        const text = await render(element, { plainText: true })
        const subject =
          typeof quoteRequestTemplate.subject === 'function'
            ? quoteRequestTemplate.subject(data)
            : quoteRequestTemplate.subject

        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: 'quote-request',
          recipient_email: recipient,
          status: 'pending',
        })

        const { error } = await supabase.rpc('enqueue_email', {
          queue_name: 'transactional_emails',
          payload: {
            message_id: messageId,
            to: recipient,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject,
            html,
            text,
            purpose: 'transactional',
            label: 'quote-request',
            idempotency_key: messageId,
            queued_at: new Date().toISOString(),
          },
        })

        if (error) {
          console.error('Failed to enqueue quote request', error)
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: 'quote-request',
            recipient_email: recipient,
            status: 'failed',
            error_message: 'enqueue failed',
          })
          return Response.json({ error: 'Failed to send' }, { status: 500 })
        }

        return Response.json({ success: true })
      },
    },
  },
})
