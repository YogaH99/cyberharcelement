import { useEffect, useState } from 'react'
import ProgressBar from './components/ProgressBar.jsx'
import SceneIllustration from './components/SceneIllustration.jsx'
import RevealCards from './components/RevealCards.jsx'
import SortActivity from './components/SortActivity.jsx'
import BranchingScenario from './components/BranchingScenario.jsx'
import ActionPlan from './components/ActionPlan.jsx'
import CaseCompare from './components/CaseCompare.jsx'
import { courseStages } from './content/course.js'

function Welcome({ onStart, finished }) {
  return (
    <section className="hero" id="accueil" aria-labelledby="page-title">
      <div className="hero-copy">
        <p className="eyebrow">CAPSULE INTERACTIVE · 13–15 ANS</p>
        <h1 id="page-title">Reconnaître une situation de cyberharcèlement</h1>
        <p className="intro">
          Apprends à repérer les indices importants, à comparer différentes
          situations et à savoir quand demander de l’aide.
        </p>
        <div className="welcome-mobile-art">
          <SceneIllustration kind="welcome" />
        </div>
        <ul className="learning-goals">
          <li><span aria-hidden="true">✓</span> Repérer les comportements préoccupants</li>
          <li><span aria-hidden="true">✓</span> Distinguer conflit, plaisanterie et situation possible de cyberharcèlement</li>
          <li><span aria-hidden="true">✓</span> Analyser une nouvelle situation</li>
        </ul>
        <button className="start-button" onClick={onStart}>
          {finished ? 'Revoir la capsule' : 'Commencer la capsule'}
          <span aria-hidden="true">→</span>
        </button>
        <p className="privacy-note">Activité individuelle · À ton rythme · Aucune réponse n’est envoyée</p>
      </div>

      <aside className="side-card" aria-label="Aperçu du parcours">
        <div className="illustration" aria-hidden="true">
          <SceneIllustration kind="welcome" />
        </div>
        <div className="side-card-copy">
          <p className="card-label">TON PARCOURS</p>
          <p>{finished ? 'Bravo, tu as terminé les six étapes.' : '6 étapes pour mieux comprendre les situations en ligne.'}</p>
          <div className="step-dots" aria-label="Six étapes">
            {courseStages.map((stage, index) => <span key={stage.id} className={index === 0 ? 'active' : ''} />)}
          </div>
        </div>
      </aside>
    </section>
  )
}

function App() {
  const [currentStep, setCurrentStep] = useState(-1)
  const [finished, setFinished] = useState(false)
  const stage = currentStep >= 0 ? courseStages[currentStep] : null

  useEffect(() => {
    if (currentStep >= 0) document.getElementById('stage-title')?.focus()
  }, [currentStep])

  function startCourse() {
    setFinished(false)
    setCurrentStep(0)
  }

  function goNext() {
    if (currentStep === courseStages.length - 1) {
      setFinished(true)
      setCurrentStep(-1)
      return
    }
    setCurrentStep((step) => Math.min(step + 1, courseStages.length - 1))
  }

  function goPrevious() {
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setCurrentStep(-1)} aria-label="Retour à l’accueil de la capsule">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>Capsule citoyenne</span>
        </button>
        <span className="duration"><span aria-hidden="true">◷</span> 8 min</span>
      </header>

      {!stage ? (
        <Welcome onStart={startCourse} finished={finished} />
      ) : (
        <section className="course-view" aria-labelledby="stage-title">
          <ProgressBar current={currentStep} total={courseStages.length} title={stage.title} />
          <article className="lesson-card">
            <div className="stage-heading">
              <div>
                <p className="eyebrow">ÉTAPE {currentStep + 1} · {stage.duration}</p>
                <h1 id="stage-title" tabIndex="-1">{stage.title}</h1>
              </div>
              <span className="stage-time" aria-label={`Durée estimée : ${stage.duration}`}>{stage.duration}</span>
            </div>
            <p className="lesson-instruction">{stage.instruction}</p>

            {stage.type === 'intro' && (
              <div className="intro-illustration-row">
                <SceneIllustration kind={stage.visual} />
                <div className="goal-panel">
                  <h2>À la fin, tu pourras :</h2>
                  <ul className="takeaway-list">
                    <li>repérer plusieurs indices dans une situation en ligne ;</li>
                    <li>distinguer un désaccord ponctuel d’une humiliation répétée ;</li>
                    <li>expliquer pourquoi une situation peut nécessiter de l’aide.</li>
                  </ul>
                  <p className="gentle-note">On cherche des indices pour mieux comprendre, pas à poser un diagnostic.</p>
                </div>
              </div>
            )}

            {stage.type === 'resource' && (
              <div className="resource-layout">
                <SceneIllustration kind={stage.visual} />
                <div className="resource-content">
                  <RevealCards cards={stage.cards} />
                  <div className="resource-card">
                    <span className="resource-icon" aria-hidden="true">↗</span>
                    <div>
                      <p className="card-label">POUR ALLER PLUS LOIN</p>
                      <h2>{stage.resourceTitle}</h2>
                      <p>{stage.resourceSource}</p>
                    </div>
                    <a className="resource-link" href={stage.resourceUrl} target="_blank" rel="noreferrer">
                      Ouvrir l’infographie <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {stage.type === 'sort' && (
              <div className="activity-block">
                <div className="conversation-scene-row">
                  <SceneIllustration kind={stage.visual} compact />
                  <div className="conversation" aria-label="Conversation fictive entre Nathan, Emma et Lucas">
                    {stage.conversation.map((line, index) => (
                      <p className={`chat-line chat-${index % 2}`} key={`${line.speaker}-${index}`}>
                        <strong>{line.speaker}</strong><span>{line.text}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <SortActivity items={stage.items} />
              </div>
            )}

            {stage.type === 'compare' && <CaseCompare situations={stage.situations} />}

            {stage.type === 'branch' && <BranchingScenario scenario={stage.scenario} />}

            {stage.type === 'summary' && (
              <ActionPlan stage={stage} />
            )}

            <nav className="lesson-navigation" aria-label="Navigation de la capsule">
              <button className="back-button" onClick={goPrevious} disabled={currentStep === 0}>← Précédent</button>
              <button className="start-button" onClick={goNext}>
                {currentStep === courseStages.length - 1 ? 'Terminer la capsule' : 'Continuer'}
                <span aria-hidden="true">→</span>
              </button>
            </nav>
          </article>
        </section>
      )}

      <footer className="footer-note">
        En cas de doute, parle à un adulte de confiance. Cette capsule aide à repérer des indices ; elle ne pose pas de diagnostic.
      </footer>
    </main>
  )
}

export default App
