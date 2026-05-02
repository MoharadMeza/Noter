'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { LoginFormData } from '@libs/components/authentication/login/login'
import { loginSchema } from '@libs/components/authentication/login/login.validation'
import Button from '@libs/components/button/button.component'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@libs/components/card/card.component'
import Input from '@libs/components/form/input/input.component'
import { useMutateUserLogin } from '@libs/models/user/login/useMutateUserLogin'
import useAuthStore from '@libs/store/auth.store'
import useProfileStore from '@libs/store/profile.store'
import { cn } from '@libs/utils/tailwind'

const Login = () => {
  const t = useTranslations()
  const router = useRouter()
  const { setUserLogin } = useAuthStore()
  const { setProfileData } = useProfileStore()
  const formMethods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const { handleSubmit } = formMethods
  const { mutate: loginUser, isPending: isLoginUserLoading } = useMutateUserLogin({
    onSuccess: (user: any) => {
      setUserLogin()
      router.push('/dashboard')
      setProfileData({ id: user.id.toString(), email: user.email, name: user.name })
    },
    onError: () => {
      setProfileData(undefined)
    },
    toastError: true,
  })

  const onSubmit = async (data: LoginFormData) => {
    loginUser(data)
  }

  return (
    <Card className='w-full max-w-md shadow-xl'>
      <CardHeader className='items-center pb-6 text-center'>
        <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200 dark:shadow-blue-900'>
          <svg
            className='h-7 w-7 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            />
          </svg>
        </div>
        <CardTitle className='text-2xl font-bold'>{t('LOGIN_TITLE')}</CardTitle>
        <CardDescription className='mt-1'>{t('LOGIN_DESCRIPTION')}</CardDescription>
      </CardHeader>

      <CardContent className='pt-2'>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            <div className='space-y-4'>
              <Input
                name='email'
                id='email'
                type='email'
                label={t('EMAIL_LABEL')}
                placeholder={t('LOGIN_EMAIL_PLACEHOLDER')}
              />

              <Input
                name='password'
                id='password'
                type='password'
                label={t('PASSWORD_LABEL')}
                placeholder={t('LOGIN_PASSWORD_PLACEHOLDER')}
              />
            </div>

            <Button
              type='submit'
              disabled={isLoginUserLoading}
              isLoading={isLoginUserLoading}
              loadingText={t('LOGIN_SUBMIT_LOADING')}
              className='w-full'
            >
              {t('LOGIN_SUBMIT_BUTTON')}
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t border-gray-200 dark:border-slate-700' />
              </div>
            </div>

            <p className='text-center text-sm text-gray-500 dark:text-slate-400'>
              {t('LOGIN_REGISTER_LINK_TEXT')}{' '}
              <Link
                href='/auth/register'
                className={cn(
                  'font-medium text-blue-600 hover:text-blue-500',
                  'dark:text-blue-400 dark:hover:text-blue-300',
                  'transition-colors duration-150'
                )}
              >
                {t('LOGIN_REGISTER_LINK')}
              </Link>
            </p>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default Login
