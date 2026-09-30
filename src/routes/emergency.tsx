import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, MessageCircle, Phone, ShieldCheck, TriangleAlert } from 'lucide-react'
import { ACCOUNT_OWNER, RECOVERY_CODE } from '@/lib/fixtures'
import { ActionButton, IconButton, RecoveryCodeCard } from '@/components/ui'

export const Route = createFileRoute('/emergency')({
  head: () => ({ meta: [{ title: 'Emergency Alert · The Trusted Circle' }] }),
  component: EmergencyScreen,
})

function EmergencyScreen() {
  const navigate = useNavigate()
  const [sharing, setSharing] = useState(false)

  const shareViaWhatsApp = () => {
    const text = `Hi, it's ${ACCOUNT_OWNER.firstName}. I lost my phone and need to recover my account. My recovery code is: ${RECOVERY_CODE}. Please share it only if you're talking to me personally.`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    setSharing(true)
    setTimeout(() => setSharing(false), 2500)
  }

  return (
    <div className="screen flex min-h-screen flex-col bg-[#FACC15]">
      <header className="px-5 pt-6 pb-4 text-[#111827]">
        <div className="flex items-center justify-between">
          <IconButton label="Back to setup" onClick={() => navigate({ to: '/setup' })}>
            <ArrowLeft size={24} strokeWidth={2.5} />
          </IconButton>
          <div className="flex items-center gap-2">
            <TriangleAlert size={26} strokeWidth={2.5} className="animate-pulse" />
            <h1 className="text-2xl font-black tracking-wide">EMERGENCY! ALERT</h1>
          </div>
          <span className="size-10" />
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-5 px-5 pb-8">
        <div className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-lg">
          <div className="grid size-14 shrink-0 place-items-center rounded-full bg-[#2563EB] text-lg font-bold text-white">
            {ACCOUNT_OWNER.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-extrabold text-[#111827]">{ACCOUNT_OWNER.name.toUpperCase()}</p>
            <p className="text-sm text-gray-600">
              {ACCOUNT_OWNER.firstName} needs help to recover their account.
            </p>
          </div>
          <ShieldCheck size={22} strokeWidth={2.5} className="text-[#16A34A]" />
        </div>

        <RecoveryCodeCard code={RECOVERY_CODE} ownerFirstName={ACCOUNT_OWNER.firstName} />

        <div className="space-y-3">
          <ActionButton onClick={shareViaWhatsApp} icon={MessageCircle}>
            SHARE VIA WHATSAPP
          </ActionButton>
          {sharing && (
            <p className="text-center text-xs font-semibold text-[#111827]" role="status">
              Opening WhatsApp with your recovery message…
            </p>
          )}
          <a
            href={`tel:${ACCOUNT_OWNER.newPhone}`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#111827] bg-white py-4 text-base font-extrabold tracking-wide text-[#111827] shadow transition hover:bg-gray-50 active:scale-[0.98]"
          >
            <Phone size={20} strokeWidth={2.5} />
            CALL {ACCOUNT_OWNER.firstName.toUpperCase()} (new #)
          </a>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 text-sm font-semibold text-[#111827]">
          <button
            type="button"
            onClick={() => navigate({ to: '/setup' })}
            className="flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-black/10"
          >
            <ArrowLeft size={16} /> Back to Setup
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: '/success' })}
            className="flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-black/10"
          >
            Continue (demo) <ArrowRight size={16} />
          </button>
        </div>
      </main>
    </div>
  )
}
