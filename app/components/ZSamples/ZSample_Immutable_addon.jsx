import './ZSample.less'
import React, { Component, PropTypes } from 'react'
import update from 'react-addons-update'

export default class ZSample extends Component {

  static propTypes = {
  };

  static defaultProps = {
    propery: '기본값'
  };

  constructor(props){
    super(props);

    this.state = {
      student: {
        name:'컴포넌트',
        grades:['A','B','C']
      },
      ticket: {
        company: 'Dalta',
        flightNo: '0990',
        departure: {
          airport: 'LAX',
          time: '2016-08-21T10:00:00.000Z'
        },
        arrival: {
          airport: 'MIA',
          time: '2016-08-21T10:00:00.000Z'
        },
        codeshare: [
          {company: 'GL', flightNo: '9870'},
          {company: 'TM', flightNo: '1230'},
        ]
      }
    }
  }

  render(){
    return (
      <div>ES6 클래스 컴포넌트</div>
    );
  }

  // $push <-> $unshift | $splice 부분교체, $set 완전교체, $merge 병합 | $apply 변환
  handleUpdate = () => {
    const {student, ticket} = this.state;
    const newPush    = update(student, {grades:{$push:['A']}});
    const newSet     = update(student, {grades:{$set:['A','A']}});
    const newIdx     = update(ticket, {codeshare: { 0: {$set: {company:'AZ', flightNo: '7320'}} } });
    const newUnshift = update(ticket, {codeshare: { $unshift: {company:'XX', flightNo: '2213'}} })

    let obj = {a:5, b:3};
    let newOjj = update(obj, {b: {$apply: (value) => value * 2}});
    // => {a:5, b:6}
  }

  // npm install --save whatwg-fetch
}