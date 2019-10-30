import React from 'react';
import { Row, Col, Table, Form } from 'antd';
import { inject, observer } from 'mobx-react';
import LeavesServices from './../../services/LeavesServices';
import './leaveReports.scss';
const CURRENT_USER = 1651212538794259;

class Profile extends React.Component {
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

export default Form.create()(inject('leaves')(observer(Profile)));
