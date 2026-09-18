import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="hero mb-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <span className="badge rounded-pill bg-light text-dark mb-3">Now hiring across engineering & design</span>
            <h1 className="display-5 mb-3">Find your next role at Nova.</h1>
            <p className="lead mb-4" style={{ color: '#c3cce0', maxWidth: 520 }}>
              Apply online in minutes. Our team reviews every application and gets back
              to you quickly — no black holes, no endless forms.
            </p>
            <div className="d-flex gap-2">
              <Link href="/apply" className="btn btn-brand btn-lg px-4">Apply now</Link>
              <Link href="/admin" className="btn btn-outline-light btn-lg px-4">Admin dashboard</Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="bg-white rounded-4 p-4 text-dark shadow-sm">
              <h6 className="text-brand mb-3">How it works</h6>
              <ol className="mb-0 ps-3" style={{ lineHeight: 2 }}>
                <li>Open the recruitment form.</li>
                <li>Fill in your details and submit.</li>
                <li>Your application is saved to the system.</li>
                <li>Our team reviews it on the dashboard.</li>
                <li>You’re accepted or rejected with a clear status.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div className="row g-3">
        {[
          ['Candidate form', 'A clean, validated application form for every open role.'],
          ['Admin dashboard', 'Review, search and manage every application in one place.'],
          ['Status management', 'Accept or reject candidates and track their status live.'],
        ].map(([title, text]) => (
          <div className="col-md-4" key={title}>
            <div className="card soft h-100 p-4">
              <h6 className="fw-bold mb-2">{title}</h6>
              <p className="text-muted mb-0" style={{ fontSize: 14 }}>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
