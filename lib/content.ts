import { assetPath } from './deployment';
export const club = {
 name: 'M&Y Fitness Club', phone: '+919660223315', displayPhone: '+91 96602 23315',
 email: 'team@mnyfitnessclub.com', address: '2nd Floor, Vaishali Nagar, Near Gurudwara, Jaipur',
 maps: 'https://maps.app.goo.gl/XxFCay2uvrs7p42C8',
 booking: 'https://www.mnyfitnessclub.com/winter-gym-offer-jaipur',
 instagram: 'https://www.instagram.com/mnyfitnessclub/', facebook: 'https://www.facebook.com/mnyfitnessclub/',
 // CLIENT DATA REQUIRED: existing site does not identify a verified WhatsApp number.
 whatsapp: null as string | null,
 // Source-reported Google rating; count and individual review texts are unverified.
 rating: '4.8', space: '14,000', hours: '24/7',
};
export const nav = [['Home','/'],['About','/about/'],['Facilities','/facilities/'],['Classes','/classes/'],['Personal Training','/personal-training/'],['Membership','/membership/'],['Gallery','/gallery/'],['Contact','/contact/']] as const;
export const images = {
 logo: assetPath('/assets/logo.webp'), hero: assetPath('/assets/hero.webp'), floor: assetPath('/assets/floor.webp'), equipment: assetPath('/assets/equipment.webp'),
 coaching: assetPath('/assets/coaching.webp'), training: assetPath('/assets/training.webp'), yoga: assetPath('/assets/yoga.webp'), club: assetPath('/assets/club.webp'),
};
export const facilities = [
 { name:'Strength training', tag:'BUILD YOUR FOUNDATION', text:'Free weights, professional-grade racks and room to focus on your next rep.', image:images.equipment, alt:'Training equipment pictured on the M&Y website', href:'/facilities/#strength' },
 { name:'Cardio theatre', tag:'FIND YOUR RHYTHM', text:'A dedicated space to build endurance and keep moving.', image:images.floor, alt:'Fitness floor pictured on the M&Y website', href:'/facilities/#cardio' },
 { name:'Functional training', tag:'MOVE WITH PURPOSE', text:'Turf, agility work and CrossFit training for a different kind of challenge.', image:images.training, alt:'A member training in the M&Y website video poster', href:'/facilities/#functional' },
];
export const classes = [
 {name:'Zumba',label:'ENERGY. MUSIC. MOVEMENT.',text:'Bring your energy. Find your rhythm. Make fitness part of your week.'},
 {name:'Power Yoga',label:'STRENGTH MEETS STILLNESS.',text:'Take time for movement, balance and a more mindful training experience.'},
 {name:'HIIT',label:'TURN UP THE INTENSITY.',text:'A high-energy way to challenge yourself alongside the club community.'},
 {name:'CrossFit',label:'A NEW CHALLENGE AWAITS.',text:'Explore functional movement and varied training at the club.'},
];
// CLIENT DATA REQUIRED: consented transformation images/results, trainer names,
// qualifications and portraits, current membership rates, review texts/count.
export const clientPlaceholders: {
 transformations: import('../components/client-content').Transformation[];
 trainers: import('../components/client-content').Trainer[];
 reviews: import('../components/client-content').Review[];
 membershipPrices: null;
} = { transformations: [], trainers: [], reviews: [], membershipPrices: null };
export const articles = [
 {title:'Find your gym. Find your people.',category:'THE CLUB EXPERIENCE',href:'https://www.mnyfitnessclub.com/blog',image:images.floor},
 {title:'What to look for in a personal trainer.',category:'TRAINING INSIGHTS',href:'https://www.mnyfitnessclub.com/post/how-to-choose-personal-trainer-jaipur',image:images.coaching},
 {title:'A closer look at the M&Y experience.',category:'M&Y LIFESTYLE',href:'https://www.mnyfitnessclub.com/post/why-mandy-is-best-gym-vaishali-nagar',image:images.equipment},
];
