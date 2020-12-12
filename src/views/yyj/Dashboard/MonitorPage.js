import { useEffect, useState } from 'react'


export default props => {
    // let [latlng, setLatlng] = useState({})
    let [site, setsite] = useState('娱乐')
    useEffect(() => {
        // var map = new BMapGL.Map("container")
        // var point = new BMapGL.Point(116.404, 39.915)
        // map.centerAndZoom(point, 14)
        // map.addEventListener('click', mapClick)
        var map = new BMap.Map("container");       // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        var local = new BMap.LocalSearch(map, {
            renderOptions: { map: map, panel: "r-result" }
        });
        local.search(site);
        return undefined
    }, [site])


    // const mapClick = e => {
    //     console.log('e', e)
    //     setLatlng(e.latlng)
    // }
    const search = e => {
        if (e.keyCode === 13) {
            setsite(e.target.value)
        }
    }


    return (
        <div>
            <span>查找：</span>
            <input
                type="text"
                onKeyUp={e => search(e)}
                placeholder={site}
            />
            {/* <div style={{ padding: '20px 0' }}>
                <span>经度：{latlng.lat}</span>
                <span>纬度：{latlng.lng}</span>
                <button>提交</button>
            </div> */}

            <div
                id="container"
                style={{ width: '100%', height: '85%', marginTop: '30px' }}
            >
            </div>
            <div
                id="r-result"
                style={{ width: '100%' }}
            ></div>
        </div>
    )
}