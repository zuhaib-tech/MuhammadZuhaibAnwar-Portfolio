import Head from 'next/head'
// Image optimization removed for SVG to avoid runtime issues
import Layout from '../components/Layout'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import ContactForm from '../components/ContactForm'
import ResumeButton from '../components/ResumeButton'
import SEO from '../components/SEO'
import styles from '../styles/Portfolio.module.css'
import { hero, about, projects, skillGroups, socialLinks } from '../lib/portfolioData'
import { siteUrl, siteImage } from '../lib/siteConfig'

export default function Home() {
  return (
    <Layout>
      <SEO
        title={`${hero.name} | ${hero.title}`}
        description={hero.pitch}
        url={siteUrl}
        image={siteImage}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Head>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Software Engineer • Full Stack Developer • AI Enthusiast</p>
        <h1>{hero.name}</h1>
        <p className={styles.heroTitle}>{hero.title}</p>
        <p className={styles.heroPitch}>{hero.pitch}</p>
        <div className={styles.heroActions}>
          <a className={`${styles.heroAction} ${styles.heroPrimary}`} href="#projects">
            {hero.ctaPrimary}
          </a>
          <a className={`${styles.heroAction} ${styles.heroSecondary}`} href="#contact">
            {hero.ctaSecondary}
          </a>
        </div>
      </section>

      <Section heading="About" id="about">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <p>{about.summary}</p>
            <p>{about.description}</p>
            <p><strong>Core skills:</strong> {about.skills}</p>
            <div className={styles.resumeBlock}>
              <ResumeButton />
            </div>
          </div>
            <div className={styles.aboutCard}>
              <img src="/portfolio-image.jpeg" alt={about.photoAlt} className={styles.aboutImage} />
            <div className={styles.aboutHighlights}>
              <span>Accessible UI</span>
              <span>Reliable APIs</span>
              <span>Modern tooling</span>
            </div>
          </div>
        </div>
      </Section>

      <Section heading="Projects" id="projects">
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Section>

      <Section heading="Skills" id="skills">
        <div className={styles.skillsGrid}>
          {skillGroups.map((group) => (
            <div key={group.name} className={styles.skillsCard}>
              <h3>{group.name}</h3>
              <ul className={styles.skillList}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section heading="Contact" id="contact">
        <div className={styles.contactCard}>
          <p className={styles.contactIntro}>Have a project or idea? Send a message and I’ll get back to you soon.</p>
          <ContactForm />
          <div className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={styles.socialLink}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Section>
    </Layout>
  )
}
