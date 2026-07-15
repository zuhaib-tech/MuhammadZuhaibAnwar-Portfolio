export default function ResumeButton() {
  return (
    <a
      href="/resume.pdf"
      download
      style={{ display: 'inline-block', padding: '0.9rem 1.4rem', background: '#111827', color: '#fff', borderRadius: '999px', textDecoration: 'none' }}>
      Download Resume
    </a>
  )
}
