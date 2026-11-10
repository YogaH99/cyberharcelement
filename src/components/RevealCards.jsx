import { useState } from 'react'

export default function RevealCards({ cards }) {
  const [openCard, setOpenCard] = useState(null)

  return (
    <div className="reveal-activity" aria-label="Cartes à découvrir">
      <p className="activity-hint">Choisis une carte pour découvrir le repère caché.</p>
      <div className="reveal-grid">
        {cards.map((card) => {
          const isOpen = openCard === card.id
          return (
            <button
              className={`reveal-card ${isOpen ? 'reveal-card-open' : ''}`}
              key={card.id}
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenCard(isOpen ? null : card.id)}
            >
              <span className="reveal-icon" aria-hidden="true">{isOpen ? card.icon : '?'}</span>
              <span className="reveal-title">{isOpen ? card.title : card.prompt}</span>
              {isOpen && <span className="reveal-detail">{card.detail}</span>}
              <span className="reveal-action">{isOpen ? 'Masquer' : 'Découvrir'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
