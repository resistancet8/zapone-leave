import React from 'react';
import { Row, Col, Table, Form, message, Button, Dropdown, Menu, Icon, DatePicker } from 'antd';
import LeavesServices from './../../services/LeavesServices';
import './leaveReports.scss';
const { RangePicker } = DatePicker;
const moment = require('moment');
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
		title: '# day(s)',
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
	}
];

class Profile extends React.Component {
	state = {
		reports: null,
		startDate: moment().subtract(2, 'months').startOf('month'),
		endDate: moment()
	};

	componentDidMount() {
		let data = {
			startDate: this.state.startDate.format('YYYY-MM-DD'),
			endDate: this.state.endDate.format('YYYY-MM-DD')
		};

		LeavesServices.getLeaveReports(data)
			.then((r) => {
				this.setState({
					reports: r
				});
			})
			.catch((e) => {});
	}

	onCalendarChange(dates) {
		if (dates.length == 2) {
			this.setState(
				{
					startDate: dates[0],
					endDate: dates[1]
				},
				() => {
					let data = {
						startDate: this.state.startDate.format('YYYY-MM-DD'),
						endDate: this.state.endDate.format('YYYY-MM-DD')
					};

					LeavesServices.getLeaveReports(data)
						.then((r) => {
							this.setState({
								reports: r
							});
						})
						.catch((e) => {});
				}
			);
		}
	}

	handleReportDownload() {
		let data = {
			startDate: this.state.startDate.format('YYYY-MM-DD'),
			endDate: this.state.endDate.format('YYYY-MM-DD')
		};

		LeavesServices.downloadReportXLS(data)
			.then((r) => {
				message.success("Downloaded!")
			})
			.catch((e) => {});
	}

	render() {
		const data = [];
		const leaveApplications = this.state.reports || [];

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
					) +
					1 +
					' Day(s)',
				reason: leaveApplications[i].reason,
				remark: leaveApplications[i].remark,
				status: leaveApplications[i].status
			});
		}

		const menu = (
			<Menu>
				<Menu.Item key="0" className="text-center">
					<a href="#" onClick={this.handleReportDownload.bind(this)}>
						<i class="fas fa-file-excel" /> &nbsp; XLS
					</a>
				</Menu.Item>
			</Menu>
		);

		return (
			<div className="leave-reports">
				<Row gutter={16}>
					<Col span={5}>
						<p className="text-muted font-large">Reports</p>
					</Col>
					<Col span={5} offset={12}>
						<RangePicker
							onChange={this.onCalendarChange.bind(this)}
							ranges={{
								Today: [ moment().subtract(1, 'days'), moment() ],
								'This Month': [ moment().startOf('month'), moment().endOf('month') ],
								'Last Month': [ moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month') ],
								'This Year': [ moment().startOf('year'), moment() ]
							}}	
							defaultValue={[ this.state.startDate, this.state.endDate ]}
							format="YYYY-MM-DD"
						/>
					</Col>
					<Col span={2}>
						<Dropdown overlay={menu} trigger={[ 'click' ]}>
							<Button>
								Download <Icon type="download" />
							</Button>
						</Dropdown>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table columns={columns} pagination={true} dataSource={data} style={{ background: 'white' }} />
					</Col>
				</Row>
			</div>
		);
	}
}

export default Form.create()(Profile);
