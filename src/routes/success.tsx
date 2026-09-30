import { useEffect, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Check, House } from 'lucide-react'
import { ACCOUNT_OWNER } from '@/lib/fixtures'
import { ActionButton } from '@/components/ui'

export const Route = createFileRoute('/success')({
  head: () => ({ meta: [{ title: 'Access Restored · The Trusted Circle' }] }),
  component: SuccessScreen,
})

function SuccessScreen() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setProgress(100), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="screen flex min-h-screen flex-col">
      <header className="rounded-b-[2rem] bg-[#16A34A] px-5 pt-10 pb-8 text-center text-white shadow-lg">
        <h1 className="text-4xl font-black tracking-wide">SUCCESS!</h1>
        <p className="mt-1 text-sm font-bold tracking-widest text-white/85">ACCESS RESTORED</p>
      </header>

      <main className="flex flex-1 flex-col px-5 pt-8 pb-8">
        <div className="mx-auto grid size-32 place-items-center rounded-full bg-green-100">
          <div className="grid size-24 place-items-center rounded-full bg-[#16A34A] text-white shadow-lg animate-[check-in_.5s_ease-out]">
            <Check size={48} strokeWidth={3.5} />
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between text-sm font-bold">
            <span className="text-[#111827]">Recovery Complete</span>
            <span className="text-[#16A34A]">{progress}%</span>
          </div>
          <div
            className="h-3 overflow-hidden rounded-full bg-[#E5E7EB]"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-[#16A34A] transition-[width] duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-xl font-extrabold text-[#111827]">Identity Verified!</h2>
            <p className="mt-2 text-sm text-gray-600">You are now logged in securely on this new device.</p>
            <p className="mt-2 text-sm text-gray-600">
              Your old phone has been <span className="font-extrabold text-red-600">BLOCKED</span> and
              erased. Welcome back, {ACCOUNT_OWNER.firstName}!
            </p>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <ActionButton onClick={() => navigate({ to: '/home' })} icon={House}>
            GO TO HOME
          </ActionButton>
          <p className="mt-3 text-center text-xs text-gray-400">
            Account recovery complete — this was a simulated demonstration.
          </p>
        </div>
      </main>
    </div>
  )
}
