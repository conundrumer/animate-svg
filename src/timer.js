export default function timer (cb, getOptions) {
  let prevTime = window.performance.now()
  let raf
  (function step () {
    let {fps = 25, skipFrames = true} = getOptions()
    raf = window.requestAnimationFrame(step)
    if (fps === 0) {
      return
    }
    let dt = window.performance.now() - prevTime
    let framesElapsed = Math.floor(dt / 1000 * fps)
    if (framesElapsed > 0) {
      prevTime += framesElapsed / fps * 1000
      let di = skipFrames ? framesElapsed : 1
      cb(di)
    }
  })() // immediately invoke step()
  return {
    stop: () => window.cancelAnimationFrame(raf)
  }
}
