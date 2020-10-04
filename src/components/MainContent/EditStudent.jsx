import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import { validateInputs } from '../../helpers/validation';
import { getColumnHeaders } from '../../helpers/students';

import ColumnHeader from './ColumnHeader';
import StudentContainer from '../../library/StudentContainer';
import StudentRowEntry from '../../library/StudentRowEntry';
import EmptyState from './EmptyState';
import MainTitle from '../../library/MainTitle';
import SaveButton from '../../library/SaveButton';
import CancelButton from '../../library/CancelButton';

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	flex: 1;
	width: 100%;

	.toEditContainer {
		position: sticky;
		position: -webkit-sticky;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 0;
		width: 100%;
		padding: 2% 0;
		background-color: #242424;

		.saveButtonContainer {
			display: flex;
			justify-content: space-evenly;
			width: 50%;
			margin: 1% 0;
		}
	}
`;

const EditStudent = ({AppStore}) => {
	const [studentToEdit, updateStudentToEdit] = useState({});
	const [studentIndex, updateStudentIndex] = useState();
	const [canSave, updateCanSave] = useState(false);

	const students = toJS(AppStore.studentList);

	const statusMessage = AppStore.statusMessage.get();

	const handleChange = (event) => {
		event.persist();

		updateStudentToEdit(previousState => ({
			...studentToEdit,
			[event.target.name]: event.target.value
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const updateStudentRecord = () => {
		const result = AppStore.editStudent(studentToEdit, studentIndex);

		if(result === true) {
			updateStudentToEdit({
				firstName: '',
				lastName: '',
				currentGradeLevel: '',
				currentGPA: ''				
			});
			updateStudentIndex(undefined);
			updateCanSave(false);
			AppStore.statusMessage.set('UPDATE COMPLETE');

			clearTimeout();
			setTimeout(() => {
				AppStore.statusMessage.set('');
			}, 2000);

		} else {
			AppStore.statusMessage.set('ERROR UPDATING RECORD');

			clearTimeout();
			setTimeout(() => {
				AppStore.statusMessage.set('');
			}, 2000);
		}
	};

	const cancelUpdate = () => {
		updateStudentToEdit({
			firstName: '',
			lastName: '',
			currentGradeLevel: '',
			currentGPA: ''
		});
		updateStudentIndex(undefined);
		updateCanSave(false);
	};

	useEffect(() => {
		studentToEdit && updateCanSave(validateInputs( studentToEdit ));
	}, [studentToEdit]);

	return(
		<Container>
			<MainTitle>
				EDIT A STUDENT
			</MainTitle>
			<ColumnHeader columnNames={ getColumnHeaders(students) } />
			<StudentContainer>
				{
					students &&
					students.length > 0
					? students.map( (student, index) => {
						return <StudentRowEntry
							key={index}
							student={student}
							clickFunction={ () => {
								updateStudentToEdit(student);
								updateStudentIndex(index);
							}}
							cursorStyle='pointer'
						/>
					})
					: <EmptyState text={'NO ENTRIES FOUND'} />
				}
			</StudentContainer>
			<div className='toEditContainer'>
				<div className='formContainer'>
					<form onSubmit={ handleSubmit }>
						<input 
							type='text'
							name='firstName'
							placeholder='EDIT FIRST NAME'
							onChange={ handleChange }
							value={ studentToEdit.firstName }
						/>
						<input 
							type='text'
							name='lastName'
							placeholder='EDIT LAST NAME'
							onChange={ handleChange }
							value={ studentToEdit.lastName }
						/>
						<input 
							type='text'
							name='currentGradeLevel'
							placeholder='EDIT GRADE LEVEL'
							onChange={ handleChange }
							value={ studentToEdit.currentGradeLevel }
						/>
						<input 
							type='text'
							name='currentGPA'
							placeholder='EDIT GPA'
							onChange={ handleChange }
							value={ studentToEdit.currentGPA }
						/>
					</form>
				</div>
				<div className='saveButtonContainer'>
					<CancelButton onClick={ cancelUpdate.bind(null) }>
						CANCEL
					</CancelButton>

					{
						canSave === true && 
						<SaveButton onClick={ updateStudentRecord.bind(null) }>
							UPDATE
						</SaveButton>
					}
				</div>
				<div className='statusMessageContainer'>
					{ statusMessage }
				</div>
			</div>

		</Container>
	);
};

export default inject('AppStore')(observer(EditStudent));