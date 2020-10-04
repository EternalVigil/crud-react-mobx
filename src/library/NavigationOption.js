import styled from 'styled-components';

const NavigationOption = styled.span`
	color: #848487;
	font-size: 0.75vw;
	font-weight: bold;
	letter-spacing: 2.25px;
	margin: 2% 0;
	cursor: pointer;
	transition: all 0.25s;

	:hover {
		color: #00face;
	}

	&.activeView {
		color: #ececec;
	}
`;

export default NavigationOption;
