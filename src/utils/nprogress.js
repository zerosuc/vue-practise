import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function showFullLoading() {
  NProgress.start()
}

export function hideFullLoading() {
  NProgress.done()
}
