import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import Services from './pages/Services'
import UseCases from './pages/UseCases'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
}

function PageTransition({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/kardra/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/kardra" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/kardra/products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/kardra/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/kardra/use-cases" element={<PageTransition><UseCases /></PageTransition>} />
          <Route path="/kardra/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/kardra/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/kardra/faq" element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="*" element={<PageTransition><Home /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
