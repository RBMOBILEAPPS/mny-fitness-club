import type { ComponentProps } from 'react';
// Native links avoid Next 16 dynamic-segment prefetch paths unsupported by
// generic static hosts. Every destination has a pre-rendered HTML document.
export default function SiteLink(props:ComponentProps<'a'>){return <a {...props}/>}
