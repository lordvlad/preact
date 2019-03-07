import { enqueueRender } from './component.mjs'

export let i = 0

/**
 *
 * @param {any} defaultValue
 */
export function createContext (defaultValue) {
  const id = '__cC' + i++

  const context = {
    _id: id,
    _defaultValue: defaultValue
  }

  function Consumer (props, context) {
    return props.children(context)
  }
  Consumer.contextType = context
  context.Consumer = Consumer

  const ctx = { [id]: null }

  function initProvider (comp) {
    const subs = []
    comp.getChildContext = () => {
      ctx[id] = comp
      return ctx
    }
    comp.componentDidUpdate = () => {
      const v = comp.props.value
      for (const c of subs) { if (v !== c.context) { c.context = v; enqueueRender(c) } }
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
