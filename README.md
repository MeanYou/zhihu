# 仿知乎网页版
## 1. 状态管理：
   
1. 使用redux + react redux(hooks) + redux thunk(暂时) 管理全局应用状态；
2. 页面级的状态在页面所属文件夹建立store.ts管理；
3. 轻量简单的组件内部状态在组件内部使用useState管理，重量级的组件仍然使用页面的状态管理方式。
## 2. 关于优化
   ### 1. useCallback是否应该在每个回调中显示？
