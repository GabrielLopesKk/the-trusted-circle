import { useState } from 'react'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { Info, Send } from 'lucide-react'
import { addGuardian, removeGuardian, useGuardians } from '@/lib/circle'
import { CONTACTS, REQUIRED_GUARDIANS, type Contact } from '@/lib/fixtures'
import { ActionButton, ContactList, GuardianSlot, Modal, ScreenHeader, SearchBar } from './ui'

export function SetupScreen() {
  const navigate = useNavigate()
  const router = useRouter()
  const guardians = useGuardians()
  const [query, setQuery] = useState('')
  const [sent, setSent] = useState(false)
  const [help, setHelp] = useState(false)

  const selectedIds = guardians.map((g) => g.id)
  const complete = guardians.length >= REQUIRED_GUARDIANS
  const filtered = CONTACTS.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
  const slots = Array.from({ length: REQUIRED_GUARDIANS }, (_, i) => guardians[i] ?? null)

  const toggle = (contact: Contact) => {
    if (selectedIds.includes(contact.id)) removeGuardian(contact.id)
    else addGuardian(contact)
  }

  return (
    <div className="screen flex min-h-screen flex-col">
      <ScreenHeader
        title="THE TRUSTED CIRCLE"
        subtitle="SETUP: CHOOSE YOUR CIRCLE"
        onBack={() => router.history.back()}
        onHelp={() => setHelp(true)}
      />

      <main className="flex flex-1 flex-col px-5 pt-5 pb-6">
        <SearchBar value={query} onChange={setQuery} />
        <p className="mt-4 mb-3 flex items-center gap-2 text-sm font-medium text-gray-600">
          <Info size={14} className="text-[#2563EB]" />
          Select {REQUIRED_GUARDIANS} trusted friends to protect your account.
        </p>

        <div className="-mx-1 max-h-[42vh] flex-1 overflow-y-auto px-1 pb-1">
          <ContactList
            contacts={filtered}
            selectedIds={selectedIds}
            disabled={complete}
            onToggle={toggle}
          />
        </div>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <p className="mb-4 text-center text-xs font-bold tracking-wide text-gray-400 uppercase">
            Your Trusted Guardians
          </p>
          <div className="mb-5 flex items-start justify-around">
            {slots.map((g, i) => (
              <GuardianSlot key={g?.id ?? `empty-${i}`} guardian={g} index={i} onRemove={removeGuardian} />
            ))}
          </div>
          {!complete && (
            <p className="mb-3 text-center text-xs font-medium text-amber-600">
              Select {REQUIRED_GUARDIANS - guardians.length} more to continue.
            </p>
          )}
          <ActionButton onClick={() => setSent(true)} disabled={!complete} icon={Send}>
            SEND INVITES
          </ActionButton>
        </section>
      </main>

      <Modal
        open={sent}
        onClose={() => setSent(false)}
        onContinue={() => {
          setSent(false)
          navigate({ to: '/emergency' })
        }}
        title="Invitations Sent!"
        message={`Your ${REQUIRED_GUARDIANS} trusted guardians have been invited to protect your account. They'll receive instructions on how to help you recover access.`}
        continueLabel="GO TO EMERGENCY ALERT"
      />
      <Modal
        open={help}
        onClose={() => setHelp(false)}
        onContinue={() => setHelp(false)}
        title="How It Works"
        message="Your Trusted Circle lets trusted friends help you regain access if you ever lose your phone. Choose people you trust deeply — they'll verify your identity before sharing recovery codes."
        continueLabel="GOT IT"
        icon={Info}
      />
    </div>
  )
}
