import { GiTorch } from 'react-icons/gi'
import { BiSearch } from 'react-icons/bi'

function Navbar() {
    return (
        <div className="w-screen flex flex-row items-center p-1 justify-between bg-orange-500 shadow-xs">
            <div className="ml-8 text-5xl text-orange-800 hidden md:flex">
                <GiTorch className="ring-2 ring-orange-700 rounded-full p-1" />
            </div>
            <span className="w-screen md:w-1/3 h-10 bg-orange-700 cursor-pointer border border-orange-700 text-sm rounded-xl flex">
                <input type="search" name="serch" placeholder="Search"
                    className="flex-grow px-4 rounded-l-xl bg-orange-500 placeholder-orange-200 text-orange-50 text-sm focus:outline-none" />
                <BiSearch className="fas fa-search rounded-xl my-3 mx-5 text-lg text-white w-4 h-4" />
            </span>
            <div className="flex flex-row-reverse mr-4 ml-4 md:hidden">
                <i className="fas fa-bars"></i>
            </div >
            <div className="flex flex-row-reverse mr-8 hidden md:flex">
                <div className="text-orange-700 rounded-xl text-center bg-white px-4 py-2 m-2">Register</div>
                <div className="text-orange-700 rounded-xl text-center bg-white px-4 py-2 m-2">Login</div>
            </div>
        </div>
    );
}

export default Navbar;