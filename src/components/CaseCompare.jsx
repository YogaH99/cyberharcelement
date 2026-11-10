import { useState } from 'react'
import SceneIllustration from './SceneIllustration.jsx'

export default function CaseCompare({ situations }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="case-compare">
      <p className="activity-hint">Explore les dossiers : découvre comment le contexte change la lecture d’une situation.</p>
      <div className="case-grid">
        {situations.map((situation) => {
          const open = openId === situation.id
          return (
            <article className={`case-card ${open ? 'case-card-open' : ''}`} key={situation.id}>
              <span className="scenario-letter">{situation.id}</span>
              <SceneIllustration kind={situation.visual} compact />
              <h2>{situation.title}</h2>
              <p>{situation.text}</p>
              <button className="case-toggle" type="button" aria-expanded={open} onClick={() => setOpenId(open ? null : situation.id)}>
                {open ? 'Refermer le dossier' : 'Découvrir les indices'}
                <span aria-hidden="true">{open ? '−' : '+'}</span>
              </button>
              {open && (
                <div className="case-analysis" role="region" aria-label={`Analyse : ${situation.title}`}>
                  <p className="case-category">{situation.label}</p>
                  <p>{situation.feedback}</p>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
