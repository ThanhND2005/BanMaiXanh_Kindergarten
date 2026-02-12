import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { SigninPage } from "./pages/SigninPage";
import { SignupPage } from "./pages/SignupPage";
import HomePageAdmin from "./pages/HomePageAdmin";
import HomePageTeacher from "./pages/HomePageTeacher";
import HomePageParent from "./pages/HomePageParent";
import ProtectedRoute from "./components/auth/ProtectedRoute";
function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin" element={<HomePageAdmin />} />
          </Route>
          <Route element={<ProtectedRoute allowedRole="teacher" />}>
            <Route path="/teacher" element={<HomePageTeacher />} />
          </Route>
          <Route element={<ProtectedRoute allowedRole="parent" />}>
            <Route path="/" element={<HomePageParent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
