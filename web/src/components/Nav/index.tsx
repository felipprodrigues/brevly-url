import Logo from "../../assets/Logo.svg";
export function Nav() {
	return (
		<nav className="h-24">
			<a href="/" title="brev.ly">
				<img src={Logo} alt="Your SVG" />
			</a>
		</nav>
	);
}
