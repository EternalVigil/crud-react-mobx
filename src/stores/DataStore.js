import { observable, action } from 'mobx';

import { sampleStudents } from '../mockData/students';

class DataStore {
	constructor(Data) {
		console.log('store created');
	}

	studentList = observable(sampleStudents);

	currentView = observable.box('VIEW');

	statusMessage = observable.box('');

	createStudent = action((student) => {
		this.statusMessage.set('SAVING...');
		if(student && student.firstName && student.lastName && student.currentGradeLevel && student.currentGPA) {
			this.studentList.push(student);
			return true;
		} else {
			return false;
		}
	});	

	editStudent = action((student, index) => {
		if(student) {
		this.statusMessage.set('UPDATING...');

		this.studentList[index] = student;
		return true;
		} else return false;
	});

	deleteStudent = action((student, index) => {
		if(student) {
			this.statusMessage.set('DELETING...');

			this.studentList.splice(index, 1);
			return true;
		} else return false;

	});
}

export default new DataStore();
