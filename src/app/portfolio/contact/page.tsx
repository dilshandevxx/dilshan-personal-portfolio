'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/content';
import { GithubIcon, LinkedinIcon, MailIcon, RssIcon } from '@/components/Icons';
import { Send, ArrowLeft, Check, Copy } from 'lucide-react';

export default function ContactRoutePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('hello@dilshan.dev');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
        <Link href="/portfolio" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Portfolio Index</span>
        </Link>
        <span>/</span>
        <span className="text-[var(--accent-color)]">Contact</span>
      </div>

      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent-color)] font-medium">
          <Send className="w-4 h-4" />
          <span>Correspondence &amp; Contact</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
          Initiate a Conversation
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] max-w-2xl">
          Whether you want to discuss distributed architectures, consulting, engineering roles, or trade book recommendations, feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Direct Email Card */}
        <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-card)] p-6 space-y-4 card-shadow">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
            Direct Mail
          </p>
          <p className="text-xl font-serif text-[var(--text-primary)]">
            hello@dilshan.dev
          </p>
          <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
            I read every message and respond thoughtfully. Encrypted communication available upon request.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="mailto:hello@dilshan.dev"
              className="px-4 py-2 rounded-md bg-[var(--text-primary)] text-[var(--bg-primary)] font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Send Email
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Public Profiles Card */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 space-y-4 card-shadow">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
            Profiles &amp; Feeds
          </p>
          <div className="space-y-3">
            {siteConfig.socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel={s.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between p-2.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--accent-color)] hover:bg-[var(--bg-tertiary)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  {s.platform === 'GitHub' && <GithubIcon className="w-4 h-4 text-[var(--accent-color)]" />}
                  {s.platform === 'LinkedIn' && <LinkedinIcon className="w-4 h-4 text-[var(--accent-color)]" />}
                  {s.platform === 'Email' && <MailIcon className="w-4 h-4 text-[var(--accent-color)]" />}
                  {s.platform === 'RSS Feed' && <RssIcon className="w-4 h-4 text-[var(--accent-color)]" />}
                  <span className="font-medium">{s.platform}</span>
                </div>
                <span className="text-[var(--text-muted)] group-hover:text-[var(--accent-color)] transition-colors">
                  {s.handle} ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
