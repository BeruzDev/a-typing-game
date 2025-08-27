import React from 'react';
import '../styles/components/_GithubLink.scss';
import { FaGithub } from "react-icons/fa";

const GithubLink = ({isDarkMode}) => {
	const iconColor = isDarkMode ? '#83E949' : '#7736EE';
	return (
		<a
			className="github-link"
			href="https://github.com/BeruzDev/a-typing-game"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Repositorio en GitHub"
		>
			<FaGithub className="github-icon" style={{ color: iconColor }} />
		</a>
	);
}

export default GithubLink;

