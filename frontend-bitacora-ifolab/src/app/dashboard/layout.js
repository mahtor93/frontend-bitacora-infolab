import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  
  if (!token) {
    redirect('/') // Redirige solo si no hay token
  }

  return (
    <div>
      {children}
    </div>
  )
}