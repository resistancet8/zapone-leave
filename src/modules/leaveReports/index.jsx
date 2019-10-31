import React from 'react';
import { Row, Col, Table, Form, Popover, Popconfirm, message, Button, Dropdown, Menu, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import './leaveReports.scss';

const moment = require('moment');

class Profile extends React.Component {
	render() {
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
					<a href="#">
						<i class="fas fa-file-excel" /> &nbsp; XLS
					</a>
				</Menu.Item>
			</Menu>
		);

		return (
			<div className="leave-reports">
				<Row>
					<Col span={5}>
						<p className="text-muted font-large">Reports</p>
					</Col>
					<Col span={2} offset={17}>
						<Dropdown overlay={menu} trigger={[ 'click' ]}>
							<Button>
								Download <Icon type="download" />
							</Button>
						</Dropdown>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table
							loading={data.length <= 0}
							columns={columns}
							pagination={true}
							dataSource={data}
							style={{ background: 'white' }}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Form.create()(inject('leaves')(observer(Profile)));
