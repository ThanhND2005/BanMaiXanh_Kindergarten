import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Toaster} from 'sonner'
import {SigninPage} from './pages/SigninPage'
import {SignupPage} from './pages/SignupPage'
import HomePageAdmin from './pages/HomePageAdmin'
import HomePageTeacher from './pages/HomePageTeacher'
import HomePageParent from './pages/HomePageParent'
function App() {


  return (
    <>
      <Toaster richColors/>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/signin' element={<SigninPage/>}/>
          <Route path='/admin' element={<HomePageAdmin/>}/>
          <Route path='/teacher' element={<HomePageTeacher/>}/>
          <Route path='/' element={<HomePageParent/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
