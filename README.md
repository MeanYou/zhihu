# 仿知乎网页版
   
## 1. 状态管理：
1. 使用redux + react redux(hooks) + redux thunk(暂时) 管理全局应用状态；
2. 页面级的状态在页面所属文件夹建立store.ts管理；
3. 轻量简单的组件内部状态在组件内部使用useState管理，重量级的组件仍然使用页面的状态管理方式。

## 2. 关于优化
### 1. useCallback应该何时使用？
无意义的优化是万恶之源，我在这篇文章里看到的[应该何时使用useCallback和useMemo](https://jancat.github.io/post/2019/translation-usememo-and-usecallback/)，我们判断一个函数是否需要缓存，要看它是否对性能造成了影响，一般情况下我们不用考虑太多优化，但是原则上为了避免不必要的重渲染，我们在DOM以及子组件的callback函数中默认使用useCallback(虽然这在简单组件中并没有提升性能，而且会增加代码量)。

## 3. 关于业务代码

### 1. 业务代码应该写在哪里？
这篇文章[业务逻辑代码应该放在哪里？](https://medium.com/@jeffbski/where-do-i-put-my-business-logic-in-a-react-redux-application-9253ef91ce1)讲得很好，这应该是一个困扰很多人的问题。
1. 业务逻辑放在组件中，组件过于臃肿，且不利于逻辑复用；
2. 业务逻辑全部放在action中，利用thunk，优点是保持了reducer的纯净，缺点是action过于臃肿；
3. 业务逻辑全部放在reducer中，优缺点与action类似，保持了action的纯净，导致reducer臃肿；
4. 文章中作者提供了一些更为复杂的解决方案，比如saga等，暂时先不考虑；
5. 个人想到一个方案，将页面级组件的action分为状态action和业务action，这样语义化很好，定义一个action，状态action只需更新一个状态，复杂或异步的action一般只在业务代码中使用，可以使用thunk进行管理，分离了业务，同时保证了action和reducer的纯净，缺点也很明显，这样可能会导致action和reducer同时过于臃肿，一个action本来只需dispatch一次就可以变更多个状态，这样操作需要多次diapatch才能触发一个action；
6. 在第5种方案的基础上，状态action如果有业务需求，可以定义一个一次更新多个状态的action，在没有性能问题的前提下，暂时先使用这种方案，我在/src/hooks中定义了useThunkReducer暂时替代redux-thunk中间件供非redux全局store使用，后期找到更好的方案的话会取而代之。
### 2. 登录信息持久化
1. 登录后用户如果需要长期保存登录状态，把用户相关的脱敏信息长期存放在localStorage或cookie中是一种比较合适的方案，其中localStorage适合前后端分离项目，一般采用类似JWT的认证方式，cookie适合服务端渲染的项目，使用cookie认证；
2. 无需持久化的登录信息同样需要保存在localStorage或cookie中，没有过期信息的cookie会在浏览器关闭之后被清理掉，这点localStorage无法做到，但是一般情况下服务器为了安全考虑，不想让用户用document.cookie获取到，会设置http-only，本项目中我们暂时不考虑这种情况，默认用户可以获取到cookie；
3. sessionStorage的生命周期只有一个标签页，不考虑使用；
4. 综上考虑，cookie可以说是存储用户信息和登录状态的最优解，缺点是每次请求可能会把服务器无关的cookie发送过去，浪费流量并影响请求速度，这种情况下可以考虑使用localStoage存储无需发送到服务器的用户信息。（每个技术的出现都会有自身适用的场景，没有绝对的最优解，只有相对更适用的场景）
5. 在本项目中，Route被简单分为Login和Main，对应着public和private，因此在Login页面登录成功后设置cookie，在Main页面cookie与redux联动保存登录信息供全局使用，这样在未登录的情况下不会让页面渲染Main组件，已登录的情况下刷新页面也不会丢失登录信息（保存在redux中无需每次都读取cookie获取用户信息）