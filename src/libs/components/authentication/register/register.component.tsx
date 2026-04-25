'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import Button from '@libs/components/button/button.component'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@libs/components/card/card.component'
import Input from '@libs/components/form/input/input.component'
import { RegisterFormData } from '@libs/components/authentication/register/register'
import { registerSchema } from '@libs/components/authentication/register/register.validation'
import { cn } from '@libs/utils/tailwind'
import { useMutateUserRegister } from '@libs/models/user/register/useMutateUserRegister'
import useAuthStore from '@libs/store/auth.store'
import useProfileStore from '@libs/store/profile.store'

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
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>{t('REGISTER_TITLE')}</CardTitle>
        <CardDescription>{t('REGISTER_DESCRIPTION')}</CardDescription>
      </CardHeader>

      <CardContent>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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

            <div>
              <Button
                type='submit'
                disabled={isRegisterUserLoading}
                isLoading={isRegisterUserLoading}
                loadingText={t('SUBMIT_LOADING')}
                className='w-full'
              >
                {t('SUBMIT_BUTTON')}
              </Button>
            </div>

            <div className='text-center text-sm text-gray-600'>
              {t('LOGIN_LINK_TEXT')}{' '}
              <Link href='/auth/login' className={cn('text-blue-600 hover:text-blue-500')}>
                {t('LOGIN_LINK')}
              </Link>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default Register
