import { useState } from 'react'

const ADMIN_USERNAME = 'admin'
const ADMIN_HASH = 'a36aef5a11c4073fbe60314fc9df530a9d5f986533594d1f5190742ff9e0e408'

function sha256Hex(message) {
  const enc = new TextEncoder()
  return crypto.subtle.digest('SHA-256', enc.encode(message)).then((buf) => {
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('')
  })
}

function RoleCard({ title, subtitle, bullets, primary, onClick }) {
  return (
    <div className="role-card">
      <div className="icon-wrap">
        <div className="icon" />
      </div>
      <h3>{title}</h3>
      <p className="card-sub">{subtitle}</p>
      <ul>
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <button className={primary ? 'btn primary' : 'btn outline'} onClick={onClick}>
        {primary ? `Access as ${title.split(' ')[0]}` : `Access as ${title.split(' ')[0]}`}
      </button>
    </div>
  )
}

export default function App() {
  const adminBullets = [
    'Manage contestants and judges',
    'Configure scoring categories',
    'View all scores and rankings',
    'Generate official results',
  ]
  const judgeBullets = [
    'Input contestant scores',
    'Category-based evaluation',
    'Real-time score submission',
    'Simplified scoring interface',
  ]

  const [showLogin, setShowLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  function openAdminLogin() {
    setShowLogin(true)
  }

  function handleLoginSuccess() {
    setShowLogin(false)
    setIsAdmin(true)
  }

  function handleLogout() {
    setIsAdmin(false)
  }

  if (isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return (
    <div id="root">
      <header className="top">
        <div className="shield">
          <svg viewBox="0 0 24 24" width="48" height="48" aria-hidden>
            <path fill="#c62828" d="M12 1l7 3v5c0 5.25-3.75 9-7 10-3.25-1-7-4.75-7-10V4l7-3z" />
            <path fill="#fff" d="M12 6.5c-1.93 0-3.5 1.57-3.5 3.5S10.07 13.5 12 13.5s3.5-1.57 3.5-3.5S13.93 6.5 12 6.5z" />
          </svg>
        </div>
        <h1>MR & MS BatStateU</h1>
        <p className="lead">The NEU - Balayan 2026</p>
        <p className="sublead">Digital Scoresheet & Tabulation System</p>
      </header>

      <main className="cards">
        <RoleCard title="Administrator" subtitle="Full system access and management" bullets={adminBullets} primary onClick={openAdminLogin} />
        <RoleCard title="Judge Panel" subtitle="Scoring and evaluation interface" bullets={judgeBullets} onClick={() => alert('Judge panel not implemented in this demo')} />
      </main>

      <footer className="site-footer">© 2026 Batangas State University - The NEU Balayan</footer>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />}
    </div>
  )
}

function LoginModal({ onClose, onSuccess }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!user || !pass) { setError('Enter username and password'); return }
    sha256Hex(pass).then(h => {
      if (user === ADMIN_USERNAME && h === ADMIN_HASH) {
        onSuccess()
      } else {
        setError('Invalid credentials')
      }
    })
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Administrator Login</h2>
        <p className="muted">Enter your administrator credentials to continue</p>
        <form onSubmit={submit}>
          <label>Username
            <input value={user} onChange={e=>setUser(e.target.value)} placeholder="admin" />
          </label>
          <label>Password
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" />
          </label>
          {error && <div className="error">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="btn outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('contestants')
  const [contestants, setContestants] = useState([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Mr. BatStateU')

  function addContestant(e) {
    e && e.preventDefault()
    if (!name.trim()) return
    setContestants(prev => [...prev, { id: prev.length+1, name: name.trim(), category }])
    setName('')
  }

  const totals = contestants.length
  const mr = contestants.filter(c=>c.category.startsWith('Mr')).length
  const ms = contestants.filter(c=>c.category.startsWith('Ms')).length

  return (
    <div>
      <div className="admin-header">
        <div className="admin-title">ADMINISTRATOR <span className="muted">Full System Access</span></div>
        <div className="admin-actions"><button className="btn outline" onClick={onLogout}>Logout</button></div>
      </div>

      <nav className="admin-tabs">
        <button className={tab==='contestants'? 'active' : ''} onClick={()=>setTab('contestants')}>Contestants</button>
        <button className={tab==='judges'? '': ''} onClick={()=>setTab('judges')}>Judges</button>
        <button onClick={()=>setTab('categories')}>Categories</button>
        <button onClick={()=>setTab('scoring')}>Scoring</button>
        <button onClick={()=>setTab('results')}>Results</button>
      </nav>

      <section className="admin-content">
        {tab==='contestants' && (
          <div>
            <div className="card-panel">
              <h4>Add New Contestant</h4>
              <p className="muted">Register contestants for the pageant competition</p>
              <form className="add-form" onSubmit={addContestant}>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter full name" />
                <select value={category} onChange={e=>setCategory(e.target.value)}>
                  <option>Mr. BatStateU</option>
                  <option>Ms. BatStateU</option>
                </select>
                <button className="btn primary" type="submit">+ Add Contestant</button>
              </form>
            </div>

            <div className="stats-row">
              <div className="stat"> <div className="stat-num">{totals}</div><div className="muted">Total Contestants</div></div>
              <div className="stat"> <div className="stat-num">{mr}</div><div className="muted">Mr. BatStateU</div></div>
              <div className="stat"> <div className="stat-num">{ms}</div><div className="muted">Ms. BatStateU</div></div>
            </div>

            <div className="lists">
              <div className="list">
                <h5>Mr. BatStateU</h5>
                <div className="list-body">
                  {contestants.filter(c=>c.category.startsWith('Mr')).map(c=> (
                    <div key={c.id} className="list-row"><div className="badge">{c.id}</div><div className="name">{c.name}</div></div>
                  ))}
                  {contestants.filter(c=>c.category.startsWith('Mr')).length===0 && <div className="muted">No contestants registered yet</div>}
                </div>
              </div>

              <div className="list">
                <h5>Ms. BatStateU</h5>
                <div className="list-body">
                  {contestants.filter(c=>c.category.startsWith('Ms')).map(c=> (
                    <div key={c.id} className="list-row"><div className="badge">{c.id}</div><div className="name">{c.name}</div></div>
                  ))}
                  {contestants.filter(c=>c.category.startsWith('Ms')).length===0 && <div className="muted">No contestants registered yet</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab==='judges' && <div><h3>Judges</h3><p className="muted">Manage judges (placeholder)</p></div>}
        {tab==='categories' && <div><h3>Categories</h3><p className="muted">Configure scoring categories (placeholder)</p></div>}
        {tab==='scoring' && <div><h3>Scoring</h3><p className="muted">Scoring interface (placeholder)</p></div>}
        {tab==='results' && <div><h3>Results</h3><p className="muted">Official results and export (placeholder)</p></div>}
      </section>
    </div>
  )
}
