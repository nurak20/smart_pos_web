import { useAuth } from "./context/AuthProvider";
import Dashboard from "./page/dasboard/Dashboard"
import MaterialDashboard from "./page/home/Home"
import Login from "./page/login/Login";
import POSAdminSystem from "./pos/Pos";


const App = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) {
    return (
      <Login />
    )
  }
  return (
    <>
      {/* <Dashboard /> */}
      <POSAdminSystem />
    </>
  )
}

export default App
