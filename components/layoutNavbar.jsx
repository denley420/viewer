import Link from "next/link";

const Links = [
  // { href: "/", label: "Home" },
  // { href: "/dev/xtoken", label: "X-Token" },
  // { href: "/dev/xtokenraffle", label: "X-Token Raffle" },
]

export default function Layout_Navbar() {
  return (
    <nav className="border-b shadow-md sticky top-0 w-full backdrop-blur-sm bg-white/30">
      <ul className="flex gap-1 p-4 items-center">
        <li className="hidden flex-1 flex just items-center">
          <Link href="/">
            <div className="w-8 h-8 bg-blue-500" />
          </Link>
        </li>
        <li className="w-3/4">
          <ul className="flex w-full items-center justify-end gap-4">
          {
            Links.map((link, index) => (
              <li key={index} className="flex items-center">
                <Link href={link.href}>
                  <a className="text-gray-600 hover:text-gray-900">{link.label}</a>
                </Link>
              </li>
            ))
          }
          </ul>
        </li>
      </ul>
    </nav>
  );
}
