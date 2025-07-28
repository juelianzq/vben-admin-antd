export * from './authentication';
export * from './basic';
export * from './iframe';
export * from './widgets';
const BasicLayout = () => import('./basic/index');
const AuthPageLayout = () => import('./authentication/index');

const IFrameView = () => import('./iframe/index');

export { AuthPageLayout, BasicLayout, IFrameView };
