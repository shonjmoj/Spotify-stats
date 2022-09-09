import styled from "styled-components";
import S from "styled-components";

type state = {
  login?: boolean;
  logOut?: boolean;
};

const LogInButton = S.button`
	padding: 0.5em 1em;
	background: ${(props: state) => (props.login ? "#1CD661" : "#dc1414")};
	border-radius : 4px;
	border: 1px solid;
	color: #000;
	border-color: ${(props: state) => (props.login ? "#1CD661" : "#dc1414")};
	font-size: 1em;
	cursor: pointer;
	margin: 0 1em;
`;

const LogOutButton = S(LogInButton)`
	background : none;
	border: none;
`;

export { LogInButton, LogOutButton };
