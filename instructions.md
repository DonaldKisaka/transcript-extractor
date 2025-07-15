**Product Requirements Document (PRD)**

**Project Title:**
TranscriptPro - Bulk Transcript Extractor for Video Conferencing Platforms

**Prepared by:** Donald Kisaka

**Date:** June 17, 2025

---

## 1. **Executive Summary**

TranscriptPro is a web application that allows users to upload video conferencing recordings from platforms such as Zoom, Google Meet, and Microsoft Teams. It extracts and manages transcripts from these recordings in bulk, offering users a searchable dashboard and download options in multiple formats.

---

## 2. **Goals & Objectives**

* Extract transcripts from recordings in bulk.
* Support platform-specific extraction (Zoom, Teams, Meet).
* Provide a clean, responsive UI with drag-and-drop file upload.
* Allow transcript search and filtering.
* Offer downloadable transcripts in TXT, SRT, and JSON formats.
* Secure user data with authentication.
* Host the app on Vercel using Supabase as the backend.

---

## 3. **Tech Stack**

* **Frontend:** Next.js, Tailwind CSS
* **Backend:** Supabase (Auth, Database, Storage)
* **Deployment:** Vercel

---

## 4. **User Stories**

### 4.1 As a new user:

* I want to sign up and log in so that I can use the application.

### 4.2 As a logged-in user:

* I want to upload video files via drag-and-drop.
* I want to select the platform for each upload (Zoom, Meet, Teams).
* I want to process multiple files at once and see progress.
* I want to view and search transcripts in a dashboard.
* I want to download transcripts in different formats.
* I want my data to be securely saved and accessible only to me.

---

## 5. **Feature Breakdown**

### 5.1 Authentication

* Sign up/Login with Supabase Auth (email/password or OAuth)
* Session persistence
* User data isolation

### 5.2 File Upload

* Drag-and-drop or file picker
* Upload progress indicator
* Save files in Supabase Storage

### 5.3 Platform Selector

* Required selection for each file (Zoom, Meet, Teams)
* UI dropdown or tag assignment per upload

### 5.4 Transcript Extraction

* Backend job per platform using pre-integrated speech-to-text logic
* Batch processing
* Store results in Supabase DB

### 5.5 Dashboard UI

* File list with status (Pending, Processing, Done, Error)
* Transcript preview (Expandable/Collapsible)
* Search bar
* Download options (TXT, SRT, JSON)

### 5.6 Settings & Profile

* Profile page with basic info and logout option

---

## 6. **Milestones & Timeline**

### Phase 1 - Week 1–2

* Set up Next.js app and Tailwind UI
* Set up Supabase project and authentication

### Phase 2 - Week 3

* Implement file upload and Supabase Storage integration
* Add platform selection UI

### Phase 3 - Week 4

* Implement mock transcription processor (simulate STT)
* Save transcript to DB

### Phase 4 - Week 5

* Create dashboard to view transcripts
* Add search and format download functionality

### Phase 5 - Week 6

* Polish UI/UX
* Deploy on Vercel

---

## 7. **User Flow Diagrams**

### 7.1 Sign Up / Login Flow

```
User --> Login Page --> Auth via Supabase --> Redirect to Dashboard
```

### 7.2 Upload Flow

```
Dashboard --> Drag-and-Drop Upload --> Platform Selection --> Submit Upload --> Supabase Storage --> Processing
```

### 7.3 Transcript Management Flow

```
Dashboard --> File List --> View Transcript --> Search or Download --> Choose Format --> Download File
```

---

## 8. **Non-Functional Requirements**

* Responsive design
* Mobile-friendly interface
* Secure file storage (Supabase storage rules)
* Scalable deployment (Vercel edge functions)

---

## 9. **Open Questions**

* Will you use a third-party transcription service (like OpenAI Whisper)?
* Should there be team/workspace support in the future?
* Do you want real-time processing progress (Socket.io or polling)?

---

## 10. **Risks & Mitigations**

* **Large file size uploads**: Set limits and chunk uploads
* **Accuracy of transcripts**: Evaluate transcription models
* **Security**: Implement row-level security in Supabase

---

## 11. **Appendices**

* Sample SRT file format
* Example of JSON transcript structure
