import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput"

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ]
  }

  if (options.username.length > 25 || options.username.length < 4) {
    return [
      {
        field: "username",
        message: "must be between 4 and 25 characters",
      },
    ]
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannot include an @",
      },
    ]
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "length must be greater than 2",
      },
    ]
  }

  return null
}
