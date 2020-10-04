export const validateInputs = (inputs) => {
	// BASIC VALIDATION - SHOULD USE NPM LIBRARY FOR CATCH / CORRECTING / VALIDATION
	if(
		(inputs.firstName && inputs.firstName.length > 2) &&
		(inputs.lastName && inputs.lastName.length > 2) && 
		(inputs.currentGradeLevel && inputs.currentGradeLevel.length > 0)
	) {
		return(true);
	} else {
		return(false);
	}
};
