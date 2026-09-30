import { createFileRoute } from '@tanstack/react-router'
import { SetupScreen } from '@/components/SetupScreen'

export const Route = createFileRoute('/')({
  component: SetupScreen,
})
