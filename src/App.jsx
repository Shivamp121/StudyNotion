import "./App.css";
import { Link,Links, useNavigate } from "react-router-dom";
import { Route,Routes,Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import NavBar from "./components/common/NavBar";
import ForgotPass from "./pages/ForgotPass";
import UpdatePass from "./pages/UpdatePass";
import UpdatePamessage from "./pages/UpdatePamessage";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";

import PrivateRoute from "./components/core/Auth/PrivateRoute"
import Dashboard from "./pages/DashBoard";
import MyProfile from "./components/core/DashBoard/MyProfile"
import Settings from "./components/core/DashBoard/Settings"
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import ContactUs from "./pages/ContactUs";
import EnrolledCourses from "./components/core/DashBoard/EnrolledCourses";
import Cart from "./components/core/DashBoard/Cart";
import AddCourse from "./components/core/DashBoard/AddCourse";
import MyCourse from "./components/core/DashBoard/MyCourse";
import EditCourse from "./components/core/DashBoard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
import Instructor from "./components/core/DashBoard/InstructorDashboard/Instructor";
function App() {
   const { user } = useSelector((state) => state?.profile)
  
   console.log("User:", user);
   console.log("Account Type:", user?.accountType);
  return (
    
  <div className="overflow-x-hidden w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    
    <NavBar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="catalog/:catalogName" element={<Catalog/>} />
     <Route path="courses/:courseId" element={<CourseDetails/>} />
    <Route path="/signup" element={<Signup/>} />
     <Route path="/login" element={<Login/>} />
     <Route path="/forgot-password" element={<ForgotPass/>} />
      <Route path="update-password/:id" element={<UpdatePass/>} />
      <Route path="/password-updated" element={<UpdatePamessage/>} />
      <Route path="/verify-email" element={<VerifyEmail/>} />
      <Route path="/about" element={<About/>} />
       <Route path="/contact" element={<ContactUs/>} />
       <Route  path="dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="my-profile" element={<MyProfile />} />
      
      <Route path="settings" element={<Settings />} />
      

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="cart" element={<Cart />} />
          <Route path="enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }
       <Route path="instructor" element={<Instructor />} />
      <Route path="add-course" element={ <AddCourse /> }/>
      <Route path="my-courses" element={ <MyCourse /> }/>
      <Route path="edit-course/:courseId" element={<EditCourse />} />
     
    </Route>
    
     <Route element={
        <PrivateRoute>
          <ViewCourse/>
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails/>}
          />
          </>
        )
      }

      </Route>
    
  </Routes>
  </div>
  );
}

export default App;
