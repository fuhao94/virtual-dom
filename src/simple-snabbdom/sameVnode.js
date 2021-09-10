/**
 * 判断两个虚拟节点是否是同一节点
 * @param {vnode} vnode1 虚拟节点1
 * @param {vnode} vnode2 虚拟节点2
 * @return {boolean}
 */
export default function sameVnode(vnode1, vnode2) {
  return vnode1.data?.key === vnode2.data?.key && vnode1.sel === vnode2.sel;
}
