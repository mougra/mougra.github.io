import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import Navigation from './components/Navigation'
import AboutUsPage from './Pages/AboutUsPage'
import FavoritesPage from './Pages/FavoritesPage'
import CharactersPage from './Pages/CharactersPage'
import EpisodesPage from './Pages/EpisodesPage'
import LocationsPage from './Pages/LocationsPage'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/characters' element={<CharactersPage />} />
        <Route path='/locations' element={<LocationsPage />} />
        <Route path='/episodes' element={<EpisodesPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='/aboutus' element={<AboutUsPage />} />
      </Routes>
    </>
  )
}

export default App
