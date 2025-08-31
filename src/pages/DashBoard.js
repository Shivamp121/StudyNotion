
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import useOnClickOutside from '../hooks/useOnClickOutside';
import Sidebar from "../components/core/DashBoard/Sidebar"
import { useRef, useState } from "react";
import ConfirmationModal from "../components/common/ConfirmationModal";

function Dashboard() {
   const [isSidebarOpen, setSidebarOpen] = useState(false);
  const ref=useRef(null);
   useOnClickOutside(ref, ()=>{setSidebarOpen(false)});
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
       <button
        className="md:hidden absolute top-2 left-4 z-50 text-3xl text-white"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        &#9776;
      </button>
      <div
        className={`fixed md:static top-14 left-0 h-full z-40  transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
        
        ref={ref}

      >
        <Sidebar
        // confirmationModal={confirmationModal}
        setConfirmationModal={setConfirmationModal} />
      </div>
      {/* <Sidebar/> */}
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
      {confirmationModal && (
     <ConfirmationModal modalData={confirmationModal} />
)}
    </div>
  )
}

export default Dashboard
