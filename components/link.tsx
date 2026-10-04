import type { ComponentProps } from 'react';
import { assetPath } from '../lib/deployment';
// Native links avoid Next 16 dynamic-segment prefetch paths unsupported by
// generic static hosts. Every destination has a pre-rendered HTML document.
export default function SiteLink({href,...props}:ComponentProps<'a'>){return <a {...props} href={href?assetPath(href):href}/>}
