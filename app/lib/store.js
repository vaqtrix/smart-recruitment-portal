/* ================= STORE (data layer) =================
   Acts like the controller/repository in MVC: the only
   place that reads and writes application data.

   It uses the browser's localStorage so the portal works
   on Vercel with zero backend setup. To move to a real
   database later, only this file needs to change — the
   pages call these functions, not storage directly.
   ===================================================== */

import { SEED, STATUS } from './model.js'

const KEY = 'srp_candidates'
const hasWindow = () => typeof window !== 'undefined'

function read() {
  if (!hasWindow()) return null
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function write(list) {
  if (!hasWindow()) return
  localStorage.setItem(KEY, JSON.stringify(list))
}

/* Seed demo data the first time the app runs. */
export function ensureSeeded() {
  if (read() === null) write(SEED)
}

/* Return every application, newest first. */
export function getCandidates() {
  ensureSeeded()
  return read() || []
}

/* Add a new application with a Pending status. */
export function addCandidate(data) {
  const list = getCandidates()
  const record = {
    ...data,
    id: (hasWindow() && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
    experience: Number(data.experience),
    status: STATUS.PENDING,
    appliedAt: new Date().toISOString(),
  }
  write([record, ...list])
  return record
}

/* Change an application's status (Accept / Reject). */
export function setStatus(id, status) {
  const list = getCandidates().map((c) => (c.id === id ? { ...c, status } : c))
  write(list)
  return list
}

/* Case-insensitive search across name, email and position. */
export function searchCandidates(list, term) {
  const q = term.trim().toLowerCase()
  if (!q) return list
  return list.filter((c) =>
    c.fullName.toLowerCase().includes(q) ||
    c.email.toLowerCase().includes(q) ||
    c.position.toLowerCase().includes(q)
  )
}

/* Restore the demo data (handy for a clean demo run). */
export function resetStore() {
  write(SEED)
  return SEED
}
