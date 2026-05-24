import localFont from 'next/font/local'

export const vazirFont = localFont({
  preload: true,
  variable: '--font-vazirmatn',
  src: [
    {
      path: '../../../node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-arabic-wght-normal.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../../node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-latin-wght-normal.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../../node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-latin-ext-wght-normal.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
})
