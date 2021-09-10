/**
 * 把传入的`参数`作为`对象`返回
 * @param sel {string} sel 选择器
 * @param data {object} 数据
 * @param children {array} 子节点
 * @param text {string} 文本
 * @param elm {dom} elm dom
 * @return {{data, children, elm, sel, text}}
 */
export default function vnode(sel, data, children, text, elm) {
  return {sel, data, children, text, elm};
}
