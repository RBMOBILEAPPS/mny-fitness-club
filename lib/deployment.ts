export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/mny-fitness-club';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rbmobileapps.github.io/mny-fitness-club').replace(/\/$/, '');
export function assetPath(path: string) {
 return path.startsWith('/') && !path.startsWith('//') && !path.startsWith(`${basePath}/`) ? `${basePath}${path}` : path;
}
