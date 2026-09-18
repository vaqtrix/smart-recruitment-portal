'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const path = usePathname()
  const is = (p) => (path === p ? 'nav-link active' : 'nav-link')

  return (
    <nav className="navbar navbar-expand brandbar px-3 px-md-4 py-2">
      <div className="container-fluid p-0">
        <Link className="navbar-brand d-flex align-items-center fw-semibold" href="/">
          <span className="brand-logo">N</span> Nova Recruit
        </Link>
        <ul className="navbar-nav ms-auto flex-row gap-2">
          <li className="nav-item"><Link className={is('/')} href="/">Home</Link></li>
          <li className="nav-item"><Link className={is('/apply')} href="/apply">Apply</Link></li>
          <li className="nav-item"><Link className={is('/admin')} href="/admin">Admin</Link></li>
        </ul>
      </div>
    </nav>
  )
}
