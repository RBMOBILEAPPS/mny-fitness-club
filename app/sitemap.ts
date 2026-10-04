import { siteUrl } from '../lib/deployment';
import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function sitemap():MetadataRoute.Sitemap {const origin=siteUrl;return ['','about','facilities','classes','personal-training','membership','gallery','contact','blog'].map(p=>({url:`${origin}/${p}${p?'/':''}`,changeFrequency:'monthly' as const,priority:p?0.7:1}))}
