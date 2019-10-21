import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Card, Carousel, Row, Col, Button, Icon, Divider, Table } from 'antd';
import ChartistGraph from 'react-chartist';
import { dailySalesChart } from '../chart';

import './Dashboard.scss';
const ButtonGroup = Button.Group;

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
		const { globals: { userInfo } } = this.props;
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
		for (let i = 0; i < 5; i++) {
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
			<div className="dashboard leave-management">
				<Row>
					<h2 className="text-dimmed font-xlarge"> Dashboard </h2>
				</Row>
				<Row className="mb" gutter={16} type="flex">
					<Col span={6}>
						<Card className="elevated-shadow-noh height-100" style={{ background: '#613DC1' }} bordered={false}>
							<p className="text-small text-white half-opacity ">Pending Requests</p>
							<p className="font-xlarge text-white">23</p>
						</Card>
					</Col>
					<Col span={12}>
						<Card className="elevated-shadow-noh" style={{ background: '#58A4B0', height: '190px' }} bordered={false}>
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
							<p className="font-large text-white">256</p>
						</Card>
					</Col>
					<Col span={6}>
						<Card className="elevated-shadow-noh" bordered={false} style={{ background: '#D00000' }}>
							<p className="text-small text-white half-opacity ">Leave Credit</p>
							<p className="font-large text-white">23</p>
						</Card>
					</Col>
					<Col span={6}>
						<Card className="elevated-shadow-noh" bordered={false} style={{ background: '#F26419' }}>
							<p className="text-small text-white half-opacity ">Leave Debit</p>
							<p className="font-large text-white">65</p>
						</Card>
					</Col>
					<Col span={6}>
						<Card className="elevated-shadow-noh" bordered={false} style={{ background: '#3454D1' }}>
							<p className="text-small text-white half-opacity ">Days Available</p>
							<p className="font-large text-white">12</p>
						</Card>
					</Col>
				</Row>
				<Row className="mt">
					<Table
						title={() => 'Recent Updates'}
						columns={columns}
						pagination={false}
						dataSource={data}
						style={{ background: 'white' }}
					/>
				</Row>
			</div>
		);
	}
}

export default inject('globals')(observer(Dashboard));
