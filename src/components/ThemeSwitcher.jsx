import { useEffect, useState } from 'react';
import { IconMoon, IconSun } from '@tabler/icons-react';

function ThemeSwitcher() {
	const [theme, setTheme] = useState(null);

	useEffect(() => {
		if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}, []);

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	const handleThemeSwitch = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<button
			type="button"
			onClick={handleThemeSwitch}
			className="flex items-center justify-center w-8 h-8 ml-auto rounded-full ext-lg lg:h-14 lg:w-14 bg-skin-muted dark:dark-theme"
		>
			{theme === 'dark' ? (
				<IconSun className=" text-skin-accent lg:w-8" />
			) : (
				<IconMoon className=" text-skin-accent lg:w-8" />
			)}
		</button>
	);
}

export default ThemeSwitcher;
