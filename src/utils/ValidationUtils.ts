


export function validateRegex(input, regex) {
    const reg = new RegExp(regex, 'gi')
    if (reg.test(input)) {
      return true
    }
    return false
  }