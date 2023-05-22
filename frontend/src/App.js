import HomePage from "./pages/login-registration/home";
import StudentLoginForm from "./pages/login-registration/student-login";
import VendorLoginForm from "./pages/login-registration/vendor-login";
import RegistrationForm from "./pages/login-registration/registration";
import StudentHomePage from "./pages/student/student-home";
import QrScannerPage from "./pages/student/qr-scanner";
import StudentLogoutPage from "./pages/student/logout";
import VendorHomePage from "./pages/vendor/vendor-home";
import QrCodeRequest from "./pages/vendor/qr-generator";
import VendorLogoutPage from "./pages/vendor/logout";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student/login" element={<StudentLoginForm />} />
        <Route path="/vendor/login" element={<VendorLoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
      <Routes>
        <Route path="/student/home" element={<StudentHomePage />} />
        <Route path="/student/home/qr-scanner" element={<QrScannerPage />} />
        <Route path="/student/home/transaction-history" />
        <Route
          path="/student/home/confirm-logout"
          element={<StudentLogoutPage />}
        />
      </Routes>
      <Routes>
        <Route path="/vendor/home" element={<VendorHomePage />} />
        <Route
          path="/vendor/home/generate-transaction"
          element={<QrCodeRequest />}
        />
        <Route path="/student/home/transaction-history" />
        <Route
          path="/vendor/home/confirm-logout"
          element={<VendorLogoutPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
