import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';
import '../style.scss'
const DemoColumn: React.FC = () => {
  
var data = [
    {
        name:'一组',
        action: '星期一',
        pv: 50000
    },
    {
        name:'一组',
        action: '星期二',
        pv: 35000
    },
    {
        name:'一组',
        action: '星期三',
        pv: 25000
    },
    {
        name:'一组',
        action: '星期四',
        pv: 15000
    },
    {
        name:'一组',
        action: '星期五',
        pv: 8500
    },
    {
        name:'一组',
        action: '星期六',
        pv: 25000
    },
    {
        name:'一组',
        action: '星期日',
        pv: 8500
    },
    {
        name:'二组',
        action: '星期一',
        pv: 30000
    },
    {
        name:'二组',
        action: '星期二',
        pv: 25000
    },
    {
        name:'二组',
        action: '星期三',
        pv: 45000
    },
    {
        name:'二组',
        action: '星期四',
        pv: 19000
    },
    {
        name:'二组',
        action: '星期五',
        pv: 28500
    },
    {
        name:'二组',
        action: '星期六',
        pv: 21000
    },
    {
        name:'二组',
        action: '星期日',
        pv: 38500
    }
];
var config = {
    data: data,
    xField: 'action',
    yField: 'pv',
    conversionTag: {},
    autoFit:false,
    seriesField: 'name',
    width: 800,
    height:300,
    isGroup: true,
    color: ['#d62728', '#2ca02c'],
};
  return (
      <div className='table'>
          <div className='table-pillar'>
            <h1 style={{fontSize:'25px'}}>晗爸爸</h1>
            <Column {...config} />
          </div>
          <div className='table-list'>
            <h1 style={{fontSize:'25px'}}>晗爸爸</h1>
              <div>
                <ul className='table-list-1'>
                    <li>1qqw</li>
                    <li>1wqe</li>
                    <li>1qwe</li>
                    <li>1qwe</li>
                </ul>
                <ul className='table-list-2'>
                    <li>1qqw</li>
                    <li>1wqe</li>
                    <li>1qwe</li>
                    <li>1qwe</li>
                </ul>
              </div>
          </div>
      </div>
  );
};
export default DemoColumn;