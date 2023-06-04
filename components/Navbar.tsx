import {useState, useCallback, useEffect} from 'react'

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from './AccountMenu';

import {BsChevronDown, BsSearch, BsBell} from 'react-icons/bs'

const TOP_OFFSET = 66

const Navbar = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackgound, setShowBackgound] = useState(false);
    
    const toggleMobileMenu = useCallback(()=> {
       setShowMobileMenu((current)=> !current) 
    },[])
    
    const toggleAccountMenu = useCallback(()=> {
        setShowAccountMenu((current)=> !current)
    },[])
    
    useEffect(() => {
        const hanldeScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackgound(true);
            } else {
                setShowBackgound(false);
            }
        }
        
        window.addEventListener('scroll', hanldeScroll);
        
        return () => {
            window.removeEventListener('scroll', hanldeScroll);
        }
    },[])
    
    return (
        <nav className="w-full fixed z-40">
            <div
                className={`
                    px-4 md:px-16 py-6
                    flex flex-row 
                    items-center
                    transition duration-500
                    ${showBackgound ? 'bg-zinc-900 bg-opacity-90' : ''}
                    
                `}
            >
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
                <div className="
                    flex-row ml-8 gap-7 hidden lg:flex"
                >
                    <NavbarItem label="Home"/>
                    <NavbarItem label="Series"/>
                    <NavbarItem label="Films"/>
                    <NavbarItem label="New & Popular"/>
                    <NavbarItem label="My List"/>
                    <NavbarItem label="Browse by Languages"/>
                </div>
                
                <div onClick={toggleMobileMenu}  className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rorate-0'}`}/>
                    <MobileMenu  visible={showMobileMenu} />
                </div>
                
                <div className='flex flex-row ml-auto gap-7 items-center'>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsSearch/>
                    </div>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsBell/>
                    </div>
                    <div onClick={toggleAccountMenu}  className='flex flex-row items-center gap-2 cursor-pointer relative'>
                        <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                            <img src="/images/default-blue.png" alt="" />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rorate-0'}`} />
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;