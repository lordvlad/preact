import { enqueueRender } from './component.mjs'

export let i = 0

/**
 *
 * @param {any} defaultValue
 */
export function createContext (defaultValue) {
  const context = {
    _id: '__cC' + i++,
    _defaultValue: defaultValue
  }

  function Consumer (props, context) {
    return props.children(context)
  }
  Consumer.contextType = context
  context.Consumer = Consumer

  const ctx = {}

  function initProvider (comp) {
    const subs = []
    comp.getChildContext = () => {
      ctx[context._id] = comp
      return ctx
    }
    comp.shouldComponentUpdate = props => {
      subs.map(c => {
        // Check if still mounted
        if (c._parentDom) {
          c.context = props.value
          enqueueRender(c)
        }
      })
    }

    comp.sub = (c) => {
      subs.push(c)
      const old = c.componentWillUnmount
      c.componentWillUnmount = () => {
        subs.splice(subs.indexOf(c), 1)
        old && old()
      }
    }
  }

  function Provider (props) {
    if (!this.getChildContext) initProvider(this)
    return props.children
  }
  context.Provider = Provider

  return context
}
