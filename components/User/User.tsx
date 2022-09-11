import S from "styled-components";

const Avatar = S.img`
	height : 2.5em;
	width : 2.5em;
	border-radius: 100%;
	border: #FFF solid 1px
`;

const User = S.div`
	font-weight : bold;
	background: none;
	padding: 0 1em;
	display : flex;
	align-items: center;
	gap : 0.5em
`;

export { User, Avatar };
