import { useEffect, useState } from 'react'

export default props => {

    let [latlng, setLatlng] = useState({})

    useEffect(()=>{
        console.log('BMapGL', BMapGL);
        var map = new BMapGL.Map("container");
        var point = new BMapGL.Point(116.404, 39.915);
        map.centerAndZoom(point, 15); 
        map.addEventListener('click', mapClick)
        return undefined
    },[])
    
    const mapClick = e => {
        console.log('e',e);
        setLatlng(e.latlng)
    }
    
    return (
        <div>
            <h1>测试地图</h1>

            <div>
                <span>经度: {latlng.lat}</span>
                <span>纬度: {latlng.lng}</span>
            </div>
            
            <div id="container" style={{height: '90%', width: '100%'}}></div> 
        </div>
    )
}