import RestfulProvider from '../globals/restfulProvider/RestfulProvider';

const ORGANIZATION = '874733856693605';

export const getDashboard = (body) => {
	return RestfulProvider.get(`organization/designation/designations/pagination/${ORGANIZATION}`);
};

export const getLeaveTypes = (body) => {
	return RestfulProvider.get(`organization/leavetype/leavetypes/${ORGANIZATION}`);
};

export const getLeaveBalances = (userID) => {
	return RestfulProvider.get(`organization/user/leavebalance/leavebalances/${userID}`);
};

export const getLeaveApplications = (userID) => {
	return RestfulProvider.get(`organization/user/leave/leaves/${userID}?direction=DESC&orderBy=createdAt&page=0&searchText=&size=10`);
};

export const applyLeave = (body) => {
	return RestfulProvider.post(`organization/user/leave/apply`, body);
};

export default { getDashboard, getLeaveTypes, applyLeave, getLeaveBalances, getLeaveApplications }