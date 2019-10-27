import RestfulProvider from '../globals/restfulProvider/RestfulProvider';

const ORGANIZATION = '874733856693605';

export const getDashboard = (body) => {
	return RestfulProvider.get(`organization/designation/designations/pagination/${ORGANIZATION}`);
};

export default { getDashboard }