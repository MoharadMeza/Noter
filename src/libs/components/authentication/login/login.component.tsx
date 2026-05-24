'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

import appUrl from '@config/app-url'

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
import FormWrapper from '@libs/components/form/form-wrapper/form-wrapper.component'
import Input from '@libs/components/form/input/input.component'
import Icon from '@libs/components/icon/icon.component'
import { useAppForm } from '@libs/hooks/use-form'
import { useMutateUserLogin } from '@libs/models/user/login/useMutateUserLogin'
import useAuthStore from '@libs/store/auth.store'
import useProfileStore from '@libs/store/profile.store'
import { cn } from '@libs/utils/tailwind'

const Login = () => {
  const t = useTranslations()
  const router = useRouter()
  const { setUserLogin } = useAuthStore()
  const { setProfileData } = useProfileStore()
  const formMethods = useAppForm<LoginFormData>({
    schema: loginSchema,
  })
  const { mutate: loginUser, isPending: isLoginUserLoading } = useMutateUserLogin({
    onSuccess: ({ result: { data } }) => {
      setUserLogin()
      router.push(appUrl.HOME)

      if (data) {
        setProfileData({ id: data.id, email: data.email, username: data.username })
      }
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
          <Icon name='user' className='h-7 w-7 text-white' />
        </div>

        <CardTitle className='text-2xl font-bold'>{t('LOGIN_TITLE')}</CardTitle>

        <CardDescription className='mt-1'>{t('LOGIN_DESCRIPTION')}</CardDescription>
      </CardHeader>

      <CardContent className='pt-2'>
        <FormWrapper methods={formMethods} onSubmit={onSubmit} className='space-y-5'>
          <div className='space-y-4'>
            <Input
              dir='ltr'
              name='email'
              id='email'
              type='email'
              label={t('EMAIL_LABEL')}
              placeholder={t('LOGIN_EMAIL_PLACEHOLDER')}
            />

            <Input
              dir='ltr'
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
        </FormWrapper>
      </CardContent>
    </Card>
  )
}

export default Login
