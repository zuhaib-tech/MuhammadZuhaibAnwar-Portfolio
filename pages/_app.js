import PropTypes from 'prop-types'
import '../styles/globals.css'
import '../sentry.client.config'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
}
