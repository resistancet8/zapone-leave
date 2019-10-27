import React from 'react';
import { Calendar, Card, Row, Col, Table } from 'antd';
import './leaveReports.scss';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

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
				title: 'Status',
				dataIndex: 'status',
				render: (t) => {
					return (
						<div className={`${t == 'Approved' ? 'text-green' : 'text-red'} font-bold text-dark`}>{t}</div>
					);
				}
			}
		];

    const data = [];
    const randomLeaves = [ 'SL - Sick Leave', 'CL - Casual Leave', 'EL - Earned Leave' ];
		const randomStatus = [ 'Approved', 'Rejected' ];
		for (let i = 0; i < 20; i++) {
			data.push({
				key: i,
				'#': i + 1,
				type: randomLeaves[Math.floor(Math.random() * (randomLeaves.length - 0)) + 0],
				start: `${Math.floor(Math.random() * (12 - 5 + 1)) + 5}/${Math.floor(Math.random() * (12 - 5 + 1)) +
					5}/${Math.floor(Math.random() * (2020 - 2010 + 1)) + 2010}`,
				end: `${Math.floor(Math.random() * (12 - 5 + 1)) + 5}/${Math.floor(Math.random() * (12 - 5 + 1)) +
					5}/${Math.floor(Math.random() * (2020 - 2010 + 1)) + 2010}`,
				days: Math.floor(Math.random() * (12 - 5 + 1)) + 5,
				status: randomStatus[Math.floor(Math.random() * (randomStatus.length - 0)) + 0]
			});
    }
    
    return (
      <div className="leave-reports">
        <p className="text-muted font-large">Reports</p>
        <Row>
          <Col>
            <Table
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

export default Profile;
