import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
	LayoutDashboard,
	Calendar,
	ShoppingBag,
	Users,
	Settings,
	LogOut,
	Menu,
	X,
	User,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProfile } from "@/store/slices/profileSlice";

// Define the shape for a menu item
interface NavItem {
	id?: number;
	name: string;
	href: string;
	Icon: React.ElementType; // Icon component type
}

// 1. TOP NAVIGATION LINKS
const topNavItems: NavItem[] = [
	{ id: 1, name: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
	{ id: 2, name: "Events", href: "/dashboard/events", Icon: Calendar },
	{ id: 3, name: "Merch", href: "/dashboard/merch", Icon: ShoppingBag },
	{ id: 4, name: "Users", href: "/dashboard/users", Icon: Users },
];

export default function Sidebar() {
	const activePath = usePathname();
	const router = useRouter();
	const supabase = createClient();
	const dispatch = useAppDispatch();
	const { data: profile } = useAppSelector((state) => state.profile);

	// 1. State to manage the visibility of the dropdown
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		dispatch(fetchProfile());
	}, [dispatch]);

	// 2. Ref to detect clicks outside the container
	const dropdownRef = useRef<HTMLDivElement>(null);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Function to toggle the dropdown
	const handleToggleDropdown = () => setIsDropdownOpen((prev) => !prev);
	const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

	// 3. Handle outside click logic
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		}

		if (isDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [isDropdownOpen]);

	// Handle outside click for mobile menu
	useEffect(() => {
		function handleClickOutsideMobile(event: MouseEvent) {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				isMobileMenuOpen
			) {
				setIsMobileMenuOpen(false);
			}
		}

		if (isMobileMenuOpen) {
			document.addEventListener("mousedown", handleClickOutsideMobile);
		}

		return () =>
			document.removeEventListener("mousedown", handleClickOutsideMobile);
	}, [isMobileMenuOpen]);

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Logout error:", error.message);
			return;
		}
		router.push("/login");
	};

	const NavLink: React.FC<NavItem> = ({ name, href, Icon }) => {
		const isActive =
			href === "/dashboard"
				? activePath === href
				: activePath.startsWith(href);

		// Apply active class for primary background and shadow
		const activeClasses = isActive
			? "bg-primary shadow-[0_0_15px_rgba(255,206,27,0.3)] rounded-full text-black font-bold"
			: "text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white rounded-xl";

		return (
			<Link href={href} onClick={() => setIsMobileMenuOpen(false)}>
				<div
					className={`
            flex items-center 
            ${
				isMobileMenuOpen
					? "justify-start px-4 w-full"
					: "justify-center w-10"
			} 
            h-10 my-2 cursor-pointer 
            transition-all duration-300 ease-[cubic-bezier(0.37,1.95,0.66,0.56)] 
            ${activeClasses}
          `}
					title={name}>
					<Icon className="w-5 h-5" />
					{isMobileMenuOpen && (
						<span className="ml-3 font-medium text-sm">{name}</span>
					)}
				</div>
			</Link>
		);
	};

	return (
		<>
			{/* Mobile Top Bar */}
			<div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-white/10 z-40 flex items-center justify-between px-4">
				<Link href="/dashboard" className="flex items-center gap-2">
					<div className="relative w-8 h-8">
						<Image
							src="/assets/img/Krall Logo -Primary.svg"
							fill
							alt="Krall Logo"
							className="object-contain"
						/>
					</div>
					<span className="font-bold text-white">Krall Admin</span>
				</Link>
				<button
					onClick={toggleMobileMenu}
					className="p-2 rounded-lg hover:bg-gray-800 text-gray-300">
					{isMobileMenuOpen ? (
						<X className="w-6 h-6" />
					) : (
						<Menu className="w-6 h-6" />
					)}
				</button>
			</div>

			{/* Overlay for Mobile */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				ref={sidebarRef}
				className={`
        fixed top-0 bottom-0 
        ${
			isMobileMenuOpen
				? "left-0 w-64 p-6"
				: "-left-full md:left-4 md:w-16 md:pt-4"
		}
        md:top-4 md:bottom-4 
        flex flex-col items-center 
        bg-black/90 md:bg-black/40 md:backdrop-blur-xl 
        shadow-2xl md:shadow-xl rounded-r-2xl md:rounded-2xl 
        border-r md:border border-white/10 
        z-50 transition-all duration-300 ease-in-out
      `}>
				{/* App Logo/Icon Section (Top) */}
				<Link
					className={`md:mb-8 p-1 rounded-full hover:bg-white/5 transition-all duration-300 ${
						isMobileMenuOpen ? "md:block mb-8 block" : "mb-8 block"
					}`}
					href="/dashboard"
					title="Dashboard">
					<div className="relative w-10 h-10">
						<Image
							src="/assets/img/Krall Logo -Primary.svg"
							fill
							alt="Krall Logo"
							className="object-contain"
						/>
					</div>
				</Link>

				{/* 2. TOP LINKS */}
				<nav
					className={`flex flex-col ${
						isMobileMenuOpen
							? "items-start w-full mt-4"
							: "items-center"
					}`}>
					{topNavItems.map((item) => (
						<NavLink key={item.id} {...item} />
					))}
				</nav>

				{/* Divider */}
				<div className="flex-grow border-b border-white/10 w-3/4 my-4" />

				{/* 3. BOTTOM SECTION (Settings, User Info) */}
				<div
					className={`flex flex-col ${
						isMobileMenuOpen ? "items-start w-full" : "items-center"
					} w-full mt-auto mb-4`}>
					{/* Settings Button */}
					<NavLink
						name="Settings"
						href="/dashboard/profile" // Redirecting settings to profile for now
						Icon={Settings}
					/>

					{/* User Info / Avatar */}
					<div
						className={`
                relative flex items-center 
                ${
					isMobileMenuOpen
						? "justify-start w-full px-2"
						: "justify-center w-12"
				}
                h-12 my-2 p-1 
                cursor-pointer rounded-full
            `}
						ref={dropdownRef}>
						{/* The Avatar/Trigger Element */}
						<div
							className={`
                    flex justify-center items-center 
                    w-12 h-12 p-1 
                    cursor-pointer rounded-full 
                    bg-gray-900 shadow-lg border-2 
                    transition-all duration-200 ease-in-out
                    ${isDropdownOpen ? "border-primary" : "border-white/10"}
                `}
							title={profile?.first_name || "User"}
							onClick={handleToggleDropdown} // ⭐️ CLICK HANDLER
						>
							{/* Avatar Image */}
							<div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center aspect-square overflow-hidden">
								{profile?.avatar_url ? (
									<Image
										src={profile.avatar_url}
										height={40}
										width={40}
										alt="avatar"
										className="rounded-full object-cover w-full h-full"
										unoptimized={true}
									/>
								) : (
									<span className="text-gray-400 font-bold text-lg">
										{profile?.first_name
											?.charAt(0)
											.toUpperCase() || "U"}
									</span>
								)}
							</div>
						</div>

						{/* Mobile User Info Text */}
						{isMobileMenuOpen && (
							<div
								className="ml-3 overflow-hidden"
								onClick={handleToggleDropdown}>
								<p className="font-semibold text-sm truncate text-white">
									{profile?.first_name} {profile?.last_name}
								</p>
								<p className="text-xs text-gray-400 truncate">
									{profile?.email}
								</p>
							</div>
						)}

						{/* Dropdown/Tooltip Menu */}
						<div
							className={`
                    absolute ${
						isMobileMenuOpen
							? "bottom-full left-0 mb-2 w-full"
							: "left-full ml-4 w-48"
					} p-3 
                    bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-xl shadow-xl 
                    transition-all duration-200
                    text-sm text-white 
                    ${
						isDropdownOpen
							? "opacity-100 translate-x-0 pointer-events-auto" // ⭐️ OPEN STATE
							: "opacity-0 -translate-x-2 pointer-events-none" // ⭐️ CLOSED STATE
					}
                `}
							// keep it open if clicked inside
							onClick={(e) => e.stopPropagation()}>
							{!isMobileMenuOpen && (
								<div className="mb-3 border-b border-white/10 pb-2">
									<p className="font-semibold truncate pl-1">
										{profile?.first_name}{" "}
										{profile?.last_name}
									</p>
									<p className="text-xs text-gray-400 truncate pl-1">
										{profile?.email}
									</p>
								</div>
							)}
							<Link
								href="/dashboard/profile"
								className="flex items-center w-full py-2 px-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors mb-1"
								onClick={() => setIsDropdownOpen(false)}>
								<User className="w-4 h-4 mr-2" />
								Profile
							</Link>
							<button
								className="flex items-center w-full py-2 px-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
								onClick={handleLogout}>
								<LogOut className="w-4 h-4 mr-2" />
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
