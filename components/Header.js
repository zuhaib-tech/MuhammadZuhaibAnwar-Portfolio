import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav">
        <a href="#" className="brand">Muhammad Zuhaib Anwar</a>
        <div className="navLinks">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <ThemeToggle />
      </nav>
    </header>
  )
}
