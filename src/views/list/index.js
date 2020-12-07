import loadable from '@loadable/component'
export const ApplyList = loadable(() => import('@/views/list/searchList/applyList')) 
export const ArticleList = loadable(() => import('@/views/list/searchList/articleList')) 
export const CatalogueList = loadable(() => import('@/views/list/searchList/catalogueList'))
export const CardList = loadable(() => import('@/views/list/cardList'))
export const SearchTab = loadable(() => import('@/views/list/searchTab'))
export const StandardList = loadable(() => import('@/views/list/standardList'))

export default {
  ApplyList,
  ArticleList,
  CatalogueList,
  CardList,
  SearchTab,
  StandardList
}