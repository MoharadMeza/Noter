'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import Button from '@libs/components/button/button.component'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@libs/components/card/card.component'
import Input from '@libs/components/form/input/input.component'
import { LoginFormData } from '@libs/components/authentication/login/login'
import { loginSchema } from '@libs/components/authentication/login/login.validation'
import useAuthSlice from '@libs/store/auth.slice'
import { cn } from '@libs/utils/tailwind'
import { useMutateUserLogin } from '@libs/models/user/login/mutateUserLogin'

const Login = () => {
  const t = useTranslations()
  const { setAuthData } = useAuthSlice()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const { mutate: loginUser, isPending: isLoginUserLoading } = useMutateUserLogin({
    onSuccess: (user: any) => {
      setAuthData({ id: user.id.toString(), email: user.email, name: user.name })
    },
    onError: () => {
      setAuthData(undefined)
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
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <Input
              id='email'
              type='email'
              label={t('EMAIL_LABEL')}
              placeholder={t('LOGIN_EMAIL_PLACEHOLDER')}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id='password'
              type='password'
              label={t('PASSWORD_LABEL')}
              placeholder={t('LOGIN_PASSWORD_PLACEHOLDER')}
              error={errors.password?.message}
              {...register('password')}
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
      </CardContent>
    </Card>
  )
}

export default Login
