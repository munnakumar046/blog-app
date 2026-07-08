import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-gray-300 ">
      <div className="container mx-auto flex justify-center gap-10 p-4 ">
        {/* Copyright */}
        <div>
          <h2 className="text-lg font-semibold">My Blog App</h2>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold">Connect</h2>
          <p>Email: munna123@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
