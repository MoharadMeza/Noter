'use client'

import { useRef, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { map } from 'lodash-es'

import Icon from '@libs/components/icon/icon.component'
import { LabelManagerProps } from '@libs/components/label-manager/label-manager'
import Show from '@libs/components/show/show.component'
import useQueryClient from '@libs/hooks/use-query-client'
import { apiKeys } from '@libs/models/api-keys'
import { useFetchLabelList } from '@libs/models/label/useFetchLabelList'
import { useMutateLabel } from '@libs/models/label/useMutateLabel'
import { useMutateLabelById } from '@libs/models/label/useMutateLabelById'
import { cn } from '@libs/utils/tailwind'
import { toast } from '@libs/utils/toast'

function LabelItem(props: LabelManagerProps) {
  const { id, name } = props
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const { mutate: deleteLabel, isPending } = useMutateLabelById(id)

  const activeLabelId = searchParams.get('labelId') ? Number(searchParams.get('labelId')) : null
  const isActive = activeLabelId === id

  const handleSelect = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (isActive) {
      params.delete('labelId')
    } else {
      params.set('labelId', String(id))
    }

    router.push(`?${params.toString()}`)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteLabel(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [apiKeys.LABEL.GET_LIST] })
        queryClient.invalidateQueries({ queryKey: [apiKeys.NOTE.GET_LIST] })
      },
      onError: (error: unknown) => {
        const status = (error as { status?: number })?.status
        const message = status === 409 ? t('LABEL_IN_USE') : t('LABEL_DELETE_FAILED')
        toast.error(message)
      },
    })
  }

  return (
    <div
      onClick={handleSelect}
      className={cn(
        'group flex w-full cursor-pointer items-center gap-2 rounded-e-full px-4 py-1.5 text-sm transition-colors',
        isActive
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
          : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/40'
      )}
    >
      <Icon
        name='tag'
        className={cn(
          'h-4 w-4 shrink-0 transition-colors',
          isActive ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400'
        )}
      />

      <span className='flex-1 truncate'>{name}</span>

      <button
        type='button'
        onClick={handleDelete}
        disabled={isPending}
        className={cn(
          'opacity-0 transition-opacity group-hover:opacity-100',
          'rounded p-0.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400',
          isPending && 'opacity-100'
        )}
        aria-label={`Delete ${name}`}
      >
        <Show when={isPending} mode='unmount'>
          <Icon name='spinner' className='h-3.5 w-3.5 animate-spin' />
        </Show>
        <Show when={!isPending} mode='unmount'>
          <Icon name='close' className='h-3.5 w-3.5' />
        </Show>
      </button>
    </div>
  )
}

function LabelManager() {
  const t = useTranslations()
  const queryClient = useQueryClient()
  const [isAdding, setIsAdding] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: labelsData } = useFetchLabelList({ enabled: true })
  const labels = labelsData?.result.data ?? []

  const { mutate: createLabel, isPending } = useMutateLabel()

  const handleAddClick = () => {
    setIsAdding(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleSubmit = () => {
    const name = inputValue.trim()
    if (!name) {
      setIsAdding(false)
      return
    }

    createLabel(
      { name },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [apiKeys.LABEL.GET_LIST] })
          setInputValue('')
          setIsAdding(false)
        },
      }
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') {
      setIsAdding(false)
      setInputValue('')
    }
  }

  const renderLabels = () => {
    if (labels.length === 0) {
      return (
        <p className='px-4 py-1.5 text-xs text-slate-400 dark:text-slate-500'>{t('LABEL_EMPTY')}</p>
      )
    }

    return map(labels, (label) => <LabelItem key={label.id} id={label.id} name={label.name} />)
  }

  return (
    <div className='mt-4 border-t border-gray-200 pt-4 dark:border-slate-700'>
      <div className='mb-1 flex items-center justify-between px-4'>
        <span className='text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400'>
          {t('LABEL_TITLE')}
        </span>

        <button
          type='button'
          onClick={handleAddClick}
          className='rounded p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          aria-label={t('LABEL_ADD_BUTTON')}
        >
          <Icon name='plus' className='h-4 w-4' />
        </button>
      </div>

      {renderLabels()}

      <Show when={isAdding} mode='unmount'>
        <div className='flex items-center gap-2 px-4 py-1'>
          <Icon name='tag' className='h-4 w-4 shrink-0 text-slate-400' />
          <input
            ref={inputRef}
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmit}
            placeholder={t('LABEL_ADD_PLACEHOLDER')}
            disabled={isPending}
            className='flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200'
          />
        </div>
      </Show>
    </div>
  )
}

export default LabelManager
