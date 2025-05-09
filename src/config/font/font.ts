import localFont from 'next/font/local'

export const vazirFont = localFont({
  preload: false,
  src: [
    {
      path: './vazir/Vazir-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './vazir/Vazir-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './vazir/Vazir-Light.woff2',
      weight: '300',
      style: 'normal',
    },
  ],
})
