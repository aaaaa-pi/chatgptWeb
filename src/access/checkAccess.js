/**
 * 检查权限 （判断当前登录用户是否具有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */

const checkAccess = (loginUser, needAccess = 'notLogin') => {
  // 获取当前登录用户具有的权限（如果没有loginUser，则表示未登录）
  const loginUserAccess = loginUser?.userRole ?? 'notLogin'
  if (needAccess === 'notLogin') {
    return true
  }
  // 如果用户登录才能访问
  if (needAccess === 'user') {
    // 如果用户没登陆，那么表示无权限
    if (loginUserAccess === 'notLogin') {
      return false
    }
  }
  // 如果需要管理员权限
  if (needAccess === 'admin') {
    // 如果不为管理员，表示无权限
    if (loginUserAccess !== 'admin') {
      return false
    }
  }
  return true
}

export default checkAccess
