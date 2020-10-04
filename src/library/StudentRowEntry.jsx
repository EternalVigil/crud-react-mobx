import React from 'react';
import styled from 'styled-components';

import { inject, observer } from 'mobx-react';

const Container = styled.div`
	display: flex;
	flex: 0;
	width: 100%;
	color: #ececec;
	padding: 1% 0;
	cursor: ${props => props.cursorStyle || 'default'};

	:nth-child(odd) {
		background-color: #242424;
	}

	.column {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		height: 100%;
	}

`;

const StudentRowEntry = ({AppStore, student, clickFunction, cursorStyle }) => {
	return(
		<Container onClick={ clickFunction } cursorStyle={cursorStyle}>
			<div className='column firstName'>
				{ student.firstName || '-' }
			</div>
			<div className='column lastName'>
				{ student.lastName || '-' }
			</div>
			<div className='column currentGrade'>
				{ student.currentGradeLevel || '-' }
			</div>
			<div className='column currentGPA'>
				{ student.currentGPA || '-' }
			</div>
		</Container>
	);
};

export default inject('AppStore')(observer(StudentRowEntry));
