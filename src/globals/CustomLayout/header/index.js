import React from 'react';
import { Layout, Icon, Avatar, Popover, Tabs, Badge } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import './Header.scss';
const { TabPane } = Tabs;
const { Header } = Layout;

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
		<Tabs defaultActiveKey="0" tabPosition={'topLeft'} style={{ height: 220 }}>
			<TabPane tab={`Notifications (4)`} key={0}>
				Content of tab
			</TabPane>
			<TabPane tab={`Messages (2)`} key={1}>
				Content of tab
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
				<Popover placement="topLeft" content={content2} trigger="click">
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
