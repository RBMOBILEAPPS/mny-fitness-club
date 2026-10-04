import Image from 'next/image';
import { assetPath } from '../lib/deployment';
export type Trainer = {name:string,specialty:string,qualification?:string,image:string};
export type Transformation = {name:string,caption:string,before:string,after:string};
export type Review = {name:string,rating:number,quote:string,sourceUrl:string};
// Supply ONLY verified, client-approved records. These components have no demo claims.
export function TrainerCard({trainer:t}:{trainer:Trainer}){return <article className="client-card"><Image src={assetPath(t.image)} alt={`${t.name}, M&Y coach`} width={400} height={500} unoptimized/><h3>{t.name}</h3><p>{t.specialty}</p>{t.qualification&&<p>{t.qualification}</p>}</article>}
export function TransformationCard({result:r}:{result:Transformation}){return <article className="client-card"><div className="transformation-pair"><Image src={assetPath(r.before)} alt={`${r.name}, before`} width={300} height={400} unoptimized/><Image src={assetPath(r.after)} alt={`${r.name}, after`} width={300} height={400} unoptimized/></div><h3>{r.name}</h3><p>{r.caption}</p></article>}
export function ReviewCard({review:r}:{review:Review}){return <blockquote className="client-card"><span aria-label={`${r.rating} out of 5 stars`}>{r.rating}/5</span><p>{r.quote}</p><cite>{r.name}</cite><a href={r.sourceUrl} target="_blank" rel="noopener noreferrer">Read original review</a></blockquote>}