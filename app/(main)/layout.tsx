import Navbar from '@/components/navbar/index'
import Footer from '@/components/footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <main className='bg-main-background'>{children}</main>
      <Footer />
    </>
  )
}
