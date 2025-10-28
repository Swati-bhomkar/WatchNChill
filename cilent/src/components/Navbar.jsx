import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';


const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false); //when mobile menu is open or closed
  const { user, setUser } = useAppContext();//get user from context
  const [showDropdown, setShowDropdown] = React.useState(false); 
  const navigate = useNavigate();

  return (
         // Navbar container to be  top fixed with full width
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-3">
      {/* Logo */}
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logos} alt="Logo" className="w-56 h-auto" />
      </Link>

      {/* Navigation links */}
      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50
          flex flex-col md:flex-row items-center max-md:justify-center gap-8 md:px-8 py-3 max-md:h-screen md:rounded-full
          backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300
          ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}
      >
        {/* Close (mobile) in mobile screen*/}
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        {/* Nav links */}
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to="/">Home</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to="/movies">Movies</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to="/">Snacks</Link>
        {user && (
            <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to="/favorite">Favorites</Link>
        )}
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to="/About">About</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to="/">Contact</Link>
      </div>

      {/* search icon*/}
      <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />

        {!user ? (<button
          onClick={() => navigate('/login')}
          className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">Login
        </button> //if user  not login then login button
        ) : (
          <div className='relative group'>
            <img src={assets.profiles} alt="profile" className='w-10' />
            <ul className={`${showDropdown ? 'block' : 'hidden'} group-hover:block absolute top-10 right-0 bg-black/50 backdrop-blur-md shadow border border-gray-700 py-2.5 w-40 rounded-md text-sm z-40 text-white`}>
              <li onClick={() => { setShowDropdown(false); navigate('/my-bookings'); }} className='p-1.5 pl-3 hover:bg-gray-700 cursor-pointer'>
                My Bookings
              </li>
              <li onClick={() => { setShowDropdown(false); setUser(null); navigate('/'); }} className='p-1.5 pl-3 hover:bg-gray-700 cursor-pointer'>
                Logout
              </li>
            </ul>

          </div>

        )} {/*if user is login then show profile pic with dropdown */}
      </div>

      {/* Open (mobile) */}
      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} /> {/* Toggle mobile menu on click */}
    </div>
  );
};

export default Navbar;

