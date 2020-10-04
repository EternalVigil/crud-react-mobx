import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	width: 100%;
	color: red;
	font-weight: bold;
`;

const EmptyState = ({text}) => {
	return(
		<Container>
			{ text }
		</Container>
	);
};

export default EmptyState;
