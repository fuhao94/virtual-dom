import createElement from './createElement';
import patchVnode from './patchVnode';
import sameVnode from './sameVnode';

function isUndefined(val) {
  return val === undefined;
}

/**
 * children 比较（最常提到的 diff 算法核心）
 * 命中条件：两个节点 sel 和 key 一样
 * @param parentElm
 * @param oldChildren
 * @param newChildren
 */
export default function updateChildren(parentElm, oldChildren, newChildren) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldChildren.length - 1;
  let newEndIdx = newChildren.length - 1;
  let oldStartVnode = oldChildren[0];
  let oldEndVnode = oldChildren[oldEndIdx];
  let newStartVnode = newChildren[0];
  let newEndVnode = newChildren[newEndIdx];
  let keyMap = null;

  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    console.log('--------- 进入diff ---------');
    // console.log({ newStartIdx, newEndIdx, oldStartIdx, oldEndIdx });
    console.log(newStartVnode.text, newEndVnode.text, oldStartVnode.text, oldEndVnode.text);

    // 忽略我们加过 undefined 节点
    // --------- start ---------
    if (isUndefined(oldChildren[oldStartIdx])) {
      oldStartVnode = oldChildren[++oldStartIdx];
    } else if (isUndefined(oldChildren[oldEndIdx])) {
      oldEndVnode = oldChildren[--oldEndIdx];
    } else if (isUndefined(newChildren[newStartIdx])) {
      newStartVnode = newChildren[++newStartIdx];
    } else if (isUndefined(newChildren[newEndIdx])) {
      newEndVnode = newChildren[--newEndIdx];
    }
    // --------- end ---------
    // 1. 新前 和 旧前
    else if (sameVnode(newStartVnode, oldStartVnode)) {
      console.log('命中1');
      patchVnode(oldStartVnode, newStartVnode);
      // 指针移动
      newStartVnode = newChildren[++newStartIdx];
      oldStartVnode = oldChildren[++oldStartIdx];
    }
    // 2. 新后 和 旧后
    else if (sameVnode(newEndVnode, oldEndVnode)) {
      console.log('命中2');
      patchVnode(oldEndVnode, newEndVnode);
      newEndVnode = newChildren[--newEndIdx];
      oldEndVnode = oldChildren[--oldEndIdx];
    }
    // 3. 新后 和 旧前
    else if (sameVnode(newEndVnode, oldStartVnode)) {
      console.log('命中3');
      patchVnode(oldStartVnode, newEndVnode);
      // 策略3是需要移动节点的 把旧前节点 移动到 旧后 之后
      // insertBefore 如果参照节点为空，就插入到最后 和 appendChild一样
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      // 指针移动
      newEndVnode = newChildren[--newEndIdx];
      oldStartVnode = oldChildren[++oldStartIdx];
    }
    // 4. 新前 和 旧后
    else if (sameVnode(newEndVnode, oldStartVnode)) {
      console.log('命中4');
      patchVnode(oldEndVnode, newStartVnode);
      // 策略4是也需要移动节点的 把旧后节点 移动到 旧前 之前
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      // 指针移动
      newStartVnode = newChildren[++newStartIdx];
      oldEndVnode = oldChildren[--oldEndIdx];
    }
    // diff四种优化策略都没命中
    else {
      console.log('diff四种优化策略都没命中');
      if (!keyMap) {
        // 初始化 keyMap
        keyMap = {};
        // 从 oldStartIdx 到 oldEndIdx 进行遍历
        for (let i = oldStartIdx; i < oldEndIdx; i++) {
          // 拿个每个子对象 的 key
          const { key } = oldChildren[i].data;
          // 如果 key 不为 undefined 添加到缓存中
          if (!key) keyMap[key] = i;
        }

        console.log('缓存:', keyMap);
      }

      // 判断当前项是否存在 keyMap 中 ,当前项时 新前(newStartVnode)
      let idInOld = keyMap[newStartIdx.data] ? keyMap[newStartIdx.data.key] : undefined;

      // 存在的话就是移动操作
      if (idInOld) {
        console.log('移动节点');
        // 从老子节点取出要移动的项
        let moveElm = oldChildren[idInOld];
        patchVnode(moveElm, newStartVnode);
        // 将这一项设置为 undefined
        oldChildren[idInOld] = undefined;
        // 移动节点 ,对于存在的节点使用 insertBefore移动
        // 移动的 旧前 之前 ，因为 旧前 与 旧后 之间的要被删除
        parentElm.insertBefore(moveElm.elm, oldStartVnode.elm);
      } else {
        console.log('添加新节点');
        // 不存在就是要新增的项
        // 添加的节点还是虚拟节点要通过 createElement 进行创建 DOM
        // 同样添加到 旧前 之前
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      }

      // 处理完上面的添加和移动 我们要 newStartIdx 指针继续向下走
      newStartVnode = newChildren[++newStartIdx];
    }
  }

  // 我们添加和删除操作还没做呢
  // 首先来完成添加操作 新前 和 新后 中间是否还存在节点
  console.log({ newStartIdx, newEndIdx, oldStartIdx, oldEndIdx });
  if (newStartIdx <= newEndIdx) {
    console.log('进入添加剩余节点');
    // 这是一个标识
    let beforeFlag = newChildren[newEndIdx + 1] || null;
    // new 里面还有剩余节点 遍历添加
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // newCh里面的子节点还需要 从虚拟DOM 转为 DOM
      parentElm.insertBefore(createElement(newChildren[i]), beforeFlag);
    }
    return;
  }
  if (oldStartIdx <= oldEndIdx) {
    console.log('进入删除多余节点');
    // old 里面还有剩余节点 ,`旧前`和`旧后`之间的节点需要删除
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      // 删除剩余节点之前，先判断下是否存在
      if (oldChildren[i].elm) parentElm.removeChild(oldChildren[i].elm);
    }
  }
}
