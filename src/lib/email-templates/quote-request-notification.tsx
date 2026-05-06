import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = "Gentleman's Outdoor Services"

interface Props {
  name?: string
  email?: string
  phone?: string
  address?: string
  message?: string
}

const QuoteRequestNotificationEmail = ({ name, email, phone, address, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New quote request from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Quote Request</Heading>
        <Text style={text}>You've received a new quote request on {SITE_NAME}.</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || '—'}</Text>
          <Text style={label}>Address</Text>
          <Text style={value}>{address || '—'}</Text>
          <Text style={label}>Message</Text>
          <Text style={value}>{message || '—'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>View and manage in the admin dashboard.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: QuoteRequestNotificationEmail,
  subject: (data: Record<string, any>) => `New quote request from ${data?.name || 'a visitor'}`,
  displayName: 'Quote request notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '555-123-4567',
    address: '123 Main St',
    message: 'Looking for a lawn mowing quote.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#1a3a1a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#333', lineHeight: '1.5', margin: '0 0 12px' }
const label = { fontSize: '12px', color: '#888', textTransform: 'uppercase' as const, margin: '12px 0 2px', fontWeight: 'bold' as const }
const value = { fontSize: '14px', color: '#222', margin: '0 0 4px', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#e6e6e6', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#888', margin: '16px 0 0' }
