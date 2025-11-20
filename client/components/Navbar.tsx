"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar: React.FC = () => { const activePath = usePathname();
	return (
		<nav
			className={`navbar navbar-expand-md ${activePath==='/'?'fixed':'sticky'}-top py-3 shadow bg-dark bg-md-transparent`}
			id="navbarTop"
			data-bs-theme="dark">
			<div className="container">
				<Link
					href="/"
					className="navbar-brand d-none align-items-center">
					<span className="bs-icon-sm bs-icon-rounded d-flex justify-content-center align-items-center me-2 bs-icon">
						<img
							src="/assets/img/Krall%20Logo%20-Primary.svg"
							width={36}
							loading="eager"
							alt="Logo"
						/>
					</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navcol-2"
					aria-controls="navcol-2"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="visually-hidden">Toggle navigation</span>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navcol-2">
					<ul className="navbar-nav me-auto" id="PageNav">
						<li className="nav-item me-md-1">
							<Link href="/" className={`nav-link ${activePath==='/'&&'active'}`}>
								Home
							</Link>
						</li>
						<li className="nav-item me-md-1">
							<Link href="/about" className={`nav-link ${activePath==='/about'&&'active'}`}>
								About
							</Link>
						</li>
						<li className="nav-item me-md-1">
							<Link href="/event" className={`nav-link ${activePath==='/events'&&'active'}`}>
								Events
							</Link>
						</li>
						<li className="nav-item me-md-1">
							<Link href="/services" className={`nav-link ${activePath==='/services'&&'active'}`}>
								Services
							</Link>
						</li>
						<li className="nav-item me-md-1">
							<Link href="/shop" className={`nav-link ${activePath==='/shop'&&'active'}`}>
								Shop
							</Link>
						</li>
						<li className="nav-item me-md-1">
							<Link href="/contact" className={`nav-link ${activePath==='/contact'&&'active'}`}>
								Contact
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
// const activePath = usePathname();
