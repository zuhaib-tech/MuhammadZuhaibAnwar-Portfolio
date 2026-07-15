import Image from 'next/image'
import PropTypes from 'prop-types'
import styles from '../styles/Portfolio.module.css'

export default function ProjectCard({ project }) {
  return (
    <article className={styles.projectCard}>
      <Image src={project.image} alt={`${project.title} preview`} width={800} height={500} className={styles.projectImage} />
      <div className={styles.projectContent}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className={styles.projectTags}>
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className={styles.projectLinks}>
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.projectLink}>
            Live
          </a>
          <a href={project.repoUrl} target="_blank" rel="noreferrer" className={styles.projectLink}>
            Code
          </a>
        </div>
      </div>
    </article>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    liveUrl: PropTypes.string.isRequired,
    repoUrl: PropTypes.string.isRequired,
  }).isRequired,
}
