import React, { Component } from 'react';

import { Menu, Row, Card, Carousel } from 'antd';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import 'antd/dist/antd.css';
import './assets/css/App.css';

const { Item } = Menu;
const { Meta } = Card;


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      movie: {},
      data: {},
      current: 'mail',
      modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('https://demo2697834.mockable.io/movies')
    .then(response => response.json())
    .then(data => this.setState({data}));
  }

  openModal(movie) {
    this.setState({modalIsOpen: true, movie});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };



  render() {
    const { data, movie } = this.state;
    const customStyles = {
            content: {
            width: '80%',
            height: '85%',
            top: '60px',
            left: '150px',
            bottom: '60px',
            } 
          }
    
    console.log(data)
    console.log('movie',movie)
    return (
        <div>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Item>
              <h1>VOD APPLICATION</h1>
            </Item>
            <Item className="btn-history">
              <h2>History</h2>
            </Item>
          </Menu>
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
              <button onClick={this.closeModal}>close</button>
              <p>modal</p>
              <div className="video-container">
                <ReactPlayer 
                    url={movie.contents?movie.contents[0].url:''} 
                    playing 
                    controls 
                    onEnded={this.closeModal}/>
              </div>
            </Modal>
          </Row>
          

        </div>
    )
  }
}
