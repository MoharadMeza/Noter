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
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>{t('LOGIN_TITLE')}</CardTitle>
        <CardDescription>{t('LOGIN_DESCRIPTION')}</CardDescription>
      </CardHeader>

      <CardContent>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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

            <div>
              <Button
                type='submit'
                disabled={isLoginUserLoading}
                isLoading={isLoginUserLoading}
                className='w-full'
              >
                {t('LOGIN_SUBMIT_BUTTON')}
              </Button>
            </div>

            <div className='text-center text-sm text-gray-600'>
              {t('LOGIN_REGISTER_LINK_TEXT')}

              <Link href='/auth/register' className={cn('text-blue-600 hover:text-blue-500')}>
                {t('LOGIN_REGISTER_LINK')}
              </Link>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default Login
