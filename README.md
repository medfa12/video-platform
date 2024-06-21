
# MTube Architecture

This project implements a simplified video platform clone with core functionality. The architecture is designed for simplicity and scalability, utilizing various Google Cloud services.

## Key Components:

1. **Video Storage**: Google Cloud Storage
   - Hosts raw and processed videos

2. **Video Upload Events**: Cloud Pub/Sub
   - Manages video upload events for asynchronous processing

3. **Video Processing**: Cloud Run
   - Workers that transcode videos using ffmpeg

4. **Video Metadata**: Firestore
   - Stores processed video metadata

5. **Video API**: Firebase Functions
   - Handles video uploads and metadata retrieval

6. **Web Client**: Next.js / Cloud Run
   - User interface for video upload and viewing

7. **Authentication**: Firebase Auth
   - Manages user authentication with Google Sign-In

## Key Features:

- Google account sign-in/out
- Video upload for authenticated users
- Video transcoding to multiple formats
- Listing and viewing uploaded videos (authenticated and unauthenticated)

This architecture provides a scalable foundation for a video sharing platform, with room for future enhancements and optimizations.
```mermaid
graph TD
    A[Web Client] -->|Authenticates| B[Firebase Auth]
    A -->|Uploads/Views Videos| C[Video API]
    C -->|Stores/Retrieves Metadata| D[Firestore]
    C -->|Generates Signed URL| E[Cloud Storage]
    A -->|Uploads Video| E
    E -->|Triggers| F[Cloud Pub/Sub]
    F -->|Notifies| G[Video Processing Workers]
    G -->|Processes Videos| E
    G -->|Updates Metadata| D

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bfb,stroke:#333,stroke-width:2px
    style D fill:#fbb,stroke:#333,stroke-width:2px
    style E fill:#bff,stroke:#333,stroke-width:2px
    style F fill:#fbf,stroke:#333,stroke-width:2px
    style G fill:#ffb,stroke:#333,stroke-width:2px
```