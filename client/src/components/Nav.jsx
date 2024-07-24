import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    SignUpButton
} from "@clerk/nextjs";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoMdAddCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import './Nav.css';

function nav() {
    return (
        <div className="nav-container">
            <div className="nav-left">
                <div className="logo-container">
                    <Link legacyBehavior href="/">
                        <a className="logo-link">
                            <Image
                                src='/logo.png'
                                width={80}
                                height={80}
                                alt='Logo'
                                className='logo-image'
                            />
                        </a>
                    </Link>
                    <span className="site-title">
                        Bazar
                    </span>
                </div>
                <nav className="navbar">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link href="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/browse">Browse</Link>
                        </li>

                        <SignedIn>
                            <li className="nav-item">
                                <Link href="/profile">Profile</Link>
                            </li>
                        </SignedIn>
                    </ul>
                </nav>
            </div>
            <div className="nav-right">
                <ul className="nav-list">
                    <SignedIn>
                        <li className="nav-item">
                            <Link href="/create">
                                <button className="create-btn">
                                    <span>
                                        <IoMdAddCircle size={30}/> Create
                                    </span>

                                </button>
                            </Link>
                        </li>
                    </SignedIn>

                    <SignedOut>
                        <li className="nav-item">
                            <SignInButton>
                                <button className="auth-btn in">
                                    SIGN IN <span className="arrow">
                                        <IoIosArrowDroprightCircle size={30} />
                                    </span>
                                </button>
                            </SignInButton>
                        </li>
                        <li className="nav-item">
                            <SignUpButton>
                                <button className="auth-btn">
                                    SIGN UP <span className="arrow">
                                        <IoIosArrowDroprightCircle size={30} />
                                    </span>
                                </button>
                            </SignUpButton>
                        </li>
                    </SignedOut>

                </ul>
                <UserButton />
            </div>
        </div>
    )
}

export default nav;
