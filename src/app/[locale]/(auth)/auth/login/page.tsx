import Login from '@libs/components/authentication/login/login.component'

export default function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800'>
      <Login />
    </div>
  )
}
