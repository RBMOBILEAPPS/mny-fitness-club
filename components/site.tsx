'use client';

import Link from './link';

import Image from 'next/image';

import { usePathname } from 'next/navigation';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { ArrowUpRight, ArrowRight, Menu, X, Phone, MapPin, MessageCircle, Instagram, Check, LoaderCircle } from 'lucide-react';

import { club, images, nav } from '../lib/content';

import { track, type EventName } from '../lib/analytics';

const TrialContext=createContext<(source?:string)=>void>(()=>{});

export function TrialButton({children='Book free trial',className='',source='trial'}:{children?:React.ReactNode,className?:string,source?:string}){const open=useContext(TrialContext);return <button className={`button ${className}`} onClick={()=>open(source)}>{children}<ArrowUpRight size={18}/></button>}

export function TrackedLink({href,event,source,children,className='',external=false}:{href:string,event:EventName,source:string,children:React.ReactNode,className?:string,external?:boolean}){return <a href={href} className={className} onClick={()=>track(event,source)} {...(external?{target:'_blank',rel:'noopener noreferrer'}:{})}>{children}</a>}

function Whatsapp({className='',children}:{className?:string,children?:React.ReactNode}) {

 const [show,setShow]=useState(false);const dialogRef=useRef<HTMLDialogElement>(null);

 useEffect(()=>{if(show)dialogRef.current?.showModal()},[show]);

 if(club.whatsapp)return <TrackedLink href={`https://wa.me/${club.whatsapp}?text=${encodeURIComponent("Hi M&Y Fitness Club, I'm interested in membership and would like to visit the club.")}`} event="whatsapp_click" source="whatsapp" className={className} external>{children||<MessageCircle/>}</TrackedLink>;

 return <><button className={className} aria-label="WhatsApp contact options" onClick={()=>setShow(true)}>{children||<MessageCircle/>}</button>{show&&<dialog ref={dialogRef} className="contact-popover" aria-label="Contact options" onCancel={()=>setShow(false)}><button className="icon-button close" aria-label="Close contact options" onClick={()=>setShow(false)}><X/></button><MessageCircle className="accent"/><h3>Let’s talk fitness.</h3><p>The club’s WhatsApp contact is awaiting confirmation. Reach the team directly by phone or email.</p><TrackedLink href={`tel:${club.phone}`} event="call_click" source="whatsapp-fallback" className="button">Call the club <Phone size={16}/></TrackedLink><a href={`mailto:${club.email}`} className="text-link">Email the team <ArrowUpRight size={16}/></a></dialog>}</>;

}

export function SiteShell({children}:{children:React.ReactNode}){

 const [menu,setMenu]=useState(false),[scrolled,setScrolled]=useState(false),[trial,setTrial]=useState<string|null>(null);const pathname=usePathname();const mobileRef=useRef<HTMLDialogElement>(null);

 useEffect(()=>{const scroll=()=>setScrolled(window.scrollY>40);scroll();window.addEventListener('scroll',scroll,{passive:true});return()=>window.removeEventListener('scroll',scroll)},[]);

 useEffect(()=>{setMenu(false)},[pathname]);

 useEffect(()=>{if(menu)mobileRef.current?.showModal();else mobileRef.current?.close()},[menu]);

 const open=(source='trial')=>{track(source==='pt'?'personal_training_click':'free_trial_click',source);setTrial(source)};

 return <TrialContext.Provider value={open}><a href="#main" className="skip-link">Skip to content</a><header className={`navbar ${scrolled||pathname!=='/'?'solid':''}`}><Link href="/" className="brand" aria-label="M&Y Fitness Club home"><Image src={images.logo} width={213} height={61} alt="M&Y Fitness Club" priority/></Link><nav aria-label="Main navigation" className="desktop-nav">{nav.map(([label,href])=><Link key={href} href={href} aria-current={pathname===href||pathname+'/'===href?'page':undefined}>{label}</Link>)}</nav><div className="nav-actions"><div className="nav-whatsapp"><Whatsapp className="icon-button"><MessageCircle size={18}/></Whatsapp></div><TrialButton className="small" source="navigation">Book free trial</TrialButton><button className="icon-button hamburger" aria-label="Open navigation" aria-expanded={menu} onClick={()=>setMenu(true)}><Menu/></button></div></header>

 <dialog className="mobile-menu" aria-label="Mobile navigation" ref={mobileRef} onCancel={()=>setMenu(false)}><div className="mobile-menu-top"><span className="eyebrow">M&Y FITNESS CLUB</span><button className="icon-button" aria-label="Close navigation" onClick={()=>setMenu(false)}><X/></button></div><nav aria-label="Mobile navigation">{nav.map(([label,href],i)=><Link key={href} href={href} onClick={()=>setMenu(false)}><small>0{i+1}</small>{label}<ArrowUpRight/></Link>)}</nav><TrialButton source="mobile-menu">Book your free trial</TrialButton></dialog>

 <main id="main">{children}</main><Footer/>

 <Whatsapp className="whatsapp-float"/>

 <div className="mobile-bar"><TrackedLink href={`tel:${club.phone}`} event="call_click" source="mobile-bar"><Phone size={18}/>Call</TrackedLink><Whatsapp><MessageCircle size={18}/>WhatsApp</Whatsapp><button onClick={()=>open('mobile-bar')}><ArrowUpRight size={18}/>Free trial</button></div>

 {trial&&<TrialModal source={trial} close={()=>setTrial(null)}/>}</TrialContext.Provider>;

}

function TrialModal({source,close}:{source:string,close:()=>void}){

 const ref=useRef<HTMLDialogElement>(null),lock=useRef(false);const [status,setStatus]=useState<'idle'|'loading'|'success'|'error'>('idle'),[error,setError]=useState(''),[draft,setDraft]=useState('');

 useEffect(()=>{ref.current?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old}},[]);

 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(lock.current)return;const form=new FormData(e.currentTarget);if(form.get('website'))return;const name=String(form.get('name')||'').trim();let phone=String(form.get('phone')||'').replace(/\D/g,'');if(phone.startsWith('91')&&phone.length===12)phone=phone.slice(2);if(!/^[6-9]\d{9}$/.test(phone)){setError('Enter a valid 10-digit Indian mobile number.');setStatus('error');return}if(name.length<2){setError('Please enter your name (at least 2 characters).');setStatus('error');return}lock.current=true;setStatus('loading');const payload={name,phone:'+91'+phone,goal:String(form.get('goal')),visitTime:String(form.get('time')||''),source};const endpoint=process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

 try{if(endpoint){const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(12000)});if(!res.ok)throw new Error('Could not send your enquiry. Please try again or call the club.');track('free_trial_submit',source)}else{setDraft(`Hi M&Y Fitness Club,\n\nI would like to ${source==='pt'?'enquire about personal training':'request a free day pass'}.\nName: ${name}\nPhone: +91${phone}\nFitness goal: ${payload.goal}\nPreferred visit time: ${payload.visitTime||'Flexible'}\n\nPlease confirm availability.`)}setStatus('success')}catch(err){setError(err instanceof Error?err.message:'Please try again.');setStatus('error')}finally{lock.current=false}}

 const configured=!!process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

 return <dialog ref={ref} aria-label="Request a club visit" className="trial-dialog" onCancel={close} onClick={e=>{if(e.target===e.currentTarget)close()}}><div className="trial-content"><button className="icon-button close" onClick={close} aria-label="Close enquiry form"><X/></button>{status==='success'?<div className="form-success"><Check size={40} className="accent"/><span className="eyebrow">YOUR NEXT CHAPTER</span><h2>{configured?'Enquiry received.':'Your enquiry is ready.'}</h2><p>{configured?'The club will contact you to arrange your visit.':'Send your prepared email, or complete your booking on the club’s existing form. Your details have not been sent yet.'}</p>{!configured&&<><a className="button" href={`mailto:${club.email}?subject=${encodeURIComponent('M&Y '+(source==='pt'?'PT consultation':'free day pass')+' enquiry')}&body=${encodeURIComponent(draft)}`} onClick={()=>track('free_trial_submit','email-draft-opened')}>Open email draft <ArrowUpRight size={18}/></a><a href={club.booking} target="_blank" rel="noopener noreferrer" className="text-link">Continue on the club booking page <ArrowUpRight size={16}/></a></>}<button className="text-link" onClick={close}>Back to the club</button></div>:<><span className="eyebrow">TAKE THE FIRST STEP</span><h2>{source==='pt'?'Your goals. Your coach.':'Try the club. Feel the difference.'}</h2><p>{source==='pt'?'Tell us what you want to work towards.':'Request your free day pass to M&Y Fitness Club.'} The team will confirm availability.</p><form onSubmit={submit}><label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Full name"/></label><label>Phone number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={18} placeholder="+91  ••••• •••••" aria-describedby={status==='error'?'form-error':undefined}/></label><label>Your fitness goal<select name="goal" required defaultValue=""><option value="" disabled>Select your goal</option><option>Build strength</option><option>Improve fitness</option><option>Weight management</option><option>Personal training</option><option>Explore the club</option></select></label><label>Preferred visit time <span>(optional)</span><select name="time" defaultValue=""><option value="">I’m flexible</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label><div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>{status==='error'&&<p id="form-error" role="alert" className="error">{error}</p>}<button type="submit" className="button wide" disabled={status==='loading'}>{status==='loading'?<><LoaderCircle className="spin" size={18}/>Preparing enquiry…</>:<> {configured?'Send enquiry':'Prepare my enquiry'}<ArrowUpRight size={18}/></>}</button><p className="form-note">{configured?'By submitting, you agree to be contacted about this enquiry.':'This prepares an email draft. You choose when to send it.'} <Link href="/privacy/">Privacy information</Link></p></form></>}</div></dialog>;

}

export function ContactActions(){return <div className="actions"><TrackedLink href={club.maps} event="directions_click" source="contact" external className="button">Get directions <ArrowUpRight size={18}/></TrackedLink><TrackedLink href={`tel:${club.phone}`} event="call_click" source="contact" className="button secondary">Call the club <Phone size={16}/></TrackedLink><Whatsapp className="text-link">WhatsApp enquiry <MessageCircle size={16}/></Whatsapp></div>}

function Footer(){return <footer className="footer"><div className="container footer-grid"><div><Link href="/" className="brand"><Image src={images.logo} width={213} height={61} alt="M&Y Fitness Club"/></Link><p>A space to train. A reason to return.<br/>Your fitness club in Vaishali Nagar, Jaipur.</p><div className="socials"><a href={club.instagram} target="_blank" rel="noopener noreferrer" aria-label="M&Y on Instagram"><Instagram size={20}/></a><a href={club.facebook} target="_blank" rel="noopener noreferrer" aria-label="M&Y on Facebook">f</a></div></div><div><span className="eyebrow">EXPLORE</span>{nav.slice(1,5).map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</div><div><span className="eyebrow">YOUR CLUB</span><Link href="/membership/">Membership</Link><Link href="/gallery/">Gallery</Link><Link href="/blog/">The M&Y Journal</Link><Link href="/contact/">Contact</Link></div><div><span className="eyebrow">COME FIND US</span><p>{club.address}</p><TrackedLink href={`tel:${club.phone}`} event="call_click" source="footer">{club.displayPhone}</TrackedLink><a href={`mailto:${club.email}`}>{club.email}</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} M&Y Fitness Club</span><span>BUILT FOR A STRONGER YOU.</span><div><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link></div></div></footer>}
