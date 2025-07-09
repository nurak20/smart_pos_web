import { useAuth } from "./context/AuthProvider";
import Dashboard from "./page/dasboard/Dashboard"
import MaterialDashboard from "./page/home/Home"
import Login from "./page/login/Login";


const App = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) {
    return (
      <Login />
    )
  }
  return (
    <>
      <Dashboard />
    </>
  )
}

export default App
