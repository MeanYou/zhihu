# 仿知乎网页版
## 1. 状态管理：
   
1. 使用redux + react redux(hooks) + redux thunk(暂时) 管理全局应用状态；
2. 页面级的状态在页面所属文件夹建立store.ts管理；
3. 轻量简单的组件内部状态在组件内部使用useState管理，重量级的组件仍然使用页面的状态管理方式。
## 2. 关于优化
   
### 1. useCallback应该何时使用？
   
无意义的优化是万恶之源，我在这篇文章里看到的[应该何时使用useCallback和useMemo](https://jancat.github.io/post/2019/translation-usememo-and-usecallback/)，我们判断一个函数是否需要缓存，要看它是否对性能造成了影响，一般情况下我们不用考虑太多优化，但是原则上为了避免不必要的重渲染，我们在DOM的callback中默认使用useCallback(虽然这在简单组件中并没有提升性能，而且会增加代码量)。