import {useState,useEffect} from "react"


export default props => {
    let [zb,setzb] =useState("")
    useEffect(()=>{
        var map = new BMapGL.Map("container");
        var point = new BMapGL.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom(true)
        map.setHeading(64.5);   //设置地图旋转角度
        map.setTilt(73)
        map.setMapType(BMAP_EARTH_MAP)
        map.addEventListener('click', function(e) {
            setzb('点击的经纬度：' + e.latlng.lng + ', ' + e.latlng.lat)
        });
       return undefined 
    },[])
    return (
      <div>
        <h1>bmap</h1>
        <div id="container" style={{width:"800px",height:"500px"}}></div>
    <div >{zb}</div>
      </div>
    )
  }