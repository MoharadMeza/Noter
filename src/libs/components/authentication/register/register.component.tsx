'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { RegisterFormData } from '@libs/components/authentication/register/register'
import { registerSchema } from '@libs/components/authentication/register/register.validation'
import Button from '@libs/components/button/button.component'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@libs/components/card/card.component'
import Input from '@libs/components/form/input/input.component'
import { useMutateUserRegister } from '@libs/models/user/register/useMutateUserRegister'
import useAuthStore from '@libs/store/auth.store'
import useProfileStore from '@libs/store/profile.store'
import { cn } from '@libs/utils/tailwind'

const Register = () => {
  const t = useTranslations()
  const { setUserLogin } = useAuthStore()
  const { setProfileData } = useProfileStore()
  const formMethods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })
  const { handleSubmit } = formMethods
  const { mutate: registerUser, isPending: isRegisterUserLoading } = useMutateUserRegister({
    onSuccess: (user: any) => {
      setProfileData({ id: user.id.toString(), email: user.email, name: user.name })
      setUserLogin()
    },
    onError: () => {
      setProfileData(undefined)
    },
    toastError: true,
  })

  const onSubmit = async (data: RegisterFormData) => {
    registerUser(data)
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
              d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
            />
          </svg>
        </div>
        <CardTitle className='text-2xl font-bold'>{t('REGISTER_TITLE')}</CardTitle>
        <CardDescription className='mt-1'>{t('REGISTER_DESCRIPTION')}</CardDescription>
      </CardHeader>

      <CardContent className='pt-2'>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            <div className='space-y-4'>
              <Input
                name='username'
                id='username'
                type='text'
                label={t('NAME_LABEL')}
                placeholder={t('NAME_PLACEHOLDER')}
              />

              <Input
                name='email'
                id='email'
                type='email'
                label={t('EMAIL_LABEL')}
                placeholder={t('EMAIL_PLACEHOLDER')}
              />

              <Input
                name='password'
                id='password'
                type='password'
                label={t('PASSWORD_LABEL')}
                placeholder={t('PASSWORD_PLACEHOLDER')}
              />

              <Input
                name='confirmPassword'
                id='confirmPassword'
                type='password'
                label={t('CONFIRM_PASSWORD_LABEL')}
                placeholder={t('CONFIRM_PASSWORD_PLACEHOLDER')}
              />
            </div>

            <Button
              type='submit'
              disabled={isRegisterUserLoading}
              isLoading={isRegisterUserLoading}
              loadingText={t('SUBMIT_LOADING')}
              className='w-full'
            >
              {t('SUBMIT_BUTTON')}
            </Button>

            <p className='text-center text-sm text-gray-500 dark:text-slate-400'>
              {t('LOGIN_LINK_TEXT')}{' '}
              <Link
                href='/auth/login'
                className={cn(
                  'font-medium text-blue-600 hover:text-blue-500',
                  'dark:text-blue-400 dark:hover:text-blue-300',
                  'transition-colors duration-150'
                )}
              >
                {t('LOGIN_LINK')}
              </Link>
            </p>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default Register
