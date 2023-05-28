'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const currentRoute = usePathname();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">nextjs-starter</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link
              href="/"
              className={currentRoute === '/' ? 'active' : undefined}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/map"
              className={currentRoute === '/map' ? 'active' : undefined}
            >
              Map
            </Link>
          </li>
          <li>
            <Link
              href="/explore"
              className={currentRoute === '/explore' ? 'active' : undefined}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              href="/events"
              className={currentRoute === '/events' ? 'active' : undefined}
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              href="/contribute"
              className={currentRoute === '/contribute' ? 'active' : undefined}
            >
              Contribute
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className={currentRoute === '/profile' ? 'active' : undefined}
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
