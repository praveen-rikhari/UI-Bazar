import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from "@clerk/nextjs";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoMdAddCircle } from "react-icons/io";
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

                        <SignedOut>
                            <li className="nav-item">
                                <SignInButton />
                            </li>
                        </SignedOut>
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
                    <li className="nav-item">
                        <Link href="/create">
                            <button className="create-btn">
                                <span>
                                    <IoMdAddCircle /> Create
                                </span>

                            </button>
                        </Link>
                    </li>
                </ul>
                <UserButton />
            </div>
        </div>
    )
}

export default nav;
