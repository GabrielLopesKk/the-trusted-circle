// Demo data for the simulated recovery flow. Swap these out for real
// contacts and account data when the flow is connected to a backend.

export type Contact = {
  id: string
  name: string
  phone: string
}

export const CONTACTS: Contact[] = [
  { id: '1', name: 'Sarah L.', phone: '+1 555 0102' },
  { id: '2', name: 'Mark D.', phone: '+1 555 0143' },
  { id: '3', name: 'Mom', phone: '+1 555 0188' },
  { id: '4', name: 'David K.', phone: '+1 555 0211' },
  { id: '5', name: 'Emma R.', phone: '+1 555 0234' },
  { id: '6', name: 'John S.', phone: '+1 555 0267' },
  { id: '7', name: 'Lisa M.', phone: '+1 555 0298' },
]

export const ACCOUNT_OWNER = {
  name: 'Alex G.',
  firstName: 'Alex',
  initials: 'AG',
  newPhone: '+15550199',
}

export const RECOVERY_CODE = '849 - 201'

export const REQUIRED_GUARDIANS = 3
