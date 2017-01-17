import React, { Component } from 'react';

export default class List extends Component {

  static propTypes = {};
  static defaultProps = {};

  constructor(props){
    super(props);

    this.state = {
      value1: 1,
      value2: 2,
      items: [1,2,3,4,5,6,7,8]
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps')
  }

  shouldComponentUpdate(nextProps, nextState){

    console.log('1. shouldComponentUpdate');

    // if( this.state.items === nextState.items){
    //   return false;
    // }
    return true;
  }

  componentWillUpdate(nextProps, nextState){
    console.log('2. componentWillUpdate', nextState);
  }

  render(){

    console.log('3. ===== render ====\n\n\n ');
    return (
      <div className="List">
        <div>
          {this.state.items.map( (item, i) => {

            return (
              <div key={i}> => {item} </div>
            )

          } )}
        </div>



        <button onClick={this.handleClick}>추가</button>
      </div>
    );
  }

  handleClick = () => {

    const { items } = this.state;

//    items.push( Math.round( Math.random()*1000) );
    this.setState({
      value1:  Math.random()*1000
    });

    //setTimeout(()=>{

    this.setState({
      value2:  Math.random()*1000
    });

    //}, 0)

    this.setState({
      items: [...items, Math.round( Math.random()*1000) ]
    });
  }
}
