"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">My App</h1>
      <div className="flex gap-4">
        <Link href="/sign-in">
          <button className="bg-blue-500 text-white p-2 rounded">
            Page 1
          </button>
        </Link>
        <Link href="/page2">
          <button className="bg-green-500 text-white p-2 rounded">
            Page 2
          </button>
        </Link>
        <Link href="/page3">
          <button className="bg-purple-500 text-white p-2 rounded">
            Page 3
          </button>
        </Link>
      </div>
    </div>
  );
}