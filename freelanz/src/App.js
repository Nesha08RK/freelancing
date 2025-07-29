import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ContactPage from "./components/ContactPage";
import WebDevelopment from "./components/WebDevelopment";
import GraphicDesign from "./components/GraphicDesign";
import ContentWriting from "./components/ContentWriting";
import DigitalMarketing from "./components/DigitalMarketing";
import Testimonials from "./components/Testimonials";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import TopFreelancers from "./components/TopFreelancers";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import LogoDesign from "./components/LogoDesign";
import HireFreelancer from "./components/HireFreelancer";
import PostJob from "./components/PostJob";
import SubmitProposal from "./components/SubmitProposal";
import FreelancerHome from "./components/FreelancerHome";
import AvailableJobs from "./components/AvailableJobs";

import "./styles/portfolio.css";
import "./styles/stats.css";
import "./styles/testimonials.css";
import "./styles/HowItWorks.css";
import "./styles/contact.css";
import "./styles/services.css";
import "./styles/hire-freelancer.css";
import "./styles/post-job.css";
import "./styles/submit-proposal.css";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            margin: 0,
            padding: 0,
          }}
        >
          <Header />
          <main
            style={{
              flex: "1 0 auto",
              minHeight: "100vh",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/freelancer-home" element={
                <ProtectedRoute role="freelancer">
                  <FreelancerHome />
                </ProtectedRoute>
              } />
              <Route path="/available-jobs" element={
                <ProtectedRoute role="freelancer">
                  <AvailableJobs />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/webdev" element={<WebDevelopment />} />
              <Route path="/graphics" element={<GraphicDesign />} />
              <Route path="/logo-design" element={<LogoDesign />} />
              <Route path="/content-writing" element={<ContentWriting />} />
              <Route path="/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/top-freelancers" element={<TopFreelancers />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/services" element={<Services />} />
              <Route
                path="/freelancers"
                element={
                  <ProtectedRoute>
                    <HireFreelancer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/post-job"
                element={
                  <ProtectedRoute>
                    <PostJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/submit-proposal"
                element={
                  <ProtectedRoute role="freelancer">
                    <SubmitProposal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer style={{ flexShrink: 0, zIndex: 0 }} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;