import React, {Component} from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

class Dashboard extends Component {
    render() {
        return (
            <div className={'Dashboard'}>
                <h3 style={{marginBottom: '2rem'}}>Dashboard</h3>
                <div className="site-statistic-demo-card">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card>
                                <Statistic
                                    title="New users"
                                    value={Math.floor(Math.random() * Math.floor(100))}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card>
                                <Statistic
                                    title="Inactive"
                                    value={Math.floor(Math.random() * Math.floor(100))}
                                    precision={0}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Dashboard;