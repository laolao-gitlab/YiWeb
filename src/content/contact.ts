import contactData from './data/contact.json'
import type { ContactContent, LegalContent } from './schema'

const data = contactData as {
  contact: ContactContent
  legal: LegalContent
}

export const contactContent: ContactContent = data.contact
export const legalContent: LegalContent = data.legal
