export const getColumnHeaders = (array) => {
	const arrayObject = array && Object.entries(array)[0][1];
	const columnNames = arrayObject && 
		Object.entries(arrayObject).map( key => {
			return key[0];
		});

	return columnNames;
};
