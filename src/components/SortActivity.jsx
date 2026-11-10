import { useState } from 'react'

const buckets = [
  { id: 'signal', title: 'Indice à prendre au sérieux', icon: '🔎' },
  { id: 'context', title: 'À vérifier avec le contexte', icon: '💭' },
]

export default function SortActivity({ items }) {
  const [choices, setChoices] = useState({})
  const [revealed, setRevealed] = useState(false)
  const complete = items.every((item) => choices[item.id])

  return (
    <div className="activity-block sort-activity">
      <p className="activity-hint">Fais glisser les cartes dans une zone ou touche une zone pour les classer. Tu peux aussi utiliser les boutons.</p>
      <div className="sort-card-bank" aria-label="Cartes à classer">
        {items.filter((item) => !choices[item.id]).map((item) => (
          <article className="sort-card sort-card-unassigned" key={item.id} draggable={!revealed} onDragStart={(event) => event.dataTransfer.setData('text/plain', item.id)}>
            <p>{item.text}</p>
            <div className="sort-move-buttons" aria-label="Choisir une catégorie">
              {buckets.map((bucket) => (
                <button key={bucket.id} type="button" onClick={() => setChoices((previous) => ({ ...previous, [item.id]: bucket.id }))}>
                  {bucket.icon} {bucket.title}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="sort-board">
        {buckets.map((bucket) => (
          <section
            className="sort-bucket"
            key={bucket.id}
            aria-label={bucket.title}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              const itemId = event.dataTransfer.getData('text/plain')
              if (itemId) setChoices((previous) => ({ ...previous, [itemId]: bucket.id }))
            }}
          >
            <h2><span aria-hidden="true">{bucket.icon}</span>{bucket.title}</h2>
            {items.filter((item) => choices[item.id] === bucket.id).map((item) => (
              <article className={`sort-card ${revealed ? (item.answer === bucket.id ? 'sort-card-correct' : 'sort-card-review') : ''}`} key={item.id}>
                <p>{item.text}</p>
                {revealed && <p className="sort-explanation">{item.feedback}</p>}
                {!revealed && <div className="sort-move-buttons" aria-label={`Changer la catégorie de : ${item.text}`}>
                  {buckets.filter((option) => option.id !== bucket.id).map((option) => (
                    <button key={option.id} type="button" onClick={() => setChoices((previous) => ({ ...previous, [item.id]: option.id }))}>
                      Déplacer vers « {option.title} »
                    </button>
                  ))}
                </div>}
              </article>
            ))}
          </section>
        ))}
      </div>
      {!revealed ? (
        <button className="secondary-button" type="button" disabled={!complete} onClick={() => setRevealed(true)}>
          Comparer avec les repères
        </button>
      ) : (
        <div className="feedback-box feedback-review" role="status">
          <strong>Un indice ne raconte pas toute l’histoire.</strong>
          <p>La répétition et le refus d’arrêter sont des signaux importants. Une photo diffusée ou un message isolé doivent aussi être compris dans leur contexte.</p>
        </div>
      )}
    </div>
  )
}
