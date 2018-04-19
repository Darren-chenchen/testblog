/**
 * Created by tianyang on 2017/12/5.
 */
/**
 * 设置屏幕宽度
 * @param document
 * @param window
 * @param width
 */
export function resetWidow(document, window, width) {
  let scale = window.screen.width / width
  let viewPort = '<meta name = "viewport" content = "'
  viewPort += 'target-densitydpi = device-dpi, width = ' + width + ', initial-scale = ' + scale
  viewPort += ',minimum-scale = ' + scale + ', maximum-scale = ' + scale + ', user-scalable = no'
  document.write(viewPort + '">')
}


/**
 * 若为整数保留整数，否则
 */
export function fixOne(num) {
  if (num % 1 === 0) {
    return num.toFixed(0)
  } else {
    return num.toFixed(1)
  }
}
