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

import { RegisterFormData } from '@libs/components/authentication/register/register'
import { registerSchema } from '@libs/components/authentication/register/register.validation'
import { register } from '@server/modules/user/services'

import { cn } from '@libs/utils/tailwind'

const Register = () => {
  const t = useTranslations()
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    register(data)
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>{t('REGISTER_TITLE')}</CardTitle>
        <CardDescription>{t('REGISTER_DESCRIPTION')}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <Input
              id='username'
              type='text'
              label={t('NAME_LABEL')}
              placeholder={t('NAME_PLACEHOLDER')}
              error={errors.username?.message}
              {...registerField('username')}
            />

            <Input
              id='email'
              type='email'
              label={t('EMAIL_LABEL')}
              placeholder={t('EMAIL_PLACEHOLDER')}
              error={errors.email?.message}
              {...registerField('email')}
            />

            <Input
              id='password'
              type='password'
              label={t('PASSWORD_LABEL')}
              placeholder={t('PASSWORD_PLACEHOLDER')}
              error={errors.password?.message}
              {...registerField('password')}
            />

            <Input
              id='confirmPassword'
              type='password'
              label={t('CONFIRM_PASSWORD_LABEL')}
              placeholder={t('CONFIRM_PASSWORD_PLACEHOLDER')}
              error={errors.confirmPassword?.message}
              {...registerField('confirmPassword')}
            />
          </div>

          <div>
            <Button
              type='submit'
              disabled={isSubmitting}
              isLoading={isSubmitting}
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
      </CardContent>
    </Card>
  )
}

export default Register
