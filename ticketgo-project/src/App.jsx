import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PubHomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
