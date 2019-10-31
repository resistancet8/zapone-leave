import React from 'react';
import { Layout, Icon, Avatar, Popover, Tabs, Badge, List } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import './Header.scss';
const { TabPane } = Tabs;
const { Header } = Layout;

const data = [
	'Racing car sprays burning fuel into crowd.',
	'Japanese princess to wed commoner.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.'
];

const MainHeader = ({ globals, history }) => {
	const logout = () => {
		globals.setLogin(false);
	};

	const onProfile = () => {
		history.push('/profile');
	};

	const content = (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<span style={{ cursor: 'pointer' }} onClick={logout}>
				Logout
			</span>
			<span style={{ cursor: 'pointer', marginTop: '10px' }} onClick={onProfile}>
				Profile
			</span>
		</div>
	);

	const content2 = (
		<Tabs defaultActiveKey="1">
			<TabPane tab="Notifications (3)" key="1" className="p0">
				<List
					size="large"
					dataSource={data}
					renderItem={(item) => <List.Item className="pl pr">{item}</List.Item>}
				/>
				<div class="notification-clear"><div>Clear Notification</div><div>View more</div></div>
			</TabPane>
			<TabPane tab="Messages (2)" key="2">
				<List
					size="large"
					dataSource={data}
					renderItem={(item) => <List.Item className="pl pr">{item}</List.Item>}
				/>
				<div class="notification-clear"><div>Clear Notification</div><div>View more</div></div>
			</TabPane>
		</Tabs>
	);

	return (
		<Header collapsible collapsed={globals.collapsed} className="header">
			<Icon className="trigger" type={globals.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={globals.toggle} />
			<div className="user-avt">
				<Popover placement="bottom" content={content} trigger="click">
					<Avatar icon="user" />
				</Popover>
			</div>
			<div className="user-avt">
				<Popover placement="topLeft" content={content2} trigger="click" overlayClassName="custom-popover-notification">
					<Badge className="custom-badge" count={4} showZero>
						<Icon type={'bell'} />
					</Badge>
				</Popover>
			</div>
			<span className="usersname">{Boolean(globals.user) && globals.user.firstName}</span>
		</Header>
	);
};

export default inject('globals')(withRouter(observer(MainHeader)));
