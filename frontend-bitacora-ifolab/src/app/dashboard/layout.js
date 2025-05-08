import Navbar from "../components/navbar/navbar.component"

export default async function DashboardLayout({ children }) {


  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}