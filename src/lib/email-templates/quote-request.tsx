import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface QuoteRequestProps {
  name?: string
  email?: string
  phone?: string
  address?: string
  message?: string
}

const QuoteRequestEmail = ({
  name,
  email,
  phone,
  address,
  message,
}: QuoteRequestProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New quote request from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Quote Request</Heading>
        <Text style={text}>
          You've received a new quote request through your website.
        </Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>

          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>

          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || '—'}</Text>

          <Text style={label}>Property address</Text>
          <Text style={value}>{address || '—'}</Text>

          <Text style={label}>Message</Text>
          <Text style={value}>{message || '—'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>Gentleman's Outdoor Services</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: QuoteRequestEmail,
  subject: (data: Record<string, any>) =>
    `New quote request${data.name ? ` from ${data.name}` : ''}`,
  displayName: 'Quote request notification',
  to: 'gentlemansoutdoorservices@gmail.com',
  previewData: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(555) 123-4567',
    address: '123 Oak Lane',
    message: 'Looking for a quote on weekly lawn care.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '24px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#444', lineHeight: '1.6', margin: '0 0 16px' }
const label = {
  fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.1em',
  color: '#888', margin: '14px 0 4px',
}
const value = { fontSize: '15px', color: '#1a1a1a', margin: '0 0 4px', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#999', margin: '8px 0 0' }
