export function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="landing__container footer__inner">
        <p className="footer__copy">
          © {new Date().getFullYear()} AstraPanel by QuantAstraAI. All rights reserved.
        </p>
        <ul className="footer__links">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
