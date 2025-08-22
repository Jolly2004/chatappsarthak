"use client";

import { useState } from "react";
import UserList from "../../components/userlist/page";
import ChatBox from "@/app/components/chatbox/page";
import ChatHeader from "@/app/components/navbar/page";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile toggle

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform bg-white w-72 border-r shadow-md z-30 transition-transform duration-300 
        lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <UserList
          onSelect={(user) => {
            setSelectedUser(user);
            setSidebarOpen(false); // close sidebar on mobile after selecting
          }}
        />
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3 bg-white shadow-sm">
          {/* Hamburger button for mobile */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* Chat header (user info / app title) */}
          <div className="flex-1 text-center">
            <ChatHeader />
          </div>

          {/* Placeholder for right-side icons (like search, menu) */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 hover:bg-gray-200 rounded-full transition">
              🔍
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full transition">
              ⋮
            </button>
          </div>
        </div>

        {/* Chat Body */}
        {selectedUser ? (
          <ChatBox recipient={selectedUser} />
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500 text-lg font-medium">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
