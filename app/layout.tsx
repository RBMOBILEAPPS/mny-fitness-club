import type { Metadata, Viewport } from 'next';
import { siteUrl, assetPath } from '../lib/deployment';
import { club } from '../lib/content';
import { SiteShell } from '../components/site';
import './globals.css';
const origin = siteUrl;
export const metadata: Metadata = {
 metadataBase: new URL(origin), title: { default:'M&Y Fitness Club | Premium 24/7 Gym in Vaishali Nagar, Jaipur', template:'%s | M&Y Fitness Club Jaipur' },
 description:'Train your way at M&Y Fitness Club, Vaishali Nagar, Jaipur. Explore strength training, personal coaching, group classes and the Wet Lounge. Request a free day pass.',
 alternates:{canonical:origin+'/'}, openGraph:{type:'website',siteName:club.name,locale:'en_IN',images:[{url:origin+'/assets/floor.webp',width:1600,height:900,alt:'M&Y Fitness Club'}]},
 twitter:{card:'summary_large_image'}, robots:{index:true,follow:true}, icons:{icon:assetPath('/icon.svg')},
};
export const viewport: Viewport = {themeColor:'#111210'};
export default function RootLayout({children}:{children:React.ReactNode}) {
 const schema={ '@context':'https://schema.org','@type':'HealthClub',name:club.name,url:origin,telephone:club.phone,email:club.email,image:origin+'/assets/floor.webp',address:{'@type':'PostalAddress',streetAddress:'2nd Floor, Near Gurudwara, Vaishali Nagar',addressLocality:'Jaipur',addressRegion:'Rajasthan',addressCountry:'IN'},openingHours:'Mo-Su 00:00-23:59',hasMap:club.maps,sameAs:[club.instagram,club.facebook]};
 return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><SiteShell>{children}</SiteShell></body></html>;
}
