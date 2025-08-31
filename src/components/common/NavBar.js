import React, { useRef } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from '../../data/navbar-links'
import { Link, matchPath, useLocation } from "react-router-dom"
import { useSelector } from 'react-redux' 
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import {RxHamburgerMenu} from "react-icons/rx"
import { BsChevronDown } from "react-icons/bs";
import { useEffect,useState } from 'react'
import { apiConnector } from '../../services/apiconnecter'
import { categories } from '../../services/api'
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from '../core/Auth/ProfileDropDown'
import useOnClickOutside from "../../hooks/useOnClickOutside"
const NavBar = () => {
  const ref=useRef(null);
   useOnClickOutside(ref, ()=>{setMobileMenu(false)});

  const [mobileMenu,setMobileMenu]=useState(false);
  const [showCatalogLinks, setShowCatalogLinks] = useState(false);
   const [subLinks, setSubLinks] = useState([]);
     const [loading, setLoading] = useState(false)
  useEffect(() => {
    (async () => {
      
      try {
        const res = await apiConnector("GET", "http://localhost:4000/api/v1/course/showAllCategories");
        console.log("printing categories",res);
        setSubLinks(res.data.allTags);
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [])

    const location=useLocation();
    const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }
   const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {subLinks.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <div className='mr-4 md:hidden text-[#AFB2BF] scale-150'
        onClick={() => setMobileMenu(prev => !prev)}>
            <RxHamburgerMenu />  
         </div>

      </div>
        {
  mobileMenu && (

    
    <div 
    ref={ref}
    className=' absolute top-14 right-0 w-[30%] rounded-lg bg-richblack-800 text-white px-4 py-6 z-50 flex flex-col gap-4 divide-y-[2px] divide-richblack-900 md:hidden'>
      {
      <Link to="/"  onClick={() => setMobileMenu(false)}>Home</Link>
      }
      {
        token!==null &&
        (
          <Link to="/dashboard/my-profile"  onClick={() => setMobileMenu(false)}>Dashboard</Link>
        )
      }
      
      <Link to="/about" onClick={() => setMobileMenu(false)}>About</Link>
    <div>
  <button
    onClick={() => setShowCatalogLinks(prev => !prev)}
    className="flex w-full items-center justify-between text-left text-richblack-25"
  >
    <span>Catalog</span>
    <BsChevronDown
      className={`transition-transform duration-200 ${
        showCatalogLinks ? "rotate-180" : ""
         }`}
    />
  </button>

  {showCatalogLinks && (
    <div className="mt-2 flex flex-col gap-2 pl-4 text-richblack-100">
       {subLinks.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent  pl-4 hover:bg-richblack-600"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
    </div>
  )}
</div>

      <Link to="/contact" onClick={() => setMobileMenu(false)}>Contact</Link>

    {
       token ===null && 
      (
        <Link to ="/signup" onClick={()=>setMobileMenu(false)}>SignUp</Link>
      )
    }
    {
      token===null && 
      (
     <Link to ="/login" onClick={()=>setMobileMenu(false)}>Login</Link>
      )
    }
    
    </div>
  )
}
    </div>
  )
}

export default NavBar
