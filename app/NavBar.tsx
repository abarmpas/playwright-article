'use client';

import Link from "next/link"
import { usePathname } from "next/navigation";
import React from "react"
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { logout } from "./lib/actions";

const NavBar = () => {

    const activePath = usePathname()

    const links = [
        { href: '/users', label: 'Users'},
        { href: '/issues', label: 'Issues'},
    ]

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href='/home'><AiFillBug /></Link>
            <ul className="flex space-x-6">
                {links.map(link => <Link key={link.href}
                className={classnames({
                    'text-zinc-900': link.href === activePath,
                    'text-zinc-500': link.href !== activePath,
                    'hover:text-zinc-800 transition-colors': true
                })}
                href={link.href}>{link.label}</Link>)}
            </ul>
            { activePath !== '/login' ? 
            <form
                action={logout}
            >
                <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <div className="hidden md:block" id="sign-out">Sign Out</div>
                </button>
            </form> : false}
        </nav>
    )
}

export default NavBar