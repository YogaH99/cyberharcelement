import { useState } from 'react'

export default function BranchingScenario({ scenario }) {
  const [choice, setChoice] = useState(null)
  const chosen = scenario.choices.find((option) => option.id === choice)

  return (
    <div className="branch-activity">
      <div className="branch-scene">
        <span className="branch-avatar" aria-hidden="true">📱</span>
        <div>
          <p className="card-label">SCÉNARIO · TU ES TÉMOIN</p>
          <p>{scenario.scene}</p>
        </div>
      </div>
      <fieldset className="branch-choices">
        <legend>{scenario.question}</legend>
        {scenario.choices.map((option) => (
          <label className={`branch-choice ${choice === option.id ? 'branch-choice-selected' : ''}`} key={option.id}>
            <input type="radio" name="branch-choice" value={option.id} checked={choice === option.id} onChange={() => setChoice(option.id)} />
            <span>{option.text}</span>
          </label>
        ))}
      </fieldset>
      {chosen && (
        <div className={`branch-result ${chosen.recommended ? 'branch-result-recommended' : ''}`} role="status" aria-live="polite">
          <span className="branch-result-icon" aria-hidden="true">{chosen.icon}</span>
          <div>
            <strong>{chosen.title}</strong>
            <p>{chosen.feedback}</p>
            <p className="branch-next-step"><b>Et ensuite ?</b> {chosen.next}</p>
          </div>
        </div>
      )}
    </div>
  )
}
