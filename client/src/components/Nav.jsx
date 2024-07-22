import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from "@clerk/nextjs";
import Link from "next/link";

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/create"}>Create</Link>
                </li>
                <SignedOut>
                    <li>
                        <SignInButton />
                    </li>
                </SignedOut>
                <SignedIn>
                    <li>
                        <Link href={'/dashboard'}>DashBoard</Link>
                    </li>
                    <li>
                        <Link href={'/profile'}>profile</Link>
                    </li>
                    <li>
                        <UserButton />
                    </li>
                </SignedIn>
            </ul>
        </nav>
    )
}

export default Nav;