// 推荐
import { get } from './base'
// 获取轮播图数据
export function getRecommend() {
  return get('/api/getRecommend')
}
// 获取唱片
export function getAlbum(album) {
  return get('/api/getAlbum', {
    id: album.id
  })
}
