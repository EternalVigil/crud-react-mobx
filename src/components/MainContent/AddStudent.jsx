import React, { useState } from 'react';
import styled from 'styled-components';

import { inject, observer } from 'mobx-react';
import { validateInputs } from '../../helpers/validation';

import MainTitle from '../../library/MainTitle';
import SaveButton from '../../library/SaveButton';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
	background-color: #1B1B1B;
	color: #fff;

	.formContainer {
		display: flex;
		justify-content: center;
		flex: 0;
		width: 100%;

		form {
			display: flex;
			flex-direction: column;
			align-items: center;

			input {
				text-align: center;
				margin-bottom: 4%;
			}
		}
	}

	.saveButtonContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 0;
		width: 100%;
		margin: 2% 0;
	}

	.statusMessageContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 0;
		width: 100%;
		margin: 2% 0;
	}
`;

const AddStudent = ({AppStore}) => {
	const [inputs, updateInputs] = useState({
		firstName: undefined,
		lastName: undefined,
		currentGradeLevel: undefined,
		currentGPA: undefined
	});

	const [canSave, updateCanSave] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const handleChange = (event) => {
		event.persist();
		updateInputs(previousState => {
			previousState[event.target.name] = event.target.value;
			return previousState;
		});
		updateCanSave( validateInputs(inputs) );
	};

	const saveStudent = () => {
		const status = AppStore.createStudent(inputs);

		if(status === true) {
			AppStore.statusMessage.set('SAVE SUCCESSFUL');
			
			updateInputs({
				firstName: '',
				lastName: '',
				currentGradeLevel: '',
				currentGPA: ''
			});

			updateCanSave(false);
			
			clearTimeout();

			setTimeout(() => {
				AppStore.statusMessage.set('');
			}, 2000);
		} else if(status === false) {
			AppStore.statusMessage.set('ERROR SAVING...PLEASE TRY AGAIN LATER');

			clearTimeout();
			setTimeout(() => {
				AppStore.statusMessage.set('');
			}, 2000);
		}

	};

	return(
		<Container>

			<MainTitle>
				ADD A STUDENT
			</MainTitle>

			<div className='formContainer'>
				<form onSubmit={ handleSubmit }>
					<label>
						FIRST NAME:
					</label>
					<input
						type='text'
						placeholder='John'
						name='firstName'
						onChange={ handleChange }
						value={inputs.firstName} 
					/>
					<label>
						LAST NAME:
					</label>
					<input 
						type='text'
						placeholder='Smith'
						name='lastName'
						onChange={ handleChange }
						value={inputs.lastName}
					/>
					<label>
						CURRENT GRADE:
					</label>
					<input 
						type='text'
						placeholder='12th'
						name='currentGradeLevel'
						onChange={ handleChange }
						value={inputs.currentGradeLevel}
					/>
					<label>
						CURRENT GPA:
					</label>
					<input 
						type='text'
						placeholder='2.5'
						name='currentGPA'
						onChange={ handleChange }
						value={inputs.currentGPA}
					/>
				</form>
			</div>

			<div className='saveButtonContainer'>
				{
					canSave === true &&
					<SaveButton onClick={ saveStudent }>
						SAVE
					</SaveButton>
				}
			</div>
			<div className='statusMessageContainer'>
				{
					AppStore.statusMessage.get()
				}
			</div>
			
		</Container>
	);
};

export default inject('AppStore')(observer(AddStudent));
