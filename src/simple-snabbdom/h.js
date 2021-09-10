import vnode from './vnode';

/**
 * 创建 虚拟节点
 * @param {string} a sel
 * @param {object} b data
 * @param {any} c 是子节点 可以是文本，数组
 */
export default function h(a, b, c) {
  // 先判断是否有三个参数
  if (arguments.length < 3) {
    throw new Error('fun_h: 参数数量异常');
  }

  // 1. 第三个参数是文本节点
  if (typeof c === 'string' || typeof c === 'number') {
    return vnode(a, b, undefined, c, undefined)
  }

  // 2. 第三个参数是数组 [h(),h()] [h(),text] 这些情况
  if (Array.isArray(c)) {
    let children = [];
    for (let i = 0; i < c.length; i++) {
      if (typeof c[i] === 'object' && c[i].sel) {
        children.push(c[i]);
      } else {
        throw new Error('fun_h: 第三个参数为数组时只能传递 h() 函数')
      }
    }
    return vnode(a, b, children, undefined, undefined);
  }

  // 3. 第三个参数直接就是函数
  if (typeof c === 'object' && c.sel) {
    return vnode(a, b, [c], undefined, undefined);
  }
}
