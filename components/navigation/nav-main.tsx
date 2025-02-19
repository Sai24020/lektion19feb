import Link from "next/link";

export default function NavMain() {
  return (
    <nav className="space-y-4 flex font-semibold text-lg gap-6 :hover color-red">
      <Link href="/">Home</Link>
      <Link href="/category">Search med category</Link> {/* Länk till söksidan */}
    </nav>
  );
}
/* nav.module.css
.navMain {
    display: flex;
    gap: 1rem;
    margin: 1rem;
}
 */