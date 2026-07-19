import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import HomePage from "./pages/home-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;