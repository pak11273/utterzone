type Constructor<T = {}> = new (...args: any[]) => T

export const MixinOkay = <TBase extends Constructor>(BaseClass?: TBase) => {
  return class OkayField extends (BaseClass || class {}) {
    okay: string
  }
}
