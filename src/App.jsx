import { useAuth } from "./context/AuthProvider";
import Dashboard from "./page/dasboard/Dashboard"
import MaterialDashboard from "./page/home/Home"
import Login from "./page/login/Login";
import POSAdminSystem from "./pos/Pos";


const App = () => {
  const { isAuthenticated, isAdmin, isPosAdmin } = useAuth();
  if (!isAuthenticated) {
    return (
      <Login />
    )
  }
  if (isPosAdmin) {
    return <POSAdminSystem />
  }
  return (
    <>
      <Dashboard />
    </>
  )
}

export default App
