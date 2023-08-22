import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	IconAtom,
	IconBallFootball,
	IconBookmarkFilled,
	IconBusinessplan,
	IconCpu,
	IconHeartRateMonitor,
	IconMenu2,
	IconMovie,
	IconWorld,
	IconX,
} from '@tabler/icons-react';
import SearchBox from './SearchBox';
import Search from './Search';
import ThemeSwitcher from './ThemeSwitcher';

function Header() {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const handleToggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};

	const handleResize = () => {
		if (window.innerWidth <= 1024) {
			handleToggleNav();
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<header className="flex items-center h-20 gap-8 shadow-2xl z-100 md:h-20 lg:h-36 bg-skin-base dark:dark-theme text-skin-base lg:grid">
			<div className="flex items-center justify-between h-12 lg:grid-cols-4 lg:grid responsiveNavFooter">
				<div className="flex items-center gap-4">
					{isNavOpen ? (
						<IconX
							size={32}
							className="cursor-pointer lg:hidden text-skin-muted"
							onClick={handleToggleNav}
						/>
					) : (
						<IconMenu2
							size={32}
							className="cursor-pointer lg:hidden text-skin-muted"
							onClick={handleToggleNav}
						/>
					)}
					<div className=" text-[32px] lg:text-[61px] font-bold ">LP.</div>
				</div>

				<SearchBox />

				<div className="flex items-center gap-4">
					<Search />
					<ThemeSwitcher />
				</div>
			</div>

			<nav>
				<div
					className={`absolute py-6 pt-8 left-0 font-medium top-20 lg:gap-0  xl:gap-8  md:w-[70%] w-[100%]   justify-around flex flex-col lg:flex-row  lg:bg-transparent  ${
						isNavOpen
							? 'bg-skin-muted h-[100vh]'
							: 'hidden lg:h-auto lg:w-full lg:flex'
					} responsiveNavFooter`}
				>
					<Link
						to="/general"
						className="flex items-center gap-2 w-[50%] lg:w-full lg:justify-center nav-link"
						onClick={handleResize}
					>
						<IconWorld className="lg:hidden" /> General
					</Link>

					<Link
						to="/business"
						className="flex items-center gap-2 w-[50%] lg:w-full lg:justify-center nav-link"
						onClick={handleResize}
					>
						<IconBusinessplan className="lg:hidden" />
						Business
					</Link>

					<Link
						to="/technology"
						className="flex items-center gap-2 w-[50%] lg:w-full lg:justify-center nav-link"
						onClick={handleResize}
					>
						<IconCpu className="lg:hidden" />
						Technology
					</Link>

					<Link
						to="/science"
						className="flex items-center gap-2 w-[50%] lg:w-full lg:justify-center nav-link"
						onClick={handleResize}
					>
						<IconAtom className="lg:hidden" />
						Science
					</Link>

					<Link
						to="/entertainment"
						className="flex items-center gap-2 w-[50%] lg:w-full lg:justify-center nav-link"
						onClick={handleResize}
					>
						<IconMovie className="lg:hidden" />
						Entertainment
					</Link>

					<Link
						to="/health"
						className="flex items-center gap-2 w-[50%] lg:w-full lg:justify-center nav-link"
						onClick={handleResize}
					>
						<IconHeartRateMonitor className="lg:hidden" />
						Health
					</Link>

					<Link
						to="/sports"
						className="flex items-center gap-2 w-[50%] lg:w-full lg:justify-center nav-link"
						onClick={handleResize}
					>
						<IconBallFootball className="lg:hidden" />
						Sports
					</Link>

					<span className="hidden lg:inline-block"> |</span>

					<Link
						to="/bookmark"
						className="flex items-center gap-2 w-[50%] lg:w-full lg:justify-center nav-link"
						onClick={handleResize}
					>
						<IconBookmarkFilled className="lg:hidden" />
						Stories
					</Link>
				</div>
			</nav>
		</header>
	);
}

export default Header;
