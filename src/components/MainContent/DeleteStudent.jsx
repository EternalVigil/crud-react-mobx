import React, { useState } from 'react';
import styled from 'styled-components';

import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import { getColumnHeaders } from '../../helpers/students';

import MainTitle from '../../library/MainTitle';
import ColumnHeader from './ColumnHeader';
import StudentContainer from '../../library/StudentContainer';
import StudentRowEntry from '../../library/StudentRowEntry';
import EmptyState from './EmptyState';
import CancelButton from '../../library/CancelButton';
import ConfirmButton from '../../library/SaveButton';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	width: 100%;
`;

const ActionConfirmation = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
	min-height: 10%;
	height: auto;
	color: #fff;
	text-align: center;
	background-color: #242424;

	animation: appear 0.5s linear;

	@keyframes appear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}


	.buttonContainer {
		display: flex;
		justify-content: space-around;
		flex: 0;
		width: 50%;
	}
`;

const DeleteStudent = ({AppStore}) => {
	const [toDelete, updateToDelete] = useState({});
	const [studentIndex, updateStudentIndex] = useState();

	const students = toJS(AppStore.studentList);

	const statusMessage = AppStore.statusMessage.get();


	const cancelAction = () => {
		updateToDelete({});
		updateStudentIndex(undefined);
	};

	const deleteAction = () => {
		const result = AppStore.deleteStudent(toDelete, studentIndex);

		if(result === true) {
			AppStore.statusMessage.set('DELETE SUCCESSFUL');

			clearTimeout();
			setTimeout(() => {
				updateToDelete({});
				updateStudentIndex(undefined);
				AppStore.statusMessage.set('');
			}, 2000);

		} else {
			AppStore.statusMessage.set('ERROR DELETING RECORD, PLEASE TRY AGAIN');

			clearTimeout();
			setTimeout(() => {
				AppStore.statusMessage.set('');
			}, 2000);
		}
	};

	return(
		<Container>
			<MainTitle>
				DELETE A STUDENT
			</MainTitle>
			<StudentContainer>
				<ColumnHeader columnNames={getColumnHeaders(students)} />
				{
					students && 
					students.length > 0
					? students.map(
						(student, index) => 
							<StudentRowEntry 
								key={index} 
								student={student} 
								cursorStyle='pointer' 
								clickFunction={ () => {
									updateToDelete(student);
									updateStudentIndex(index);
								}} 
							/> 
						)
					: <EmptyState text={'NO STUDENTS FOUND'} />
				}
			</StudentContainer>
			{
				toDelete.firstName &&
				<ActionConfirmation>
					<span>
					ARE YOU SURE YOU WANT TO DELETE<br />
					{ toDelete.firstName } { toDelete.lastName }?
					</span>
					<span>
						{ statusMessage }
					</span>
					<div className='buttonContainer'>
						<CancelButton onClick={cancelAction.bind(null)}>
							CANCEL
						</CancelButton>
						<ConfirmButton onClick={deleteAction.bind(null)}>
							DELETE
						</ConfirmButton>
					</div>
				</ActionConfirmation>
			}
		</Container>
	);
};

export default inject('AppStore')(observer(DeleteStudent));
