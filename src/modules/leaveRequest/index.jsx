import React from 'react';
import './LeaveRequest.scss';
import { Card, Form, Row, Col, Button, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import { dailySalesChart } from '../chart';
import ChartistGraph from 'react-chartist';
import ApplyLeaveModal from './ApplyLeaveModal';
import LeavesServices from './../../services/LeavesServices';
const CURRENT_USER = 1651212538794259;

class LeaveRequest extends React.Component {
	state = {
		leaveModalVisibilty: false
	};

	onChangeDate = (date, dateString) => {
		console.log(date, dateString);
	};

	handleModalVisibility(leaveModalVisibilty) {
		this.setState({ leaveModalVisibilty });
	}

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

	render() {
		let leaveTypes = this.props.leaves.leaveTypes || [];
		let leaveBalances = this.props.leaves.leaveBalances || [];

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
				dataIndex: 'start'
			},
			{
				title: 'End',
				dataIndex: 'end'
			},
			{
				title: '# days',
				dataIndex: 'days'
			},
			{
				title: 'Remarks',
				dataIndex: 'remark'
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
				dataIndex: 'action'
			}
		];

		const data = [];
		const leaveApplications = this.props.leaves.leaveApplications || [];
		let classes = [
			{ parent: 'marriage-chart', used: 'marriage-chart-used', avail: 'marriage-chart-available' },
			{ parent: 'paid-leave-chart', used: 'paid-leave-chart-used', avail: 'paid-leave-chart-available' },
			{ parent: 'sick-leave-chart', used: 'sick-leave-chart-used', avail: 'sick-leave-chart-available' },
			{ parent: 'unpaid-leave-chart', used: 'unpaid-leave-chart-used', avail: 'unpaid-leave-chart-available' }
		];

		for (let i = 0; i < leaveApplications.length; i++) {
			data.push({
				key: i,
				'#': i + 1,
				type: leaveApplications[i].leaveType.type,
				start: leaveApplications[i].startDate,
				end: leaveApplications[i].endDate,
				days: 3,
				remark: leaveApplications[i].remark,
				status: leaveApplications[i].status
			});
		}

		return (
			<div className="leave-request">
				<ApplyLeaveModal
					CURRENT_USER={CURRENT_USER}
					leaveTypes={leaveTypes}
					visible={this.state.leaveModalVisibilty}
					handleModalVisibility={this.handleModalVisibility.bind(this)}
				/>
				<Row>
					<h2 className="text-dimmed font-large"> Apply Leave </h2>
				</Row>
				<Row gutter={16} type="flex">
					<Col span={6}>
						<Card className="elevated-shadow-noh height-100" bordered={false}>
							<p className="text-small text-dark half-opacity">Pending Request</p>
							<p className="font-xlarge text-dark">Not Available</p>
						</Card>
					</Col>
					<Col span={12}>
						<Card className="elevated-shadow-noh height-100" bordered={false}>
							<p className="text-small text-dark half-opacity">Upcoming Holiday</p>
							<p className="font-xlarge text-dark">23rd October 2019 / Wednesday</p>
						</Card>
					</Col>
					<Col span={6}>
						<Card className="elevated-shadow-noh height-100" bordered={false}>
							<Button type="danger" icon="form" onClick={() => this.handleModalVisibility(true)}>
								Apply Leave
							</Button>
						</Card>
					</Col>
				</Row>
				<Row className="xmt">
					<h2 className="text-dimmed font-large"> Leave Balance </h2>
				</Row>
				<Row gutter={16}>
					{leaveBalances &&
						leaveBalances.map((lb, index) => {
							return (
								<Col span={4} className="mb">
									<Card
										className="elevated-shadow-noh"
										style={{ background: '#fff', height: '250px' }}
										bordered={false}
									>
										<p className="text-small text-dark half-opacity">{lb.leaveType.type}</p>
										<ChartistGraph
											className={`${classes[index % classes.length].parent} ct-chart text-white`}
											data={{
												series: [ lb.currentBalance, lb.availableBalance ]
											}}
											type="Pie"
											options={{
												donut: true,
												donutWidth: 30,
												donutSolid: true
											}}
											listener={dailySalesChart.animation}
										/>
										<center>
											<p className="font-tiny text-dimmed text-dark">
												<i
													class={`fas fa-circle ${classes[index % classes.length].used}`}
												/>{' '}
												Used &nbsp;&nbsp;&nbsp;<i class={`fas fa-circle ${classes[index % classes.length].avail}`} />{' '}
												Available{' '}
											</p>
										</center>
									</Card>
								</Col>
							);
						})}

					{/* <Col span={5}>
						<Card
							className="elevated-shadow-noh"
							style={{ background: '#fff', height: '250px' }}
							bordered={false}
						>
							<p className="text-small text-dark half-opacity">Paid Leave</p>
							<ChartistGraph
								className="ct-chart  text-white"
								data={{
									series: [ 4, 3 ]
								}}
								type="Pie"
								options={{
									donut: true,
									donutWidth: 30,
									donutSolid: true
								}}
								listener={dailySalesChart.animation}
							/>
							<center>
								<p className="font-tiny text-dimmed text-dark">
									<i class="fas fa-circle paid-leave-chart-used" /> Used &nbsp;&nbsp;&nbsp;<i class="fas fa-circle paid-leave-chart-available" />{' '}
									Available{' '}
								</p>
							</center>
						</Card>
					</Col>
					<Col span={5}>
						<Card
							className="elevated-shadow-noh"
							style={{ background: '#fff', height: '250px' }}
							bordered={false}
						>
							<p className="text-small text-dark half-opacity">Sick Leave</p>
							<ChartistGraph
								className="ct-chart sick-leave-chart text-white"
								data={{
									series: [ 5, 5 ]
								}}
								type="Pie"
								options={{
									donut: true,
									donutWidth: 30,
									donutSolid: true
								}}
								listener={dailySalesChart.animation}
							/>
							<center>
								<p className="font-tiny text-dimmed text-dark">
									<i class="fas fa-circle sick-leave-chart-used" /> Used &nbsp;&nbsp;&nbsp;<i class="fas fa-circle sick-leave-chart-available" />{' '}
									Available{' '}
								</p>
							</center>
						</Card>
					</Col>
					<Col span={5}>
						<Card
							className="elevated-shadow-noh"
							style={{ background: '#fff', height: '250px' }}
							bordered={false}
						>
							<p className="text-small text-dark half-opacity">Unpaid Leave</p>
							<ChartistGraph
								className="ct-chart unpaid-leave-chart text-white"
								data={{
									series: [ 15, 5 ]
								}}
								type="Pie"
								options={{
									donut: true,
									donutWidth: 30,
									donutSolid: true
								}}
								listener={dailySalesChart.animation}
							/>
							<center>
								<p className="font-tiny text-dimmed text-dark">
									<i class="fas fa-circle unpaid-leave-chart-used" /> Used &nbsp;&nbsp;&nbsp;<i class="fas fa-circle unpaid-leave-chart-available" />{' '}
									Available{' '}
								</p>
							</center>
						</Card>
					</Col>
					<Col span={4}>
						<Card
							className="elevated-shadow-noh"
							style={{ background: '#fff', height: '250px' }}
							bordered={false}
						>
							<p className="text-small text-dark half-opacity">On Office Duty</p>
							<div className="display-flex justify-center align-center height-100">
								<p className="font-medium font-thin text-muted">No data to display.</p>
							</div>
						</Card>
					</Col> */}
				</Row>
				<Row className="xmt">
					<h2 className="text-dimmed font-large"> Applied Leaves </h2>
				</Row>
				<Row>
					<Col>
						<Table
							loading={data.length <= 0}
							columns={columns}
							pagination={false}
							dataSource={data}
							style={{ background: 'white' }}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}
export default Form.create()(inject('leaves')(observer(LeaveRequest)));
