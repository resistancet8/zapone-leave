import React, { Component } from 'react';
import {
	DatePicker,
	Select,
	Input,
	Calendar,
	Row,
	Col,
	Button,
	Icon,
	Modal,
	Alert,
	Divider,
	Form,
	message
} from 'antd';
import LeavesServices from './../../services/LeavesServices';
const { RangePicker } = DatePicker;
const moment = require('moment');
const { Option, OptGroup } = Select;
const { TextArea } = Input;
const OPTIONS = [
	{ username: 'naveen', name: 'Naveen', email: 'naveen@gmail.com' },
	{ username: 'avinash', name: 'Avinash', email: 'avinash@gmail.com' },
	{ username: 'dishal', name: 'Vishal', email: 'vishal@gmail.com' },
	{ username: 'dipak', name: 'Dipak', email: 'dipak@gmail.com' }
];
const CURRENT_USER = 1651212538794259;

function getListData(value) {
	let listData = [];
	switch (value.day()) {
		case 0:
			listData = [ { type: 'error' } ];
			break;
		case 6:
			listData = [ { type: 'error' } ];
			break;
		default:
	}
	return listData || [];
}

function dateCellRender(value) {
	const listData = getListData(value);
	return (
		<ul className="events">
			{listData.map((item) => (
				<li key={item.content}>
					<span className={`event-${item.type}`}>●</span>
				</li>
			))}
		</ul>
	);
}

class ApplyLeaveModal extends Component {
	state = {
		noOfDays: 0,
		selectedItems: [],
		loading: false
	};

	handleNotifyPeople = (selectedItems) => {
		this.setState({ selectedItems });
	};

	onCalendarChange(dates) {
		this.setState({
			noOfDays: Math.abs(moment(dates[1]).diff(dates[0], 'days') + 1)
		});
	}

	disabledDate(current) {
		return moment(current).add(1, 'days') < moment().endOf('day');
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		setTimeout(() => {
			this.props.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					let data = {
						leaveType: {id : values.leave_type},
						leaveApplicationUser: {
							id: this.props.CURRENT_USER
						},
						reason: values.reason,
						startDate: moment(values.range_date[0]).toISOString(),
						endDate: moment(values.range_date[1]).toISOString()
					};

					LeavesServices.applyLeave(data)
						.then((r) => {
							if (r.type == 'error') {
								message.error(r.message);
							} else {
								message.success(r.message);
							}
						})
						.catch((e) => {
							message.error(e.message);
						});
				} else {
					message.error('there are errors');
				}
				this.setState({ loading: false });
			});
		}, 2000);
	};

	render() {
		const { selectedItems } = this.state;
		const { getFieldDecorator } = this.props.form;

		return (
			<Modal
				centered
				title={`Apply Leave for ${this.state.noOfDays} Day(s)`}
				width={'50%'}
				footer={false}
				visible={this.props.visible}
				onOk={() => this.props.handleModalVisibility(false)}
				onCancel={() => this.props.handleModalVisibility(false)}
			>
				<Row type="flex" gutter={16}>
					<Col span={12}>
						<Form onSubmit={this.handleSubmit}>
							<Form.Item hasFeedback className="m0">
								{getFieldDecorator('range_date', {
									rules: [ { type: 'array', required: true, message: 'Please select range!' } ]
								})(
									<RangePicker
										className="width-100"
										disabledDate={this.disabledDate}
										onCalendarChange={this.onCalendarChange.bind(this)}
										format={'DD/MM/YYYY'}
									/>
								)}
							</Form.Item>
							{this.state.noOfDays > 0 && (
								<Alert
									className="mt"
									message={`Leave Request is for ${this.state.noOfDays} day(s)`}
									type="warning"
								/>
							)}
							<Form.Item hasFeedback className="m0">
								<p className="text-dimmed mt font-small m0">Select Leave Type</p>
								{getFieldDecorator('leave_type', {
									rules: [ { required: true, message: 'Please select leave type!' } ]
								})(
									<Select
										optionLabelProp="label"
										showSearch={true}
										placeholder="Choose Leave Type"
										allowClear={true}
										autoClearSearchValue={true}
										style={{ width: '100%' }}
										onChange={this.handleChange}
									>
										{this.props.leaveTypes &&
											this.props.leaveTypes.map((leaveType) => {
												return (
													<Option
														key={leaveType.id}
														value={leaveType.id}
														label={leaveType.type}
														gutter={2}
													>
														<Row type="flex">
															<Col span={2} className="justify-center align-center">
																<Icon type="check-circle" className="text-green" />
															</Col>
															<Col span={22}>
																<p className="text-dark m0">
																	{leaveType.shorttype} - {leaveType.type}
																</p>
																<p className="text-dimmed font-small m0 text-green">
																	{leaveType.description}
																</p>
															</Col>
														</Row>
													</Option>
												);
											})}
									</Select>
								)}
							</Form.Item>

							<p className="text-dimmed mt font-small m0">Note</p>
							<Form.Item hasFeedback className="m0">
								{getFieldDecorator('reason', {
									rules: [
										{
											required: true,
											message: 'Please enter reason for applying leave!'
										}
									]
								})(<TextArea placeholder="Please enter reason for applying leave" rows={4} />)}
							</Form.Item>
							<p className="text-dimmed font-tiny mt">
								Note: These employees will be notified through email when your leave request is
								approved.
							</p>
							<Row type="flex" style={{ 'justify-content': 'flex-end' }}>
								<Col>
									<Button onClick={() => this.props.handleModalVisibility(false)}> Cancel </Button>
									<Button
										type="primary"
										className="ml"
										htmlType="submit"
										loading={this.state.loading}
									>
										{' '}
										Apply{' '}
									</Button>
								</Col>
							</Row>
						</Form>
					</Col>

					<Col span={12}>
						<Calendar style={{ width: '100%' }} fullscreen={false} dateCellRender={dateCellRender} />
						<Divider />
						<div className="info">
							<p className="p0 m0 ml mt">
								<span className={`event-error`}>●</span> Weekend
							</p>
						</div>
					</Col>
				</Row>
			</Modal>
		);
	}
}
export default Form.create({ name: 'leave_form' })(ApplyLeaveModal);
