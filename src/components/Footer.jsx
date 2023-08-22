import { IconCopyright } from '@tabler/icons-react';

function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="flex flex-col text-skin-base items-center justify-center lg:justify-between sm:gap-3 h-14 sm:h-24 text-sm bg-skin-base sm:text-[21px] lg:flex-row dark:dark-theme font-[400]  responsiveNavFooter shadow-inner">
			<p className="flex items-center gap-1">
				<IconCopyright className="text-skin-muted" />{' '}
				<span className="font-bold">LP.</span> {currentYear} | All right
				reserved.
			</p>

			<p className="text-skin-muted">Developed & Design by Santosh Marar</p>
		</footer>
	);
}

export default Footer;
