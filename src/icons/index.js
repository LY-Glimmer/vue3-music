// 1.导入所有的Svg图标
// 2.完成SvgIcon的全局注册
import SvgIcon from '@/components/SvgIcon/index'

const svgRequire = require.context('./svg', false, /\.svg$/)
// 此时返回了一个Require函数，可以接受一个 request 的参数，用于require导入
// 该函数提供了三个属性 可以通过 svgRequire.keys() 获得所有的svg图标
// 遍历图标 把图标作为 request 参数参入到 svgRequire 导入函数中 完成本地Svg图标的导入
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

export default app => {
  app.component('svg-icon', SvgIcon)
}
