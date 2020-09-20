import { UsernamePasswordInput } from "../shared/inputs/UsernamePasswordInput"

export const validateCreateUser = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ]
  }

  // if (options.username.length > 25 || options.username.length < 4) {
  //   return [
  //     {
  //       field: "username",
  //       message: "must be between 4 and 25 characters",
  //     },
  //   ]
  // }

  // if (!/^[a-zA-Z0-9_]+$/.test(options.username)) {
  //   return [
  //     {
  //       field: "username",
  //       message: "must be alphanumeric only",
  //     },
  //   ]
  // }

  // if (options.username.includes("@")) {
  //   return [
  //     {
  //       field: "username",
  //       message: "cannot include an @",
  //     },
  //   ]
  // }

  // if (options.password.length < 8) {
  //   return [
  //     {
  //       field: "password",
  //       message: "requires at least 8 characters",
  //     },
  //   ]
  // }

  // if (
  //   !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_*!.]).{8,}$/.test(
  //     options.password
  //   )
  // ) {
  //   return [
  //     {
  //       field: "password",
  //       message:
  //         "Must include at least 1 capital letter, 1 number and 1 special char",
  //     },
  //   ]
  // }

  return null
}
