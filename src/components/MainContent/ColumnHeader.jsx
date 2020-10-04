import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex: 0;
	width: 100%;
	color: #fff;
	font-weight: bold;
	padding: 1% 0;
	border-bottom: 2px solid #848487;

	.column {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		height: 100%;
		text-transform: uppercase;
	}

`;

const ColumnHeader = ({columnNames}) => {

	return(
		<Container>
			{
				columnNames.map( (columnName, index) => {
					return(
						<div key={ index } className='column'>
							{ columnName }
						</div>
					)
				})
			}
		</Container>
	);
};

export default ColumnHeader;