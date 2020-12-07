import { useSelector, useDispatch } from "react-redux"
import action from "@/store/actions"
import { useEffect } from "react";


import { Table } from 'antd';

export default props => {
    const weather = useSelector(store => store.weather.result)
    const city = useSelector(store => store.weather.city)
    const dispatch = useDispatch()
    useEffect(() => {
        const str = "city=深圳&appkey=8824ed10fab8b39a503d4cba987aeb57"
        let params = {}
        str.split('&').map(ele => {
            let arr = ele.split('=')
            params[arr[0]] = arr[1]
        })
        params.city = city
        dispatch(action.getWeatherAction(params))

    }, [city])



    const columns = [
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '天气',
            dataIndex: 'weather',
            key: 'weather',
        },
        {
            title: '气温',
            dataIndex: 'temp',
            key: 'temp',
        },
    ];

    return (
        <div>
            <h1>{city}</h1>
            <input type="text" value={city} onChange={(e) => dispatch(action.changeCityAction(e.target.value))} />
            <div>
                <h1>未来24小时</h1>
                <Table
                    dataSource={weather.hourly}
                    columns={columns}
                    rowKey={(record) => record.time}
                />
            </div>

            <div>
                <h1>未来一周内</h1>
                {
                    weather.daily && weather.daily.map((ele, idx) => (
                        <div key={idx}>
                            <span>{ele.date}</span>
                            <span>----</span>
                            <span>最高温度:{ele.day.temphigh}</span>
                            <span>----</span>
                            <span>最低温度:{ele.night.templow}</span>
                            <span>----</span>
                            <span>{ele.week}</span>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}

{/* <div key={idx}>
<span>{ele.time}</span>
<span>----</span>
<span>{ele.temp}</span>
<span>----</span>
<span>{ele.weather}</span>
<div /> */}