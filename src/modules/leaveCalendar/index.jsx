import React from 'react';
import LeavesServices from './../../services/LeavesServices';
import { Calendar, Card, Row, Col, Badge, List } from 'antd';
import './leaveCalendar.scss';
import moment from 'moment';

function onPanelChange(value, mode) {
	console.log(value, mode);
}

function getListData(value) {
	let listData = [];
	switch (value.day()) {
		case 0:
			listData = [ { type: 'warning', content: 'Weekoff' } ];
			break;
		case 6:
			listData = [ { type: 'warning', content: 'Weekoff' } ];
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
					<Badge status={item.type} text={item.content} />
				</li>
			))}
		</ul>
	);
}

class Profile extends React.Component {
	state = {
		leaveData: []
	};

	componentDidMount() {
		LeavesServices.getAllOrganizationLeaves()
			.then((r) => {
				this.setState({
					leaveData: r
				});
			})
			.catch((e) => {});
	}

	render() {
		console.log('+++', this.state);

		return (
			<div className="leave-calendar">
				<p className="text-muted font-large">Leave Calendar</p>
				<Row gutter={16} type="flex">
					<Col span={18}>
						<Card bordered={false} className="rounded-corner">
							<Calendar dateCellRender={dateCellRender} onPanelChange={onPanelChange} />
						</Card>
					</Col>
					<Col span={6}>
						<Card className="mb" bordered={false}>
							<Badge status="error" text="Leave" />
							<Badge className="ml" status="warning" text="Weekoff" />
						</Card>
						<Card bordered={false} className="rounded-corner" style={{ height: '100%' }}>
							<List
								size="large"
								dataSource={this.state.leaveData}
								renderItem={(item) => (
									<List.Item style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
										<div className="font-bold">{item.leaveApplicationUser.firstName} </div>
										<div className="text-dimmed">
											On leave for{' '}
											<span className="font-bold">
												{Math.abs(
													moment(item.startDate, 'YYYY-MM-DD').diff(
														moment(item.endDate, 'YYYY-MM-DD'),
														'days'
													)
												) + 1}{' '}
												Day(s)
											</span>{' '}
											from <span className="font-bold">{moment(item.startDate, "YYYY-MM-DD").format('Do MMM YY')}</span>
										</div>
									</List.Item>
								)}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Profile;
