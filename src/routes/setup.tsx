import { createFileRoute } from '@tanstack/react-router'
import { SetupScreen } from '@/components/SetupScreen'

export const Route = createFileRoute('/setup')({
  head: () => ({ meta: [{ title: 'Choose Your Circle · The Trusted Circle' }] }),
  component: SetupScreen,
})
