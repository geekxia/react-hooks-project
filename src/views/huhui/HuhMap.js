import React,{ useEffect } from "react"

const HuhMap = (props)=>{
    useEffect(()=>{
        var map = new BMapGL.Map("container");
        // 创建地图实例 
        var point = new BMapGL.Point(116.404, 39.915);
        // 创建点坐标 
        map.centerAndZoom(point, 15);
        return undefined
    },[])

    return (
        <div className="HH-map">
            <h1>Bmap</h1>
            <hr/>
            <div
                id="container"
                style={{width:'100%', height: '300px', marginTop: '30px'}}
            ></div>
        </div>
    )
}

export default HuhMap