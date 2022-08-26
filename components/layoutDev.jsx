import Layout_Navbar from "./layoutNavbar";


export default function Layout_Dev({ children }) {
  return (
    <>
      <Layout_Navbar />
      <main className="noScroll">{children}</main>
    </>
  )
}