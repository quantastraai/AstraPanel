const STEPS = [
  {
    num: '01',
    title: 'Import transactions',
    text: 'Connect bank, UPI, Stripe, or upload CSV. Every transaction is categorized automatically.',
  },
  {
    num: '02',
    title: 'Track revenue & expenses',
    text: 'Revenue charts and expense breakdowns update in real time. Pin crypto and stock widgets alongside.',
  },
  {
    num: '03',
    title: 'Generate reports',
    text: 'Export monthly P&L, cash flow, and tax summaries — share PDFs with your team or accountant.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="landing__container">
        <p className="section__eyebrow">Workflow</p>
        <h2 className="section__title">From data to decisions in three steps</h2>
        <p className="section__desc">
          Start with transactions, visualize revenue and expenses, then pull
          reports when you need them.
        </p>

        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.num} className="step">
              <div className="step__num">{s.num}</div>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
