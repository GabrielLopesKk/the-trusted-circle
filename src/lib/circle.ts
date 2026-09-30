import { useEffect } from 'react'
import { Store } from '@tanstack/store'
import { useStore } from '@tanstack/react-store'
import { REQUIRED_GUARDIANS, type Contact } from './fixtures'

const STORAGE_KEY = 'trusted-circle:guardians'

export const circleStore = new Store<{ guardians: Contact[]; hydrated: boolean }>({
  guardians: [],
  hydrated: false,
})

function persist(guardians: Contact[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guardians))
  } catch {}
}

export function addGuardian(contact: Contact) {
  circleStore.setState((s) => {
    if (s.guardians.length >= REQUIRED_GUARDIANS) return s
    if (s.guardians.some((g) => g.id === contact.id)) return s
    const guardians = [...s.guardians, contact]
    persist(guardians)
    return { ...s, guardians }
  })
}

export function removeGuardian(id: string) {
  circleStore.setState((s) => {
    const guardians = s.guardians.filter((g) => g.id !== id)
    persist(guardians)
    return { ...s, guardians }
  })
}

// Guardians live in the browser for this demo; hydrate after mount so the
// server-rendered markup matches the first client render.
export function useGuardians() {
  const guardians = useStore(circleStore, (s) => s.guardians)

  useEffect(() => {
    if (circleStore.state.hydrated) return
    let saved: Contact[] = []
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {}
    circleStore.setState(() => ({ guardians: saved, hydrated: true }))
  }, [])

  return guardians
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
