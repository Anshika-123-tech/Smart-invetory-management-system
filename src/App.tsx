import { useState } from "react";
import { LoginPage } from "./components/login-page";
import { DashboardLayout } from "./components/dashboard-layout";
import { DashboardPage } from "./components/dashboard-page";
import { InventoryPage } from "./components/inventory-page";
import { PredictionsPage } from "./components/predictions-page";
import { ReportsPage } from "./components/reports-page";
import { SuppliersPage } from "./components/suppliers-page";
import { UsersPage } from "./components/users-page";
import { SettingsPage } from "./components/settings-page";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "inventory":
        return <InventoryPage />;
      case "predictions":
        return <PredictionsPage />;
      case "reports":
        return <ReportsPage />;
      case "suppliers":
        return <SuppliersPage />;
      case "users":
        return <UsersPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onLogout={handleLogout}
    >
      {renderCurrentPage()}
    </DashboardLayout>
  );
}