import React from 'react';
import { Link } from 'react-router-dom';
import { linkClass } from './LoginPage';

export const PRIVACY_CONTACT_EMAIL = 'info@phrasalbox.com';
export const PRIVACY_UPDATED = '31 October 2026';

const headingClass = 'text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2';
const listClass = 'list-disc pl-6 space-y-1';

export default function PrivacyPage() {
  return (
    <main id="main-content" data-testid="privacy-page" className="max-w-2xl mx-auto pt-16 px-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Last updated {PRIVACY_UPDATED}</p>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <p>
          Phrasal (phrasalbox.com) is a free site for practising English phrasal verbs and grammar. You can use the
          quizzes and lists without an account. This page explains what is stored if you create one.
        </p>

        <h2 className={headingClass}>What we store</h2>
        <ul className={listClass}>
          <li>Your email address, and whether you have confirmed it.</li>
          <li>A salted hash of your password. We never store the password itself. Accounts created with Google have none.</li>
          <li>If you sign in with Google: your Google account identifier and email address. We ask Google only for
            <code> openid</code>, <code>email</code> and <code>profile</code> and do not keep your name, picture or any other Google data.</li>
          <li>If you turn on two-factor authentication: the authenticator secret (encrypted) and hashed recovery codes.</li>
          <li>Your quiz progress (mastered and excluded verbs) while you are logged in, so it follows you between devices.</li>
          <li>One-time links for email confirmation and password reset, which expire and are deleted after a few days.</li>
        </ul>
        <p>Accounts that never confirm their email are deleted automatically after 7 days.</p>

        <h2 className={headingClass}>Why</h2>
        <p>
          Only to run your account: to log you in, keep you signed in, send the emails you ask for and save your
          progress. We do not sell your data, show ads or use it for profiling.
        </p>

        <h2 className={headingClass}>Cookies and browser storage</h2>
        <ul className={listClass}>
          <li><code>SESSION</code>: keeps you logged in (up to 7 days).</li>
          <li><code>XSRF-TOKEN</code>: protects forms against forged requests.</li>
          <li>Local storage in your browser: theme choice and quiz progress for visitors who are not logged in.</li>
        </ul>
        <p>These are needed for the site to work. There are no analytics or advertising cookies.</p>

        <h2 className={headingClass}>Who else handles data</h2>
        <ul className={listClass}>
          <li>Google: sign-in with Google, only if you choose it.</li>
          <li>Brevo: delivers our emails (confirmation, password reset). It receives your address and the message.</li>
          <li>Have I Been Pwned: when you pick a password, the first 5 characters of its SHA-1 hash are checked against
            known breaches. The password never leaves our server.</li>
          <li>Hetzner (hosting) and Cloudflare (network): the site runs on Hetzner servers behind Cloudflare, which
            sees normal web traffic details such as IP addresses.</li>
        </ul>

        <h2 className={headingClass}>Deleting your data</h2>
        <p>
          You can delete your account yourself on the <Link to="/account/security" className={linkClass}>Account security</Link> page
          (an account created with Google first sets a password there), or ask us by email. Deleting removes your email, password hash, Google identifier, two-factor data, progress and sessions. Backups
          that contain it are replaced on a regular schedule.
        </p>

        <h2 className={headingClass}>Your rights and contact</h2>
        <p>
          You can ask us to show, correct or delete your data at any time. Write to{' '}
          <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`} className={linkClass}>{PRIVACY_CONTACT_EMAIL}</a>.
        </p>

        <h2 className={headingClass}>Changes</h2>
        <p>We will update this page and its date if this policy changes.</p>
      </div>
    </main>
  );
}
