/**
 * 创建元素
 * @param {vnode} vnode 待创建节点
 */
export default function createElement(vnode) {
  const node = document.createElement(vnode.sel);

  // 存在子节点 && 子节点是文本
  if(vnode.text !== '' && (!vnode.children || vnode.children.length === 0)) {
    node.textContent = vnode.text;
  }

  // 存在子节点 && 子节点是数组
  if(Array.isArray(vnode.children) && vnode.children.length > 0) {
    const children = vnode.children;
    for (let i = 0; i < children.length; i++) {
      const ch = children[i]
      const chDom = createElement(ch)
      node.appendChild(chDom)
    }
  }

  // 更新vnode 中的 elm
  vnode.elm = node;
  // 返回 DOM
  return node;
}
