import createElement from './createElement';
import updateChildren from './updateChildren';

/**
 * 进行节点对比的更新
 * @param oldVnode 老节点
 * @param newVnode 新节点
 */
export default function patchVnode(oldVnode, newVnode) {
  // 1. 判断是否同一个节点
  if (oldVnode === newVnode) {
    return;
  }

  // 2. 判断新节点上有没有text
  if (newVnode.text && !newVnode.children) {
    // 判断是text否相同
    if (oldVnode.text !== newVnode.text) {
      oldVnode.elm.textContent = newVnode.text;
    }
  } else {
    if (oldVnode.children) {
      // 新旧节点都有 children
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
      return;
    }
    // 旧节点没有 children, 新节点有children
    // 先清空旧节点中 text
    oldVnode.elm.innerHTML = '';
    // 遍历新节点中的 children
    const newChildren = newVnode.children;
    for (let i = 0; i < newChildren.length; i++) {
      // 通过递归拿到了 新节点的子节点
      let node = createElement(newChildren[i]);
      // 添加到 oldVnode.elm 中
      oldVnode.elm.appendChild(node);
    }
  }
}
