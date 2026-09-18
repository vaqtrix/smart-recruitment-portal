'use client'

import { useEffect, useMemo, useState } from 'react'
import { STATUS } from '../lib/model.js'
import { getCandidates, setStatus, searchCandidates, resetStore } from '../lib/store.js'
import StatusBadge from '../components/StatusBadge.jsx'

export default function AdminPage() {
  const [list, setList] = useState([])
  const [term, setTerm] = useState('')
  const [filter, setFilter] = useState('All')
  const [ready, setReady] = useState(false)

  // localStorage is only available in the browser, so load after mount.
  useEffect(() => {
    setList(getCandidates())
    setReady(true)
  }, [])

  const changeStatus = (id, status) => setList(setStatus(id, status))
  const reset = () => setList(resetStore())

  const stats = useMemo(() => ({
    total: list.length,
    pending: list.filter((c) => c.status === STATUS.PENDING).length,
    accepted: list.filter((c) => c.status === STATUS.ACCEPTED).length,
    rejected: list.filter((c) => c.status === STATUS.REJECTED).length,
  }), [list])

  const visible = useMemo(() => {
    let rows = searchCandidates(list, term)
    if (filter !== 'All') rows = rows.filter((c) => c.status === filter)
    return rows
  }, [list, term, filter])

  const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <div>
          <h3 className="fw-bold mb-0">Admin dashboard</h3>
          <p className="text-muted mb-0">Review and manage candidate applications.</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={reset}>Reset demo data</button>
      </div>

      {/* stat cards */}
      <div className="row g-3 mb-4">
        {[
          ['Total', stats.total, '#14203c'],
          ['Pending', stats.pending, '#b8860b'],
          ['Accepted', stats.accepted, '#16794f'],
          ['Rejected', stats.rejected, '#c23b3b'],
        ].map(([label, num, color]) => (
          <div className="col-6 col-lg-3" key={label}>
            <div className="card stat-card p-3">
              <div className="stat-num" style={{ color }}>{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="card soft p-3 p-md-4">
        <div className="row g-2 mb-3 align-items-center">
          <div className="col-md-7">
            <input className="form-control" placeholder="Search by name, email or position…"
              value={term} onChange={(e) => setTerm(e.target.value)} />
          </div>
          <div className="col-md-5">
            <div className="btn-group w-100" role="group">
              {['All', STATUS.PENDING, STATUS.ACCEPTED, STATUS.REJECTED].map((f) => (
                <button key={f}
                  className={'btn btn-sm ' + (filter === f ? 'btn-brand' : 'btn-outline-secondary')}
                  onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Position</th>
                <th className="text-center">Exp.</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!ready ? (
                <tr><td colSpan="5" className="text-center text-muted py-4">Loading…</td></tr>
              ) : visible.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted py-4">No applications match your search.</td></tr>
              ) : visible.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="avatar">{initials(c.fullName)}</span>
                      <div>
                        <div className="fw-semibold">{c.fullName}</div>
                        <div className="text-muted" style={{ fontSize: 12.5 }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.position}</td>
                  <td className="text-center">{c.experience} yr</td>
                  <td><StatusBadge status={c.status} /></td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-success me-1"
                      disabled={c.status === STATUS.ACCEPTED}
                      onClick={() => changeStatus(c.id, STATUS.ACCEPTED)}>Accept</button>
                    <button className="btn btn-sm btn-outline-danger"
                      disabled={c.status === STATUS.REJECTED}
                      onClick={() => changeStatus(c.id, STATUS.REJECTED)}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
