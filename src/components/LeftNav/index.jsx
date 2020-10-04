import React from 'react';
import styled from 'styled-components';

import { inject, observer } from 'mobx-react';

import { navigationOptions } from '../../constants/navigation';
import NavigationOption from '../../library/NavigationOption';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 0 20%;
	height: 100%;
	padding-left: 1%;
	border-right: 2px solid #848487;

	.viewOption {
		color: #848487;
		font-size: 1vw;
		font-weight: bold;
		letter-spacing: 2.25px;
		margin: 2% 0;
		cursor: pointer;
		transition: all 0.25s;

		:hover {
			color: #00face;
		}
	}

	.activeView {
		color: #ececec;
	}
`;

const LeftNav = ({AppStore}) => {
	
	const currentView = AppStore.currentView.get();

	const updateView = (destination) => {
		if (currentView !== destination) {
			AppStore.currentView.set(destination);
		} else return;
	};

	const isCurrentView = (option) => {
		if(currentView === option) {
			return 'activeView';
		} else return;
	};
	
	return(
		<Container>
			{
				navigationOptions.map((option, index) => {
					return(
						<NavigationOption 
							key={index} 
							className={`viewOption ${isCurrentView(option)}`} 
							onClick={ updateView.bind(null, option) } 
						>
							{ option }
						</NavigationOption>
					);
				})
			}
		</Container>
	);
	
};

export default inject('AppStore')(observer(LeftNav));
