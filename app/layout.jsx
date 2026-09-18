import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Navbar from './components/Navbar.jsx'

export const metadata = {
  title: 'Smart Recruitment Portal',
  description: 'Recruitment portal built with Next.js — candidate applications and an admin dashboard.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container py-4">{children}</main>
        <footer className="text-center text-muted py-4" style={{ fontSize: 13 }}>
          Smart Recruitment Portal · built with Next.js
        </footer>
      </body>
    </html>
  )
}
