import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadCategory } from '../features/actions/categoryActions';

const Categories = () => {
    const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
    const dropdownRef = useRef(null);
    const { data } = useSelector((state) => state.category);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(loadCategory());
    }, [dispatch]);

    const OnClickOnCat = (query) => {
        navigate(`/product/search/${query}`);
    }

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            let numCategories = 8; // Default for lg screens

            if (screenWidth < 1024) {
                numCategories = 5; // md screens
            }

            if (screenWidth < 768) {
                numCategories = 3; // sm screens
            }

            if (screenWidth < 576) {
                numCategories = 0; // xs screens
            }

            setCategoriesToDisplay(data.slice(0, numCategories));
        };

        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div ref={dropdownRef} className="bg-slate-700 p-3 overflow-hidden shadow-lg">
            <div className="container mx-auto flex items-center justify-between mt-10 md:mt-3">
                <button
                    className="text-white font-bold text-md md:text-xl cursor-pointer"
                    id="dropdown-button"
                    onClick={toggleDropdown}
                >
                    Categories
                </button>
                <ul className="flex flex-shrink-0 inline-block font-semibold pt-1">
                    <li className="text-nowrap">
                        <Link
                            className="inline-block text-white hover:underline cursor-pointer  hover:text-orange-400 mx-2 text-semibold"
                            to={'/'}
                            // onClick={() => OnClickOnCat(category.name)}
                        >
                            Trending
                        </Link>
                    </li>
                    <li className="text-nowrap">
                        <Link
                            className="inline-block text-white hover:underline cursor-pointer  hover:text-orange-400 mx-2 text-semibold"
                            to={'/'}
                            // onClick={() => OnClickOnCat(category.name)}
                        >
                            Recently Added
                        </Link>
                    </li>
                    {categoriesToDisplay.map((category) => (
                        <li key={category.uid} className="text-nowrap">
                            <a
                                className="inline-block text-white hover:underline cursor-pointer  hover:text-orange-400 mx-2 text-semibold"
                                onClick={() => OnClickOnCat(category.name)}
                            >
                                {category.name}
                            </a>
                        </li>
                    ))}
                    <button
                    className="text-white font-bold text-md md:text-xl cursor-pointer"
                    id="dropdown-button"
                    onClick={toggleDropdown}
                >
                    More...
                </button>
                </ul>
            </div>
            {isOpen && (
                <div className="origin-top-left absolute left-2 mt-2 w-4/5 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className='max-h-60 overflow-y-auto bg-slate-800 shadow-md mt-4'>
                        <div className="flex grid grid-cols-2 gap-1 md:grid-cols-4 gap-2 lg:grid-cols-5 gap-2 text-white" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {data.map((cat) => (
                                <div key={cat.uid} className="py-4 px-4 cursor-pointer font-semibold hover:text-orange-400 border-r">
                                    <button onClick={() => OnClickOnCat(cat.name)}> {cat.name}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
