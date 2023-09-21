import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { HomePage } from './pages/HomePage'
import { AppHeader } from './cmps/AppHeader'
import { store } from './store/store'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'

import './assets/style/main.css'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
