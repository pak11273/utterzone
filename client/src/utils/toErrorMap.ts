export const toErrorMap = (errors: any) => {
  const formatted = errors.map((x: any) => {
    const obj = {
      name: x.field,
      errors: [x.message],
    } as any
    return obj
  })
  return formatted
}
