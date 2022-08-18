export function validateRegex(input, regex) {
    const reg = new RegExp(regex, 'i')
    if (reg.test(input)) {
      return true
    }
    return false
  }