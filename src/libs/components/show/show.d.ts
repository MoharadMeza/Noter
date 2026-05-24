import { ReactNode } from 'react'

export interface ShowProps {
  when: boolean
  /**
   * activity — mounts children immediately, toggles visibility via React Activity (default)
   * unmount  — fully unmounts children when hidden; remounts when shown again
   */
  mode?: 'activity' | 'unmount'
  children: ReactNode
}
