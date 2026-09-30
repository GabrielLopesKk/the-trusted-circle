import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Activity, KeyRound, ShieldCheck, Users } from 'lucide-react'
import { useGuardians } from '@/lib/circle'
import { ACCOUNT_OWNER } from '@/lib/fixtures'

export const Route = createFileRoute('/home')({
  head: () => ({ meta: [{ title: 'Home · The Trusted Circle' }] }),
  component: HomeScreen,
})

function HomeScreen() {
  const navigate = useNavigate()
  const guardians = useGuardians()

  const stats = [
    { icon: Users, label: 'Trusted Circle', value: `${guardians.length} guardians`, color: '#2563EB' },
    { icon: ShieldCheck, label: 'Security Status', value: 'Protected', color: '#16A34A' },
    { icon: KeyRound, label: 'Recovery Options', value: 'Ready', color: '#CA8A04' },
    { icon: Activity, label: 'Recent Activity', value: 'All clear', color: '#7C3AED' },
  ]

  return (
    <div className="screen flex min-h-screen flex-col">
      <header className="rounded-b-[2rem] bg-[#2563EB] px-5 pt-10 pb-8 text-white shadow-lg">
        <p className="text-sm font-medium opacity-80">Welcome back,</p>
        <h1 className="text-3xl font-extrabold">{ACCOUNT_OWNER.name}</h1>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5">
          <ShieldCheck size={16} strokeWidth={2.5} className="text-green-300" />
          <span className="text-xs font-semibold">Account secured &amp; verified</span>
        </div>
      </header>

      <main className="flex-1 px-5 pt-6 pb-8">
        <h2 className="mb-3 text-lg font-extrabold text-[#111827]">Dashboard</h2>
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <div
                className="mb-3 grid size-10 place-items-center rounded-xl"
                style={{ backgroundColor: `${color}20`, color }}
              >
                <Icon size={20} strokeWidth={2.5} />
              </div>
              <p className="text-xs font-medium text-gray-500">{label}</p>
              <p className="text-sm font-bold text-[#111827]">{value}</p>
            </div>
          ))}
        </div>

        {guardians.length > 0 && (
          <div className="mt-5 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
            <p className="mb-2 text-xs font-bold tracking-wide text-gray-400 uppercase">Your guardians</p>
            <p className="text-sm font-semibold text-[#111827]">{guardians.map((g) => g.name).join(' · ')}</p>
          </div>
        )}

        <div className="mt-5 rounded-2xl border border-[#E5E7EB] bg-white p-5 text-center">
          <ShieldCheck size={36} strokeWidth={2} className="mx-auto mb-2 text-[#16A34A]" />
          <p className="text-sm font-bold text-[#111827]">You're all set!</p>
          <p className="mt-1 text-xs text-gray-500">
            Your account is protected by your Trusted Circle. Recovery is ready whenever you need it.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate({ to: '/setup' })}
          className="mt-5 w-full rounded-2xl border border-[#2563EB] bg-white py-3 text-sm font-semibold text-[#2563EB] transition hover:bg-blue-50 active:scale-[0.98]"
        >
          Review Trusted Circle
        </button>
      </main>
    </div>
  )
}
