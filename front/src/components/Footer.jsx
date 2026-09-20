import { Link } from 'react-router-dom'

const style = {
  footer: {
    width: '100%',
    backgroundColor: '#4790ff', // Base vibrant blue
    backgroundImage: `
      radial-gradient(circle at 10% 20%, rgba(255, 182, 71, 0.25) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(15, 17, 35, 0.35) 0%, transparent 50%)
    `,
    color: '#fff',
    padding: '5rem 8% 3rem 8%',
    display: 'flex',
    flexDirection: 'column',
    gap: '3.5rem',
  
    position: 'relative',
    overflow: 'hidden',
  },
  topSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justify: 'space-between',
    alignItems: 'center',
    gap: '3rem',
  },
  brandColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    maxWidth: '380px',
    marginInlineEnd: 'auto',
  },
  logoWrapper: {
    display: 'inline-block',
    padding: '12px 20px',
    background: 'rgba(15, 17, 35, 0.25)',
    borderRadius: '24px',
    border: '2px solid #fffbf4cc',
    boxShadow: '0 0 20px rgba(255, 182, 71, 0.35), inset 0 0 10px rgba(255, 182, 71, 0.15)',
    transform: 'rotate(-2deg)',
    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
    height:'90px',
    width: 'min(80vw, 500px)',
  },
  logo: {
   width: '100%',
    height: '100%',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 12px rgba(15, 17, 35, 0.3))',
  },
  tagline: {
    color: '#F8FAFC',
    fontSize: '1.05rem',
    lineHeight: '1.6',
    margin: 0,
    fontWeight: '500',
    textShadow: '0 1px 2px rgba(0,0,0,0.15)',
  },
  linksGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent:'center',
  },
  cardColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    background: 'rgba(15, 17, 35, 0.25)', // Darker translucent backdrop for strong legibility
    backdropFilter: 'blur(12px)',
    padding: '1.75rem 2rem',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
    minWidth: '160px',
  },
  heading: {
    color: '#ffb647', // Primary warm yellow/orange accent
    fontSize: '1.25rem',
    fontWeight: '800',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '0.25rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  link: {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'lowercase',
    display: 'inline-block',
    transition: 'all 0.2s ease',
  },
  bottomSection: {
    borderTop: '1px solid rgba(255, 255, 255, 0.25)',
    paddingTop: '2rem',
    display: 'flex',
    flexWrap: 'wrap',
    justify: 'space-between',
    alignItems: 'center',
    gap: '1.5rem',
    fontSize: '0.9rem',
    color: '#E2E8F0',
  },
  copyright: {
    margin: 0,
    fontWeight: '500',
  },
  legalLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  badge: {
    background: '#ffb647',
    color: '#0F1123',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    marginLeft: '6px',
    verticalAlign: 'middle',
  }
}

function Footer() {
  return (
    <footer className="footer" style={style.footer}>
      {/* Injecting CSS for interactive hover states matching #ffb647 */}
      <style>{`
        .funky-logo-wrapper:hover {
          transform: rotate(2deg) scale(1.05) !important;
          border-color: #FFFFFF !important;
          box-shadow: 0 0 35px rgba(255, 182, 71, 0.6) !important;
        }
        .funky-link:hover {
          color: #ffb647 !important;
          transform: translateX(6px);
        }
      `}</style>

      {/* Upper Footer */}
      <div style={style.topSection}>
        <div style={style.brandColumn}>
          <Link to="/" className="funky-logo-wrapper" style={style.logoWrapper}>
            <img src='https://res.cloudinary.com/du6d1qifw/image/upload/v1789199121/muttajahSite/logoipsum-380_jsncbq.png' alt="logo" style={style.logo} />
          </Link>
          <p style={style.tagline}>
            Ready for your next adventure? ✨ Explore forecasts, secret spots, and epic journeys! 🚀
          </p>
        </div>

        <div style={style.linksGroup}>
          {/* Navigation Card */}
          <div style={style.cardColumn}>
            <span style={style.heading}>Explore ⚡</span>
            <Link to="/posts" className="funky-link" style={style.link}>discover</Link>
            <a href="/about " className="funky-link" style={style.link}>about</a>
            <a href="/contact" className="funky-link" style={style.link}>contact</a>
          </div>

          {/* Social Card */}
          <div style={style.cardColumn}>
            <span style={style.heading}>Hang Out ✌️</span>
            <a href="#" className="funky-link" style={style.link}>twitter / x</a>
            <a href="#" className="funky-link" style={style.link}>github</a>
            <a href="#" className="funky-link" style={style.link}>
              linkedin <span style={style.badge}>NEW</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={style.bottomSection}>
        <p style={style.copyright}>
          &copy; {new Date().getFullYear()} Your Company. Crafted with 💙 & playful vibes.
        </p>

        <div style={style.legalLinks}>
          <a href="/privacy-policy" className="funky-link" style={style.link}>privacy policy</a>
          <a href="/terms-of-service" className="funky-link" style={style.link}>terms of service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer