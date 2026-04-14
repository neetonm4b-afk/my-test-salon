import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Content } from "./pages/Content";
import { Announcements } from "./pages/Announcements";
import { QA } from "./pages/QA";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/content" element={<Content />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/qa" element={<QA />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
