import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Menu, Row, Col } from 'antd';
import './assets/css/App.css';

const { Item } = Menu;


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 'mail',
    };
    
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };



  render() {
    return (
        <div>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Item>
              <h2>Home</h2>
            </Item>
            <Item className="btn-history">
              <h3>History</h3>
            </Item>
          </Menu>
          <Row>
            <div className="movies-container">
              <Col span={4}>
                <div className="cart-container">
                  <img src="https://thetvtraveler.com/wp-content/uploads/2019/03/endgame.jpg" />
                  <p>Avengers</p>
                </div>
              </Col>
              <Col span={4}>
                <div className="cart-container">
                  <img src="https://thetvtraveler.com/wp-content/uploads/2019/03/endgame.jpg" />
                  <p>Avengers</p>
                </div>
              </Col>
              <Col span={4}>
                <div className="cart-container">
                  <img src="https://thetvtraveler.com/wp-content/uploads/2019/03/endgame.jpg" />
                  <p>Avengers</p>
                </div>
              </Col>
              <Col span={4}>
                <div className="cart-container">
                  <img src="https://thetvtraveler.com/wp-content/uploads/2019/03/endgame.jpg" />
                  <p>Avengers</p>
                </div>
              </Col>
              <Col span={4}>
                <div className="cart-container">
                  <img src="https://thetvtraveler.com/wp-content/uploads/2019/03/endgame.jpg" />
                  <p>Avengers</p>
                </div>
              </Col>
              <Col span={4}>
                <div className="cart-container">
                  <img src="https://thetvtraveler.com/wp-content/uploads/2019/03/endgame.jpg" />
                  <p>Avengers</p>
                </div>
              </Col>
              <Col span={4}>
                <div className="cart-container">
                  <img src="https://thetvtraveler.com/wp-content/uploads/2019/03/endgame.jpg" />
                  <p>Avengers</p>
                </div>
              </Col>
              <Col span={4}>
                <div className="cart-container">
                  <img src="https://thetvtraveler.com/wp-content/uploads/2019/03/endgame.jpg" />
                  <p>Avengers</p>
                </div>
              </Col>
              <Col span={4}>
                <div className="cart-container">
                  <img src="https://thetvtraveler.com/wp-content/uploads/2019/03/endgame.jpg" />
                  <p>Avengers</p>
                </div>
              </Col>
            </div>
          </Row>
          

        </div>
    )
  }
}
