import { siteUrl } from '../../lib/deployment';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InteriorPage } from '../../components/sections';
const titles:Record<string,string>={about:'About the Club',facilities:'Training & Recovery Facilities',classes:'Group Fitness Classes','personal-training':'Personal Training',membership:'Membership',gallery:'Inside M&Y',contact:'Visit the Club',blog:'The M&Y Journal',privacy:'Privacy',terms:'Trial & Enquiry Terms'};
export const dynamicParams = false;
export function generateStaticParams(){return Object.keys(titles).map(slug=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;return {title:titles[slug]||'M&Y',alternates:{canonical:`${siteUrl}/${slug}/`},description:`${titles[slug]} at M&Y Fitness Club in Vaishali Nagar, Jaipur. Explore the club and enquire directly with our team.`}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!titles[slug])notFound();return <InteriorPage slug={slug}/>}
