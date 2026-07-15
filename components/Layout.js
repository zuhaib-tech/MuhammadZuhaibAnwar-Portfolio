import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="site-root">
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
