import React from 'react';
import './LeaveRequest.scss';
import { Card, Form, Row, Col, Button, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import { dailySalesChart } from '../chart';
import ChartistGraph from 'react-chartist';
import ApplyLeaveModal from './ApplyLeaveModal';
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

	render() {
		let leaveTypes = this.props.leaves.leaveTypes || [];
		let leaveBalances = this.props.leaves.leaveBalances || [];
		let classes = [
			{ parent: 'marriage-chart', used: 'marriage-chart-used', avail: 'marriage-chart-available' },
			{ parent: 'paid-leave-chart', used: 'paid-leave-chart-used', avail: 'paid-leave-chart-available' },
			{ parent: 'sick-leave-chart', used: 'sick-leave-chart-used', avail: 'sick-leave-chart-available' },
			{ parent: 'unpaid-leave-chart', used: 'unpaid-leave-chart-used', avail: 'unpaid-leave-chart-available' }
		];

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
				</Row>
				<Row className="xmt">
					<h2 className="text-dimmed font-large"> Applied Leaves </h2>
				</Row>
				<Row>
					<Col>
						<Table
							loading={this.props.tableData.length <= 0}
							columns={this.props.columnData}
							pagination={false}
							dataSource={this.props.tableData}
							style={{ background: 'white' }}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}
export default Form.create()(inject('leaves')(observer(LeaveRequest)));
