import { events } from '../../events'
import { Model, ModelEvent } from '../../types'
import { OAIEngine } from './OAIEngine'

/**
 * Base OAI Remote Inference Provider
 * Added the implementation of loading and unloading model (applicable to local inference providers)
 */
export abstract class RemoteOAIEngine extends OAIEngine {
  // The inference engine
  abstract apiKey: string
  /**
   * On extension load, subscribe to events.
   */
  onLoad() {
    super.onLoad()
  }

  /**
   * Headers for the inference request
   */
  override headers(): HeadersInit {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'api-key': `${this.apiKey}`,
    }
  }
}
