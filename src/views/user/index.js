import loadable from '@loadable/component'

const Basic = loadable(()=>import('./userbox/Basic'))
const Safe = loadable(()=>import('./userbox/Safe'))


export default [ // eslint-disable-line
    {
    id: 2010,
    text: '基本设置',
    path:'/user/basic',
    component:Basic
    },
    {
    id: 2011,
    text: '安全设置',
    path:'/user/safe',
    component:Safe
    },
]
