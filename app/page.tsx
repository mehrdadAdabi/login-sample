import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-center">
        <Link className="bg-primaryGreen p-1 px-5 rounded-md text-foreground" href="/user/sign-in">لاگین</Link>
      </div>
    </>
  );
}
