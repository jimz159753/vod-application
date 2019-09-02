import React, { Component } from 'react';
import { Menu, Row, Card, Carousel, List } from 'antd';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import ls from 'local-storage';
import { wobble } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import Hotkeys from 'react-hot-keys';
import 'antd/dist/antd.css';
import './assets/css/App.css';

const { Item } = Menu;
const { Meta } = Card;

const bounceAnimation = keyframes`${wobble}`;
const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      movie: {},
      data: {},
      current: 'item_0',
      modalIsOpen: false,
      history: [],
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { history } = this.state
    fetch('https://demo2697834.mockable.io/movies')
    .then(response => response.json())
    .then(data => this.setState({data}));
    ls('history', history);
  }

  openModal(movie) {
    const { history } = this.state;
    const currentHistory = history;
    currentHistory.push(movie.title)
    this.setState({modalIsOpen: true, movie, history: currentHistory});
    ls('history', history);
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleClick(e) {
    this.setState({
      current: e.key,
    });
  };

  onKeyRight(keyName, e, handle) {
    console.log("test:onKeyUpaaaaa  ", keyName, e, handle)
    
  }
  onKeyDown(keyName, e, handle) {
    console.log("test:onKeyDown", keyName, e, handle)
    
  }

  render() {
    const { data, movie, current } = this.state;
    const customStyles = {
            content: {
            width: '80%',
            height: '85%',
            top: '60px',
            left: '150px',
            bottom: '60px',
            } 
          }
    
    
    
    console.log('HISTORY',ls('history'))
    const history = ls('history')
    return (
      <Hotkeys
      keyName="command+left,command+right" 
      onKeyDown={this.onKeyDown.bind(this)}
      nKeyRight={this.onKeyRight.bind(this)}>
        <div>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Item>
              <BouncyDiv>
                <h1>VOD APPLICATION</h1>
              </BouncyDiv>
            </Item>
            <Item className="btn-history">
              <h2>History</h2>
            </Item>
          </Menu>
          { current === 'item_0' ?
              <Row>
                <Carousel effect='scrollx'>
                  <div>
                    {
                      data.entries?
                        data.entries.map(mov =>
                          (<Card
                              key={mov.id}
                              onClick={()=>this.openModal(mov)}
                              hoverable
                              style={{ height: '100%',width: '250px' }}
                              cover={<img 
                                        alt="example" 
                                        src={mov.images[0].url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFpKVUcVn3fiOjuwf5hLu56tIZtSE5HRjw7wQOEmFpWkbd1kWd'} />}
                            >
                              <Meta title={mov.title}/>
                            </Card>)
                        )
                      :
                        null
                    }
                  </div>
                </Carousel>
                <Modal
                  style={customStyles}
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  contentLabel="modal-cart-container"
                  ariaHideApp={false}
                >
                  <button className="btn-modal" onClick={this.closeModal}>close</button>
                  <div className="video-container">
                    <ReactPlayer
                        width='80%'
                        height='80%'
                        url={movie.contents?movie.contents[0].url:''} 
                        playing 
                        controls 
                        onEnded={this.closeModal}/>
                  </div>
                </Modal>
              </Row>
            :
              <List
                size="large"
                bordered
                dataSource={history}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
        }
        </div>
        </Hotkeys>
    )
  }
}

export default App;