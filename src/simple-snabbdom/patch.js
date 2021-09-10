import sameVnode from './sameVnode';
import vnode from './vnode';
import createElement from './createElement';
import patchVnode from './patchVnode';

/**
 * 转为 虚拟 DOM
 * @param {DOM} elm DOM节点
 * @returns {vnode}
 */
function genVirtualDom(elm) {
  // 把 sel 和 elm 传入 vnode 并返回
  // 这里主要选择器给转小写返回vnode
  // 这里功能做的简陋，没有去解析 # .
  // data 也可以传 ID 和 class
  return vnode(elm.tagName.toLowerCase(), undefined, undefined, undefined, elm);
}

/**
 * 对比新旧节点
 * @param oldVnode
 * @param newVnode
 */
export default function patch(oldVnode, newVnode) {
  // 1. 判断oldVnode 是否为虚拟 DOM 这里判断是否有 sel
  if (!oldVnode.sel) {
    oldVnode = genVirtualDom(oldVnode);
  }
  // console.log(sameVnode(oldVnode, newVnode));
  if (sameVnode(oldVnode, newVnode)) {
    patchVnode(oldVnode, newVnode);
  } else {
    // 不是同一虚拟个节点 直接暴力拆掉老节点，换上新的节点
    const newNode = createElement(newVnode);

    // 找到父节点进行插入、删除操作
    if (oldVnode.elm.parentNode) {
      const parentNode = oldVnode.elm.parentNode;
      // 添加节点到真实的DOM上
      parentNode.insertBefore(newNode, oldVnode.elm);
      // 删除旧节点
      parentNode.removeChild(oldVnode.elm);
    }
  }

  newVnode.elm = oldVnode.elm;
  // 返回 newVnode 作为 旧的虚拟节点
  return newVnode;
}
