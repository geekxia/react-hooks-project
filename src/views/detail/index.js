import loadable from '@loadable/component'
export const BaseDetail = loadable(() => import('@/views/detail/baseDetail.js'))
export const AdvanceDetail = loadable(() => import('@/views/detail/advanceDetail.js'))
export default {
  BaseDetail,
  AdvanceDetail
}
