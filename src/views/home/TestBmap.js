import { useEffect, useState } from 'react'



export default props => {

  let [latlng, setLatlng] = useState({})

  useEffect(()=>{
    console.log('BMapGL', BMapGL)
    var map = new BMapGL.Map("container")
    var point = new BMapGL.Point(116.404, 39.915)
    map.centerAndZoom(point, 14)
    map.addEventListener('click',  mapClick)
    return undefined
  }, [])

  const mapClick = e => {
    console.log('e', e)
    setLatlng(e.latlng)
  }
  return (
    <div>
      <h1>测试地图</h1>

      <div style={{padding: '20px 0'}}>
        <span>经度：{latlng.lat}</span>
        <span>纬度：{latlng.lng}</span>
        <button>提交</button>
      </div>

      <div
        id="container"
        style={{width:'100%', height: '300px', marginTop: '30px'}}
      ></div>
    </div>
  )
}
