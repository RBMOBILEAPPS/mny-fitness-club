import { siteUrl } from '../lib/deployment';
import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function robots():MetadataRoute.Robots {const origin=siteUrl;return {rules:{userAgent:'*',allow:'/'},sitemap:origin+'/sitemap.xml'}}
