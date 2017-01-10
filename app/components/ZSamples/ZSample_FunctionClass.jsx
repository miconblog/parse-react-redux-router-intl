import './ZSample.less'
import React from 'react'

export default function ZSample({props}) {
  var locals = 'local valuable';

  return (
    <div>
      {locals && <span>상태가 없는 단순한 랜더링 전용 컴포넌트</span>}
    </div>
  );
}