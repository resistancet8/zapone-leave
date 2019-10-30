import React from 'react';
import { Row, Col, Table, Form } from 'antd';
import { inject, observer } from 'mobx-react';
import './leaveReports.scss';

class Profile extends React.Component {
	render() {
		return (
			<div className="leave-reports">
				<p className="text-muted font-large">Reports</p>
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

export default Form.create()(inject('leaves')(observer(Profile)));
