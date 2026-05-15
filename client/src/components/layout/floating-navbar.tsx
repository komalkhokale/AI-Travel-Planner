// src/components/layout/floating-navbar.tsx

"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
  Compass,
  LayoutDashboard,
  LogOut,
  Settings,
  Heart,
  BriefcaseBusiness,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAuthStore } from "@/store/auth-store";

const navItems = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Packages",
    href: "/packages",
  },

  {
    label: "Gallery",
    href: "/gallery",
  },

  {
    label: "Contact",
    href: "/contact",
  },
];

export default function FloatingNavbar() {
  const router = useRouter();

  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();

    router.push("/login");
  };

  return (
    <motion.header
      initial={{
        y: -50,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
      fixed
      left-0
      top-0
      z-50
      w-full
      px-8
      pt-6
      "
    >
      <div
        className="
        mx-auto
        flex
        max-w-7xl
        items-center
        justify-between
        "
      >
        {/* LEFT LOGO */}
        <Link
          href="/"
          className="
          flex
          items-center
          gap-3
          rounded-full
          border
          border-white/20
          bg-white/10
          px-5
          py-3
          backdrop-blur-2xl
          "
        >
          <div
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            text-black
            "
          >
            <Compass size={18} />
          </div>

          <div>
            <h1
              className="
              text-lg
              font-semibold
              text-white
              "
            >
              AI Travel
            </h1>

            <p
              className="
              text-xs
              text-white/70
              "
            >
              Smart travel planning
            </p>
          </div>
        </Link>

        {/* CENTER NAV */}
        <nav
          className="
          hidden
          items-center
          gap-2
          rounded-full
          border
          border-white/20
          bg-white/10
          px-3
          py-2
          backdrop-blur-2xl
          lg:flex
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
              rounded-full
              px-5
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-white/20
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT SECTION */}
        {!user ? (
          <div
            className="
            flex
            items-center
            gap-3
            "
          >
            {/* LOGIN */}
            <button
              onClick={() => router.push("/login")}
              className="
              rounded-full
              border
              border-white/20
              bg-white/10
              px-5
              py-3
              text-sm
              font-medium
              text-white
              backdrop-blur-2xl
              transition-all
              duration-300
              hover:bg-white/20
              "
            >
              Login
            </button>

            {/* SIGNUP */}
            <button
              onClick={() => router.push("/signup")}
              className="
              rounded-full
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-black
              transition-all
              duration-300
              hover:scale-[1.03]
              "
            >
              Start Planning
            </button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="
                flex
                items-center
                gap-3
                rounded-full
                border
                border-white/20
                bg-white/10
                px-3
                py-2
                text-white
                backdrop-blur-2xl
                transition
                hover:bg-white/20
                "
              >
                <Avatar
                  className="
                  h-10
                  w-10
                  border
                  border-white/20
                  "
                >
                  <AvatarImage src={user.avatar} />

                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="hidden text-left lg:block">
                  <p
                    className="
                    text-sm
                    font-medium
                    "
                  >
                    {user.name}
                  </p>

                  <p
                    className="
                    text-xs
                    text-white/70
                    "
                  >
                    Traveler
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="
              w-64
              rounded-3xl
              border
              border-zinc-200
              p-2
              shadow-2xl
              "
            >
              {/* USER INFO */}
              <div
                className="
                flex
                items-center
                gap-3
                px-3
                py-3
                "
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                  <p
                    className="
                    font-semibold
                    text-zinc-900
                    "
                  >
                    {user.name}
                  </p>

                  <p
                    className="
                    text-sm
                    text-zinc-500
                    "
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* DASHBOARD */}
              <DropdownMenuItem
                onClick={() => router.push("/dashboard")}
                className="
                cursor-pointer
                rounded-xl
                py-3
                "
              >
                <LayoutDashboard className="mr-3" size={18} />
                Dashboard
              </DropdownMenuItem>

              {/* BOOKINGS */}
              <DropdownMenuItem
                className="
                cursor-pointer
                rounded-xl
                py-3
                "
              >
                <BriefcaseBusiness className="mr-3" size={18} />
                My Bookings
              </DropdownMenuItem>

              {/* WISHLIST */}
              <DropdownMenuItem
                className="
                cursor-pointer
                rounded-xl
                py-3
                "
              >
                <Heart className="mr-3" size={18} />
                Wishlist
              </DropdownMenuItem>

              {/* SETTINGS */}
              <DropdownMenuItem
                className="
                cursor-pointer
                rounded-xl
                py-3
                "
              >
                <Settings className="mr-3" size={18} />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* LOGOUT */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="
                cursor-pointer
                rounded-xl
                py-3
                text-red-500
                focus:text-red-500
                "
              >
                <LogOut className="mr-3" size={18} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </motion.header>
  );
}
