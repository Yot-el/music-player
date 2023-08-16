export const getTimeInMinutes = (seconds) => {
  const minutes = Math.floor(parseInt(seconds) / 60)
  const newSeconds = parseInt(seconds) % 60

  if (newSeconds < 10) {
    return `${minutes}:0${newSeconds}`
  }
  return `${minutes}:${newSeconds}`
}

export const getValueFromPercents = (value, percents) => {
  return value * percents
}

export const percentValue = 100

export const throttle = (callback, timeout) => {
  let timer

  return (...rest) => {
    if (timer) return

    timer = setTimeout(() => {
      callback(...rest)
      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}

