// Note: Using any for node type to avoid import issues with ComfyUI types

export interface CameraState {
  azimuth: number
  elevation: number
  distance: number
  imageUrl: string | null
}

export interface CameraWidgetOptions {
  node: QwenMultiangleNode
  container: HTMLElement
  initialState?: Partial<CameraState>
  onStateChange?: (state: CameraState) => void
  mode?: 'camera' | 'facing'
}

export interface QwenMultiangleNode {
  id: number
  widgets?: Array<{
    name: string
    value: unknown
    callback?: (value: unknown) => void
  }>
  constructor?: {
    comfyClass?: string
  }
  size?: [number, number]
  addDOMWidget?: (name: string, type: string, element: HTMLElement, options: DOMWidgetOptions) => DOMWidget
  onConnectionsChange?: (slotType: number, slotIndex: number, isConnected: boolean, link: unknown, ioSlot: unknown) => void
}

export interface DOMWidgetOptions {
  getMinHeight?: () => number
  hideOnZoom?: boolean
  serialize?: boolean
}

export interface DOMWidget {
  name: string
  type: string
  element: HTMLElement
  options: DOMWidgetOptions
  onRemove?: () => void
  serializeValue?: () => Promise<string> | string
}
