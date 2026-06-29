# Second Sponsor

Role: CTO · AI health-tech · 2025–present
Live on the App Store and Google Play

## Overview
Second Sponsor is an AI-assisted companion for people in 12-step recovery programs —
daily emotional check-ins, a meeting tracker, 12-step progress monitoring, and concise
reflections on triggers, gratitude, and personal insights. It's built on RagRecall, a
HIPAA-compliant platform I architected and lead as CTO, deployed as several branded
healthcare apps (including Hear & Now and RECON-nect) from a shared codebase.

## My role
As CTO I own the technical architecture end to end: the mobile app, the backend, the
AI and voice layers, and the HIPAA compliance posture for handling health data.

## Stack & key decisions
- Mobile: React Native (iOS + Android from one codebase)
- AI layer: OpenAI API configured for Zero Data Retention, so no health data is retained
  by the model provider; retrieval-augmented knowledge base for grounded answers
- Voice: real-time voice agent (ElevenLabs + LiveKit) able to use tools and look things
  up mid-conversation — shipped as the app's "voice conversations" feature
- Database: Supabase · Compute/hosting: Fly.io
- Compliance: HIPAA-compliant data handling with Business Associate Agreements across
  every vendor that touches health data

Notable decision: scoped a proof of concept to validate AI output quality before
committing to heavier infrastructure — prioritizing the user experience and de-risking
the build first.

## Outcomes
- Shipped v1.0 in June 2025; live on both the App Store and Google Play
- Reached a real-time, tool-using voice companion by v1.6 (Mar 2026)
- Platform powers multiple branded instances, including white-labeled apps for partner
  and non-profit organizations

## Links
- Site: https://secondsponsor.ai/
- App Store: https://apps.apple.com/us/app/second-sponsor/id6737695789
- Google Play: https://play.google.com/store/apps/details?id=com.secondsponsor.secondsponsor
