import React from 'react';
import { Calendar, Card, Row, Col } from 'antd';
import './leaveCalendar.scss';

function onPanelChange(value, mode) {
	console.log(value, mode);
}

class Profile extends React.Component {
	render() {
		return (
			<div className="leave-calendar">
				<p className="text-muted font-large">Leave Calendar</p>
				<Row>
					<Col>
						<Card bordered={false} className="rounded-corner">
							<Calendar onPanelChange={onPanelChange} />
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Profile;
