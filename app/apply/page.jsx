'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  POSITIONS, QUALIFICATIONS, SKILLS, MAX_CV_MB,
  emptyCandidate, validateCandidate,
} from '../lib/model.js'
import { addCandidate } from '../lib/store.js'

export default function ApplyPage() {
  const [data, setData] = useState(emptyCandidate())
  const [cvFile, setCvFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(null)

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }))

  const onCv = (e) => {
    const f = e.target.files[0] || null
    setCvFile(f)
    set('cvName', f ? f.name : '')
    if (f && f.size > MAX_CV_MB * 1024 * 1024) {
      setErrors((x) => ({ ...x, cv: `CV must be under ${MAX_CV_MB} MB.` }))
    } else {
      setErrors((x) => ({ ...x, cv: undefined }))
    }
  }

  const toggleSkill = (s) =>
    setData((d) => ({
      ...d,
      skills: d.skills.includes(s) ? d.skills.filter((x) => x !== s) : [...d.skills, s],
    }))

  const submit = (e) => {
    e.preventDefault()
    const { errors, isValid } = validateCandidate(data)
    if (cvFile && cvFile.size > MAX_CV_MB * 1024 * 1024) errors.cv = `CV must be under ${MAX_CV_MB} MB.`
    setErrors(errors)
    if (Object.keys(errors).filter((k) => errors[k]).length === 0 && isValid) {
      const rec = addCandidate(data)
      setDone(rec)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (done) {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card soft p-4 p-md-5 text-center">
            <div className="mx-auto mb-3 d-grid" style={{ width: 66, height: 66, borderRadius: '50%', background: '#e7f6ee', placeItems: 'center' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16794f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h3 className="fw-bold">Application submitted</h3>
            <p className="text-muted">Thanks, {done.fullName.split(' ')[0]}. Your application for <strong>{done.position}</strong> has been received and is now <strong>Pending</strong> review.</p>
            <div className="d-flex gap-2 justify-content-center mt-2">
              <button className="btn btn-brand" onClick={() => { setDone(null); setData(emptyCandidate()); setCvFile(null); setErrors({}) }}>Submit another</button>
              <Link className="btn btn-outline-secondary" href="/admin">View on dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const inv = (k) => (errors[k] ? 'is-invalid' : '')

  return (
    <div className="row justify-content-center">
      <div className="col-lg-9">
        <div className="card soft p-4 p-md-5">
          <h3 className="fw-bold mb-1">Apply for a role</h3>
          <p className="text-muted mb-4">Fill in your details below. All fields are required.</p>

          <form onSubmit={submit} noValidate className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Full name</label>
              <input className={`form-control ${inv('fullName')}`} value={data.fullName}
                onChange={(e) => set('fullName', e.target.value)} placeholder="e.g. Ayesha Khan" />
              <div className="invalid-feedback">{errors.fullName}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Email address</label>
              <input type="email" className={`form-control ${inv('email')}`} value={data.email}
                onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
              <div className="invalid-feedback">{errors.email}</div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Phone number</label>
              <input type="tel" className={`form-control ${inv('phone')}`} value={data.phone}
                onChange={(e) => set('phone', e.target.value)} placeholder="+92 300 1234567" />
              <div className="invalid-feedback">{errors.phone}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Experience (years)</label>
              <input type="number" min="0" className={`form-control ${inv('experience')}`} value={data.experience}
                onChange={(e) => set('experience', e.target.value)} placeholder="e.g. 3" />
              <div className="invalid-feedback">{errors.experience}</div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Position applied for</label>
              <select className={`form-select ${inv('position')}`} value={data.position}
                onChange={(e) => set('position', e.target.value)}>
                <option value="">Select position…</option>
                {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <div className="invalid-feedback">{errors.position}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Highest qualification</label>
              <select className={`form-select ${inv('qualification')}`} value={data.qualification}
                onChange={(e) => set('qualification', e.target.value)}>
                <option value="">Select qualification…</option>
                {QUALIFICATIONS.map((q) => <option key={q} value={q}>{q}</option>)}
              </select>
              <div className="invalid-feedback">{errors.qualification}</div>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold d-block">Gender</label>
              {['Male', 'Female', 'Other'].map((g) => (
                <div className="form-check form-check-inline" key={g}>
                  <input className="form-check-input" type="radio" name="gender" id={`g-${g}`}
                    checked={data.gender === g} onChange={() => set('gender', g)} />
                  <label className="form-check-label" htmlFor={`g-${g}`}>{g}</label>
                </div>
              ))}
              {errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold d-block">Skills</label>
              <div className="d-flex flex-wrap gap-3">
                {SKILLS.map((s) => (
                  <div className="form-check chip" key={s}>
                    <input className="form-check-input" type="checkbox" id={`s-${s}`}
                      checked={data.skills.includes(s)} onChange={() => toggleSkill(s)} />
                    <label className="form-check-label" htmlFor={`s-${s}`}>{s}</label>
                  </div>
                ))}
              </div>
              {errors.skills && <div className="text-danger small mt-1">{errors.skills}</div>}
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Upload CV</label>
              <input type="file" accept=".pdf,.doc,.docx" className={`form-control ${inv('cv')}`} onChange={onCv} />
              <div className="form-text">PDF, DOC or DOCX · up to {MAX_CV_MB} MB</div>
              {errors.cv && <div className="text-danger small mt-1">{errors.cv}</div>}
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-brand btn-lg w-100">Submit application</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
