import styled from "styled-components";
import S from "styled-components";

const LogInButton = S.button`
	padding: 0.5em 1em;
	background: #1CD661;
	border-radius : 4px;
	border: 1px solid;
	border-color: #1CD661;
	color: #000;
	font-size: 1em;
	cursor: pointer;
	margin: 0 1em;
	&:hover {
		background
	}
`;

const LogOutButton = S(LogInButton)`
	color: #FFF;
	background : none;
	border: none;
	transition: 0.2s;
	&:hover {
		color : #ff0000;
	}
`;

export { LogInButton, LogOutButton };
