import React from 'react';
import styled from 'styled-components';

import { inject, observer } from 'mobx-react';

import ViewStudents from './ViewStudents';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import DeleteStudent from './DeleteStudent';

const Container = styled.div`
	display: flex;
	flex: 1;
	height: 100%;
`;

const MainContent = ({AppStore}) => {
	const currentView = AppStore.currentView.get();

	const renderContent = () => {
		if(currentView === 'VIEW') {
			return <ViewStudents />;
		} else if (currentView === 'ADD') {
			return <AddStudent />;
		} else if (currentView === 'EDIT') {
			return <EditStudent />;
		} else if (currentView === 'DELETE') {
			return <DeleteStudent />;
		}
	};


	return(
		<Container>
			{ renderContent() }
		</Container>
	);
};

export default inject('AppStore')(observer(MainContent));
