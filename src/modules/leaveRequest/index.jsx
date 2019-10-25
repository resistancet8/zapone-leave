import React from 'react';
import './LeaveRequest.scss';
import { Card, Form, DatePicker, Select, Input, Calendar, List, Avatar, Row, Col, Button, Icon, Modal } from 'antd';
import { dailySalesChart } from '../chart';
import ChartistGraph from 'react-chartist';
import ApplyLeaveModal from './ApplyLeaveModal';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const data = [
	{
		title: 'Prashant'
	},
	{
		title: 'Prakash'
	},
	{
		title: 'Dipak'
	},
	{
		title: 'Avinash'
	}
];

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
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="leave-request">
				<ApplyLeaveModal visible={this.state.leaveModalVisibilty} handleModalVisibility={this.handleModalVisibility.bind(this)} />
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
					<Col offset={12} span={6}>
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
					<Col span={5}>
						<Card
							className="elevated-shadow-noh"
							style={{ background: '#fff', height: '250px' }}
							bordered={false}
						>
							<p className="text-small text-dark half-opacity">Marriage Leave</p>
							<ChartistGraph
								className="ct-chart marriage-chart text-white"
								data={{
									series: [ 3, 10 ]
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
									<i class="fas fa-circle marriage-chart-used" /> Used &nbsp;&nbsp;&nbsp;<i class="fas fa-circle marriage-chart-available" />{' '}
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
							<p className="text-small text-dark half-opacity">Paid Leave</p>
							<ChartistGraph
								className="ct-chart paid-leave-chart text-white"
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
					</Col>
				</Row>
			</div>
		);
	}
}
export default Form.create()(LeaveRequest);
