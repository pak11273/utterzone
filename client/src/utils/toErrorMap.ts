export const toErrorMap = (errors: any) => {
  const formatted = errors!.map((x: any) => {
    const obj = <any>{
      name: x.field,
      errors: [x.message],
    }
    return obj
  })
  return formatted
}
