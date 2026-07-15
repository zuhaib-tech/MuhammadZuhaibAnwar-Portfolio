import PropTypes from 'prop-types'

export default function Section({ heading, children, id }) {
  return (
    <section id={id} style={{ padding: '4rem 0', maxWidth: '1100px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{heading}</h2>
      {children}
    </section>
  )
}

Section.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
}
