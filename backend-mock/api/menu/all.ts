import { verifyAccessToken } from '~/utils/jwt-utils';
import { MOCK_MENUS } from '~/utils/mock-data';
import { unAuthorizedResponse } from '~/utils/response';

export default eventHandler(async (event) => {
  console.log('🔍 Menu API called');

  const userinfo = verifyAccessToken(event);
  console.log('👤 User info:', userinfo);

  if (!userinfo) {
    console.log('❌ No user info, returning unauthorized');
    return unAuthorizedResponse(event);
  }

  console.log('📋 Available mock menus:', MOCK_MENUS.map(m => m.username));

  const menus =
    MOCK_MENUS.find((item) => item.username === userinfo.username)?.menus ?? [];

  console.log('🎯 Found menus for user:', userinfo.username, menus);

  return useResponseSuccess(menus);
});
