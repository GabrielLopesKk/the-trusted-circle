import { useState, type ComponentType, type ReactNode } from 'react'
import {
  ArrowLeft,
  Check,
  CircleHelp,
  Copy,
  Info,
  Plus,
  Search,
  ShieldCheck,
  UserPlus,
  X,
  type LucideProps,
} from 'lucide-react'
import { initials } from '@/lib/circle'
import type { Contact } from '@/lib/fixtures'

type Icon = ComponentType<LucideProps>

const AVATAR_COLORS = ['#2563EB', '#16A34A', '#FACC15', '#7C3AED', '#EC4899', '#0EA5E9']
const GUARDIAN_COLORS = ['#2563EB', '#16A34A', '#FACC15']

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  onHelp,
}: {
  title: string
  subtitle?: string
  onBack?: () => void
  onHelp?: () => void
}) {
  return (
    <header className="rounded-b-[2rem] bg-[#2563EB] px-5 pt-6 pb-7 text-white shadow-lg">
      <div className="flex items-center justify-between">
        {onBack ? (
          <IconButton label="Go back" onClick={onBack}>
            <ArrowLeft size={24} strokeWidth={2.5} />
          </IconButton>
        ) : (
          <span className="size-10" />
        )}
        {onHelp ? (
          <IconButton label="Help" onClick={onHelp}>
            <CircleHelp size={22} strokeWidth={2.5} />
          </IconButton>
        ) : (
          <span className="size-10" />
        )}
      </div>
      <div className="mt-2 flex items-center justify-center gap-2">
        <ShieldCheck size={22} strokeWidth={2.5} />
        <h1 className="text-xl font-extrabold tracking-wide">{title}</h1>
      </div>
      {subtitle && (
        <p className="mt-1 text-center text-xs font-bold tracking-widest text-white/80">
          {subtitle}
        </p>
      )}
    </header>
  )
}

export function IconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-10 place-items-center rounded-full transition hover:bg-black/10 active:scale-95"
    >
      {children}
    </button>
  )
}

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-100">
      <Search size={18} className="text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your contacts..."
        aria-label="Search contacts"
        className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
      />
    </label>
  )
}

export function Avatar({ name, color, size = 'md' }: { name: string; color: string; size?: 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'size-16 text-lg' : 'size-11 text-sm'
  const text = color === '#FACC15' ? 'text-[#111827]' : 'text-white'
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full font-bold ${dims} ${text}`}
      style={{ backgroundColor: color }}
    >
      {initials(name)}
    </div>
  )
}

export function ContactList({
  contacts,
  selectedIds,
  disabled,
  onToggle,
}: {
  contacts: Contact[]
  selectedIds: string[]
  disabled: boolean
  onToggle: (c: Contact) => void
}) {
  if (contacts.length === 0) {
    return <div className="py-8 text-center text-sm text-gray-400">No contacts found.</div>
  }
  return (
    <ul className="space-y-2">
      {contacts.map((contact, i) => {
        const selected = selectedIds.includes(contact.id)
        const locked = disabled && !selected
        return (
          <li key={contact.id}>
            <button
              type="button"
              onClick={() => onToggle(contact)}
              disabled={locked}
              aria-pressed={selected}
              className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition active:scale-[0.99] ${
                selected ? 'border-[#2563EB] bg-blue-50' : 'border-[#E5E7EB] bg-white hover:border-gray-300'
              } ${locked ? 'cursor-not-allowed opacity-40' : ''}`}
            >
              <Avatar name={contact.name} color={AVATAR_COLORS[i % AVATAR_COLORS.length]} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#111827]">{contact.name}</p>
                <p className="text-xs text-gray-500">{contact.phone}</p>
              </div>
              <div
                className={`grid size-8 place-items-center rounded-full ${
                  selected ? 'bg-[#2563EB] text-white' : 'bg-[#F3F4F6] text-gray-400'
                }`}
              >
                {selected ? <Check size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={2.5} />}
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export function GuardianSlot({
  guardian,
  index,
  onRemove,
}: {
  guardian: Contact | null
  index: number
  onRemove: (id: string) => void
}) {
  if (!guardian) {
    return (
      <div className="flex w-20 flex-col items-center gap-2">
        <div className="grid size-16 place-items-center rounded-full border-2 border-dashed border-gray-300 text-gray-300">
          <UserPlus size={26} strokeWidth={2.5} />
        </div>
        <span className="text-xs font-medium text-gray-400">Add Guardian</span>
      </div>
    )
  }
  return (
    <div className="flex w-20 flex-col items-center gap-2">
      <div className="relative">
        <div className="rounded-full ring-4 ring-white shadow-md">
          <Avatar name={guardian.name} color={GUARDIAN_COLORS[index % GUARDIAN_COLORS.length]} size="lg" />
        </div>
        <button
          type="button"
          onClick={() => onRemove(guardian.id)}
          aria-label={`Remove ${guardian.name}`}
          className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-[#111827] text-white shadow transition hover:bg-red-600"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>
      <span className="truncate text-xs font-bold text-[#111827]">{guardian.name}</span>
    </div>
  )
}

export function ActionButton({
  children,
  onClick,
  icon: IconCmp,
  disabled = false,
  color = '#16A34A',
}: {
  children: ReactNode
  onClick?: () => void
  icon?: Icon
  disabled?: boolean
  color?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-extrabold tracking-wide text-white shadow-lg transition hover:brightness-110 active:scale-[0.98] ${
        disabled ? 'cursor-not-allowed opacity-40 hover:brightness-100' : ''
      }`}
      style={{ backgroundColor: color }}
    >
      {IconCmp && <IconCmp size={20} strokeWidth={2.5} />}
      {children}
    </button>
  )
}

export function Modal({
  open,
  onClose,
  onContinue,
  title,
  message,
  continueLabel = 'Continue',
  icon: IconCmp = Check,
}: {
  open: boolean
  onClose: () => void
  onContinue: () => void
  title: string
  message: string
  continueLabel?: string
  icon?: Icon
}) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm animate-[fade_.2s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl animate-[pop_.3s_cubic-bezier(.2,1.4,.4,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 grid size-20 place-items-center rounded-full bg-green-100">
          <div className="grid size-14 place-items-center rounded-full bg-[#16A34A] text-white">
            <IconCmp size={32} strokeWidth={2.5} />
          </div>
        </div>
        <h3 className="text-xl font-extrabold text-[#111827]">{title}</h3>
        <p className="mt-2 mb-6 text-sm leading-relaxed text-gray-500">{message}</p>
        <ActionButton onClick={onContinue} color="#2563EB">
          {continueLabel}
        </ActionButton>
      </div>
    </div>
  )
}

export function RecoveryCodeCard({ code, ownerFirstName }: { code: string; ownerFirstName: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.replace(/\s/g, ''))
    } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <div className="rounded-3xl bg-white p-5 shadow-lg">
      <div className="flex items-center gap-2 text-[#16A34A]">
        <ShieldCheck size={18} strokeWidth={2.5} />
        <span className="text-xs font-bold tracking-widest uppercase">Recovery Code</span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-[#F3F4F6] px-4 py-4">
        <span className="font-mono text-3xl font-extrabold tracking-wider text-[#111827]">{code}</span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy recovery code"
          className={`grid size-11 place-items-center rounded-xl text-white transition active:scale-95 ${
            copied ? 'bg-[#16A34A]' : 'bg-[#2563EB] hover:bg-blue-700'
          }`}
        >
          {copied ? <Check size={20} strokeWidth={3} /> : <Copy size={20} strokeWidth={2.5} />}
        </button>
      </div>
      <p className="mt-3 flex items-start gap-2 text-xs text-gray-600">
        <Info size={14} className="mt-0.5 shrink-0 text-red-500" />
        <span>
          <span className="font-extrabold text-red-600">ONLY</span> share this code if you are talking
          to {ownerFirstName} personally.
        </span>
      </p>
      {copied && (
        <p className="mt-2 text-center text-xs font-semibold text-[#16A34A]" role="status">
          Copied to clipboard!
        </p>
      )}
    </div>
  )
}
