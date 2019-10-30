import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Card, Carousel, Row, Col, Button, Icon, Divider, Table } from 'antd';
import ChartistGraph from 'react-chartist';
import { dailySalesChart } from '../chart';

import './Dashboard.scss';
const ButtonGroup = Button.Group;
const moment = require('moment');

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.carousel = React.createRef();
	}

	next() {
		this.carousel.next();
	}

	previous() {
		this.carousel.prev();
	}

	render() {
		let leaveBalances = this.props.leaves.leaveBalances || [];
		let leaveApplications = this.props.leaves.leaveApplications || [];
		let previousYearBalance = 0;
		let currentBalance = 0;
		let openingBalance = 0;
		let availableBalance = 0;
		let pendingApplications = 0;

		leaveBalances.map((lb) => {
			previousYearBalance += lb.previousYearBalance;
			availableBalance += lb.availableBalance;
			currentBalance += lb.currentBalance;
			openingBalance += lb.openingBalance;
		});

		leaveApplications.map((la) => {
			if (la.status == 'pending') pendingApplications++;
		});

		return (
			<div className="dashboard leave-management">
				<Row>
					<h2 className="text-dimmed font-xlarge"> Dashboard </h2>
				</Row>
				<Row className="mb" gutter={16} type="flex">
					<Col span={6}>
						<Card
							className="elevated-shadow-noh height-100"
							style={{ background: '#613DC1' }}
							bordered={false}
						>
							<p className="text-small text-white half-opacity ">Pending Requests</p>
							<p className="font-xlarge text-white">{pendingApplications}</p>
						</Card>
					</Col>
					<Col span={12}>
						<Card
							className="elevated-shadow-noh"
							style={{ background: '#58A4B0', height: '190px' }}
							bordered={false}
						>
							<ChartistGraph
								className="ct-chart"
								data={dailySalesChart.data}
								type="Line"
								options={dailySalesChart.options}
								listener={dailySalesChart.animation}
							/>
						</Card>
					</Col>
					<Col span={6}>
						<Card
							className="elevated-shadow-noh height-100"
							title="Holidays"
							bordered={false}
							style={{ background: '#06D6A0' }}
							extra={
								<ButtonGroup>
									<Icon type="left" className="text-white mr" onClick={this.previous} />
									<Icon type="right" className="text-white" onClick={this.next} />
								</ButtonGroup>
							}
						>
							<Carousel
								ref={(n) => (this.carousel = n)}
								autoplay
								afterChange={this.onChange}
								dots={false}
							>
								<Row type="flex" className="display-flex align-center justify-center">
									<Col span={11} className="text-center text-white font-medium">
										11st October 2019
									</Col>
									<Col span={1}>
										<Divider type="vertical" />
									</Col>
									<Col span={12} className="text-center text-white font-medium">
										Vara Mahalakshmi
									</Col>
								</Row>
								<Row type="flex" className="display-flex align-center justify-center">
									<Col span={11} className="text-center text-white font-medium">
										11st October 2019
									</Col>
									<Col span={1}>
										<Divider type="vertical" />
									</Col>
									<Col span={12} className="text-center text-white font-medium">
										2 Vara Mahalakshmi
									</Col>
								</Row>
								<Row type="flex" className="display-flex align-center justify-center">
									<Col span={11} className="text-center text-white font-medium">
										11st October 2019
									</Col>
									<Col span={1}>
										<Divider type="vertical" />
									</Col>
									<Col span={12} className="text-center text-white font-medium">
										3Vara Mahalakshmi
									</Col>
								</Row>
							</Carousel>
						</Card>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={6}>
						<Card className="elevated-shadow-noh" bordered={false} style={{ background: '#8AC926' }}>
							<p className="text-small text-white half-opacity ">Carried</p>
							<p className="font-large text-white">{previousYearBalance}</p>
						</Card>
					</Col>
					<Col span={6}>
						<Card className="elevated-shadow-noh" bordered={false} style={{ background: '#D00000' }}>
							<p className="text-small text-white half-opacity ">Opening</p>
							<p className="font-large text-white">{openingBalance}</p>
						</Card>
					</Col>
					<Col span={6}>
						<Card className="elevated-shadow-noh" bordered={false} style={{ background: '#F26419' }}>
							<p className="text-small text-white half-opacity ">Current</p>
							<p className="font-large text-white">{currentBalance}</p>
						</Card>
					</Col>
					<Col span={6}>
						<Card className="elevated-shadow-noh" bordered={false} style={{ background: '#3454D1' }}>
							<p className="text-small text-white half-opacity ">Days Available</p>
							<p className="font-large text-white">{availableBalance}</p>
						</Card>
					</Col>
				</Row>
				<Row className="mt">
					<Table
						title={() => 'Recent Updates'}
						loading={this.props.tableData.length <= 0}
						columns={this.props.columnData}
						pagination={false}
						dataSource={this.props.tableData}
						style={{ background: 'white' }}
					/>
				</Row>
			</div>
		);
	}
}

export default inject('leaves')(observer(Dashboard));
