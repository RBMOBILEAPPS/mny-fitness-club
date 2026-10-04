'use client';
import type { ImageLoaderProps } from 'next/image';
// Variants are generated locally; no external image service or runtime is required.
export default function imageLoader({src,width}:ImageLoaderProps){return src.replace('.webp',`-${width}.webp`)}
