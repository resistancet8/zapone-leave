import RestfulProvider from '../globals/restfulProvider/RestfulProvider';

const ORGANIZATION = 874733856693605;
const CURRENT_USER = 1651212538794259;

export const getDashboard = (body) => {
	return RestfulProvider.get(`organization/designation/designations/pagination/${ORGANIZATION}`);
};

export const getLeaveTypes = (body) => {
	return RestfulProvider.get(`organization/leavetype/leavetypes/${ORGANIZATION}`);
};

export const getLeaveBalances = () => {
	return RestfulProvider.get(`organization/user/leavebalance/leavebalances/${CURRENT_USER}`);
};

export const getAllOrganizationLeaves = () => {
	return RestfulProvider.get(`organization/user/leave/leaves/all/${ORGANIZATION}?direction=DESC&orderBy=createdAt&page=0&searchText=&size=10`);
};

export const getLeaveApplications = () => {
	return RestfulProvider.get(`organization/user/leave/leaves/${CURRENT_USER}?direction=DESC&orderBy=createdAt&page=0&searchText=&size=10`);
};

export const getLeaveReports = (data) => {
	return RestfulProvider.get(`organization/user/leave/leaves/report?organizationId=${ORGANIZATION}&userId=${CURRENT_USER}&startDate=${data.startDate}&endDate=${data.endDate}`);
};

export const downloadReportXLS = (data) => {
	return RestfulProvider.get(`organization/user/leave/leaves/report/download?organizationId=${ORGANIZATION}&userId=${CURRENT_USER}&startDate=${data.startDate}&endDate=${data.endDate}`);
};

export const applyLeave = (body) => {
	return RestfulProvider.post(`organization/user/leave/apply`, body);
};

export const withdrawApplication = (props) => {
	return RestfulProvider.post(`organization/user/leave/update`, props);
};

export default { getDashboard, getLeaveTypes, applyLeave, getLeaveBalances, getLeaveApplications, withdrawApplication, getLeaveReports, downloadReportXLS, getAllOrganizationLeaves }