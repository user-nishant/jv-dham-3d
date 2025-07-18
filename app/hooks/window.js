import { useEffect, useState } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  function onResize() {
    const regex = /(Mobile|Android|iP(hone|ad|od)|BlackBerry|IEmobile)/gi
    setIsMobile(regex.test(window.navigator.userAgent))
  }

  useEffect(() => {
    if (window) {
      onResize()
      window.addEventListener("resize", onResize)

      return () => {
        window.removeEventListener("resize", onResize)
      }
    }
  }, [])

  return isMobile
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  function onResize() {
    const regex = /(Mobile|Android|iP(hone|ad|od)|BlackBerry|IEmobile)/gi
    const mobileRegexTest = regex.test(window.navigator.userAgent)
    setIsDesktop(window.innerWidth >= 576 && !mobileRegexTest)
  }

  useEffect(() => {
    if (window) {
      onResize()
      window.addEventListener("resize", onResize)
    }

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return isDesktop
}

export function useIs1024() {
  const [is1024, setIs1024] = useState(false)

  function onResize() {
    setIs1024(window.innerWidth === 1024)
  }

  useEffect(() => {
    if (window) {
      onResize()
      window.addEventListener("resize", onResize)
    }

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return is1024
}

export function useIsMobileWidth() {
  const [isMobileWidth, setIsMobileWidth] = useState(false)

  function onResize() {
    setIsMobileWidth(window.innerWidth <= 991)
  }

  useEffect(() => {
    if (window) {
      onResize()
      window.addEventListener("resize", onResize)

      return () => {
        window.removeEventListener("resize", onResize)
      }
    }
  }, [])
  return isMobileWidth
}

export function useIsLandscape() {
  const [isLandscape, setIsLandscape] = useState(false)

  function orientationListener(e) {
    setIsLandscape(e.matches)
  }

  useEffect(() => {
    if (window) {
      const orientationMQL = window.matchMedia("(orientation: landscape)")
      setIsLandscape(orientationMQL.matches)
      orientationMQL.addEventListener("change", orientationListener)

      return () => {
        orientationMQL.removeEventListener("change", orientationListener)
      }
    }
  }, [])

  return isLandscape
}

export function useIsSafari() {
  const [isSafari, setIsSafari] = useState(false)

  function onLoad() {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }

  useEffect(() => {
    if (window) {
      onLoad()
      window.addEventListener("load", onLoad)
    }

    return () => {
      window.removeEventListener("load", onLoad)
    }
  }, [])

  return isSafari
}
