import React, { useState } from 'react';
import styled from 'styled-components';

import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import { getColumnHeaders } from '../../helpers/students';

import ColumnHeader from './ColumnHeader';
import StudentContainer from '../../library/StudentContainer';
import StudentRowEntry from '../../library/StudentRowEntry';
import EmptyState from './EmptyState';

import MagnifyingGlassIcon from '../../library/images/MagnifyingGlassIcon';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;

	.searchContainer {
		display: flex;
		justify-content: flex-end;
		flex: 0;
		width: 100%;
		margin: 1% 0;

		svg {
			display: inline-flex;
			width: 2vw;
			height: 2vw;
			fill: #848487;
		}

		:focus {
			svg {
				fill: #00face;
			}
		}
	}
`;

const ViewStudents = ({AppStore}) => {
	const [searchInput, updateSearchInput] = useState('');

	const students = toJS(AppStore.studentList);

	let visibleStudents = [];

	// ONLY ACCOUNTS FOR BASIC SINGLE STRING / VALUE SEARCH
	if(searchInput) {
		const searchCriteria = searchInput.toLowerCase();

		students.forEach(student => {
			if(
				student.firstName.toLowerCase().includes( searchCriteria ) ||
				student.lastName.toLowerCase().includes( searchCriteria ) ||
				student.currentGradeLevel.toLowerCase().includes( searchCriteria ) ||
				student.currentGPA === Number(searchCriteria)
			) {
				visibleStudents.push(student);
			}
		});

	} else {
		visibleStudents = students;
	}

	const handleChange = (event) => {
		if(event.target.value !== searchInput) {
			updateSearchInput(event.target.value);
		}
	};

	return(
		<Container>
			<div className='searchContainer'>
				<MagnifyingGlassIcon />
				<input type='text' onChange={ handleChange } value={searchInput} placeholder='SEARCH' />
			</div>
			<ColumnHeader columnNames={ getColumnHeaders(students) } />
			<StudentContainer>
				{
					(visibleStudents &&
					visibleStudents.length > 0) 
					? visibleStudents.map((student, index) => {
						return(
							<StudentRowEntry
								key={index} 
								student={student}
							/>
						);
					})
					: <EmptyState text={'NO STUDENTS MATCH THIS SEARCH'} />
				}
			</StudentContainer>
		</Container>
	);
};

export default inject('AppStore')(observer(ViewStudents));