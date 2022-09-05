export const doIfMobile = (lambda) => {
  if (isMobile()) {
    return lambda()
  }
}

export const isMobile = () => (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
)
