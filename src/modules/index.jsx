import React, { lazy, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import AuthRoutes from '../globals/hoc/AuthRoutes';
import LeavesServices from './../services/LeavesServices';
import { Spin, Icon, Result, Button, Popover, Popconfirm, message } from 'antd';
import { inject, observer } from 'mobx-react';
const Dashboard = lazy(() => import('./dashboard'));
const LeaveRequest = lazy(() => import('./leaveRequest'));
const LeaveCalendar = lazy(() => import('./leaveCalendar'));
const LeaveReports = lazy(() => import('./leaveReports'));
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const moment = require('moment');
const CURRENT_USER = 1651212538794259;

const NoMatchPage = (props) => {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button onClick={(e) => props.history.push('/dashboard')} type="primary">
					Dashboard
				</Button>
			}
		/>
	);
};

class Moduleroutes extends React.Component {
	componentDidMount() {
		LeavesServices.getLeaveTypes()
			.then((r) => {
				this.props.leaves.addLeaveTypes(r);
			})
			.catch((e) => {});

		LeavesServices.getLeaveApplications(CURRENT_USER)
			.then((r) => {
				this.props.leaves.addLeaveApplications(r);
			})
			.catch((e) => {});

		LeavesServices.getLeaveBalances(CURRENT_USER)
			.then((r) => {
				this.props.leaves.addLeaveBalances(r);
			})
			.catch((e) => {});
	}

	handleWithdraw(props) {
		let data = {
			id: props.id,
			status: 'Withdrawal'
		};

		LeavesServices.withdrawApplication(data)
			.then((r) => {
				if (r.type == 'error') {
					message.error(r.message);
				} else {
					message.success(r.message);
				}
			})
			.catch((e) => {});
	}

	render() {
		const ActionHTML = (props) => (
			<div>
				<Popconfirm
					placement="left"
					title={'Are you sure to withdraw?'}
					onConfirm={(e) => this.handleWithdraw(props)}
					okText="Yes"
					cancelText="No"
				>
					<Button>Withdraw</Button>
				</Popconfirm>
			</div>
		);

		const columns = [
			{
				title: '#',
				dataIndex: '#'
			},
			{
				title: 'Leave Type',
				dataIndex: 'type'
			},
			{
				title: 'Start',
				dataIndex: 'start',
				render: (t) => {
					return <div>{moment(t, 'YYYY-MM-DD').format('Do MMM YY')}</div>;
				}
			},
			{
				title: 'End',
				dataIndex: 'end',
				render: (t) => {
					return <div>{moment(t, 'YYYY-MM-DD').format('Do MMM YY')}</div>;
				}
			},
			{
				title: '# days',
				dataIndex: 'days'
			},
			{
				title: 'Reason',
				dataIndex: 'reason'
			},
			{
				title: 'Remarks',
				dataIndex: 'remark',
				render: (t) => {
					return <div>{t && t.length ? t : <span className="font-bold">No remarks</span>}</div>;
				}
			},
			{
				title: 'Status',
				dataIndex: 'status',
				render: (t) => {
					return (
						<div className={`text-cap ${t == 'Approved' ? 'text-green' : 'text-red'} font-bold text-dark`}>
							{t}
						</div>
					);
				}
			},
			{
				title: 'Action',
				dataIndex: 'action',
				render: (t) => {
					return (
						<div className={`text-cap ${t == 'Approved' ? 'text-green' : 'text-red'} font-bold text-dark`}>
							<Popover placement="left" title={'Actions'} content={ActionHTML(t)} trigger="click">
								<Button>
									<i class="fas fa-ellipsis-v" />
								</Button>
							</Popover>
						</div>
					);
				}
			}
		];

		const data = [];
		const leaveApplications = this.props.leaves.leaveApplications || [];

		for (let i = 0; i < leaveApplications.length; i++) {
			data.push({
				key: i,
				'#': i + 1,
				type: leaveApplications[i].leaveType.type,
				start: leaveApplications[i].startDate,
				end: leaveApplications[i].endDate,
				days:
					Math.abs(
						moment(leaveApplications[i].startDate, 'YYYY-MM-DD').diff(
							moment(leaveApplications[i].endDate, 'YYYY-MM-DD'),
							'days'
						)
					) + 1,
				reason: leaveApplications[i].reason,
				remark: leaveApplications[i].remark,
				status: leaveApplications[i].status,
				action: leaveApplications[i]
			});
		}

		return (
			<Suspense fallback={<Spin indicator={antIcon} />}>
				<Switch>
					<Route path="/" exact render={() => <Dashboard columnData={columns} tableData={data} />} />
					<Route path="/dashboard" render={() => <Dashboard columnData={columns} tableData={data} />} />
					<Route
						path="/leave-request"
						render={() => <LeaveRequest columnData={columns} tableData={data} />}
					/>
					<Route
						path="/leave-calendar"
						render={() => <LeaveCalendar columnData={columns} tableData={data} />}
					/>
					<Route path="/leave-reports" render={() => <LeaveReports />} />
					<Route component={NoMatchPage} />
				</Switch>
			</Suspense>
		);
	}
}

export default AuthRoutes(withRouter(inject('leaves')(observer(Moduleroutes))));
