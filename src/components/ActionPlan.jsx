import { useState } from 'react'
import SceneIllustration from './SceneIllustration.jsx'

export default function ActionPlan({ stage }) {
  const [selected, setSelected] = useState([])
  const [showPlan, setShowPlan] = useState(false)

  function toggleStep(id) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const chosenSteps = stage.planSteps.filter((step) => selected.includes(step.id))

  return (
    <div className="goal-panel action-plan">
      <p className="eyebrow">TON MINI PLAN D’ACTION</p>
      <h2>Si tu vois une situation qui inquiète, que pourrais-tu faire ?</h2>
      <p className="activity-hint">Sélectionne les gestes qui te semblent possibles. Il n’y a pas une seule façon d’aider.</p>
      <div className="plan-step-list">
        {stage.planSteps.map((step) => (
          <label className={`plan-step ${selected.includes(step.id) ? 'plan-step-selected' : ''}`} key={step.id}>
            <input type="checkbox" checked={selected.includes(step.id)} onChange={() => toggleStep(step.id)} />
            <span className="plan-step-icon" aria-hidden="true">{step.icon}</span>
            <span><strong>{step.title}</strong><small>{step.short}</small></span>
          </label>
        ))}
      </div>
      <button className="secondary-button" type="button" onClick={() => setShowPlan((shown) => !shown)}>
        {showPlan ? 'Masquer mon plan' : 'Voir mon plan et les repères'}
      </button>
      {showPlan && (
        <div className="personal-plan" role="status" aria-live="polite">
          <div className="summary-layout">
            <SceneIllustration kind={stage.visual} />
            <div>
              <h3>{chosenSteps.length ? 'Tes idées pour agir' : 'Quelques repères pour agir'}</h3>
              <ul className="takeaway-list">
                {(chosenSteps.length ? chosenSteps.map((step) => step.plan) : stage.takeaways).map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </div>
          <p className="help-callout"><span aria-hidden="true">♡</span>{stage.help}</p>
        </div>
      )}
    </div>
  )
}
