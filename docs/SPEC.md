**The Problem:**
Women often face safety concerns while traveling, working late, or in unfamiliar environments. Traditional emergency response is slow, and help may not reach them in time.

**The Solution:**
Our Women Safety App provides instant emergency response at the tap of a button. With SOS alerts and continuous location sharing, emergency contacts are notified immediately with live location, audio, and video feeds. Users can activate Safety Mode for preventive protection during potentially unsafe situations.

**Key Features:**

- **One-tap SOS**: Emergency alert to pre-configured contacts with live location and media.
- **Safety Mode**: Continuous location sharing with trusted ("Stay With Me") contacts.
- **Emergency Helplines**: Quick access to emergency helpline numbers.
- **Smart Contact Management**: Organize trusted contacts as "Inner Circle" or "Nearby Helpers"

## SOS/Home Screen

**Feature Summary:-**

1. SOS Button
2. Activate Safety Mode Button
3. Active Safety Mode and SOS Status Panel

### Feature 1: SOS Button

**Purpose:** Enable users to quickly trigger an emergency alert to pre-configured emergency contacts when they need immediate help.

**Behavior:**

1. User taps "SOS" button → Display "SOS Confirmation Modal" with a 10-second countdown timer
2. **SOS Confirmation Modal Details:**
    - Heading: "Confirm SOS?"
    - Supporting text: "Your SOS contacts will be alerted with your live location, audio and video."
    - Timer box labeled "Auto-confirm in" displaying the 10-second countdown
    - Two action buttons: "Cancel" and "Confirm"
3. User clicks "Cancel" within 10 seconds → Close modal without sending any alert; button remains as "SOS"
4. User clicks "Confirm" OR timer reaches 0 → Trigger SOS alert; button transforms to "Dismiss SOS"
5. **Dismiss SOS Button State:**
    - Displayed as a square box containing an 'X' button with text "Dismiss SOS" below it
    - User clicks "Dismiss SOS" → Cancel the active alert; button reverts to "SOS"

### Feature 2: Activate Safety Mode Button

**Purpose:** Allow users to activate continuous live location sharing with pre-configured contacts ("Stay With Me") for the duration they are in a potentially unsafe situation.

**Behavior:**

1. User swipes to activate Safety Mode → Location sharing with all contacts marked "Stay With Me" begins immediately
2. User swipes back to de-activate Safety Mode → Location sharing stops

### **Feature 3: Active Safety Mode and SOS Status Panel**

**Purpose:** To display a real-time list of contacts who are actively sharing their live location and/or SOS alerts with the user, enabling the user to monitor their safety and provide assistance by tracking their location.

**Behavior:**

1. **Status Panel Display**: A list showing all contacts who are currently sharing their live location and/or SOS alerts with the user
2. **Panel Visibility**: The panel appears when at least one contact is actively sharing location or has triggered an SOS alert
3. **Contact Card Details**: Each contact card in the panel displays:
    - **Contact Name**
    - **Contact Number**
    - **Active Status Badges**: Visual indicators showing which features are active for each contact:
        - **"Stay With Me"** badge → Indicates this contact has Safety Mode enabled and is sharing live location
        - **"SOS"** badge → Indicates this contact has triggered an SOS alert with live location, audio, and video
    - **Arrow Button**: Arrow button that redirects to the Tracker Screen.
4. **Status Clarity**: Each contact card clearly indicates whether they are:
    - Sharing location via Safety Mode only
    - Actively sending SOS alert only
    - Both Safety Mode and SOS active simultaneously

---

## Emergency Contact Screen

### **Feature - 1:** View/Search/Filter Emergency Contacts

**Purpose:** To display a comprehensive view of all emergency contacts organized by contact type, with the ability to search, filter, and manage individual contact details.

**Behavior:**

1. **View Contact Lists by Type**: The screen displays emergency contacts organized into two separate sections:
    - **"Inner Circle"** Contacts: Displays all contacts categorized as Inner Circle
    - **"Nearby Helpers"** Contacts: Displays all contacts categorized as Nearby Helpers
2. **Search Functionality**: Users can search across the contact lists by name or contact number to quickly locate specific emergency contacts.
3. **Filter Contacts**: Chip-based filtering allows users to apply multiple filters simultaneously to narrow down the contact list:
    - **By “Stay With Me” Badge**: Filter to show only contacts with Stay With Me enabled
    - **By “SOS” Badge**: Filter to show only contacts with SOS enabled
    - Multiple filters can be combined (e.g., show contacts with both Stay With Me AND SOS enabled)
4. **Contact Card Display**: Each contact is presented as a card containing the following information:
    - **Name**
    - **Contact Number**
    - **Relationship Badge:** Family / Partner / Close Friend / Friend / Colleague / Classmate / Neighbor / Other
    - **Stay With Me Badge**: Appears on the card only if Stay With Me setting is enabled for that contact
    - **SOS Badge**: Appears on the card only if SOS setting is enabled for that contact
    - **Edit Button**: Tapping this button redirects the user to the Add/Edit Emergency Contact Screen where they can modify and save the contact details

---

## **Add/Edit Emergency Contact Screen**

### **Feature - 1:** Add/Edit Emergency Contact Screen

**Purpose:** To allow users to create new emergency contact entries or modify existing emergency contact details, enabling the app to notify and share location with trusted contacts during emergencies or when safety mode is activated.

**Behavior:**

1. **Capture Contact Details**: The screen collects comprehensive emergency contact information through the following fields:
    - **Contact Type**: Presented as selectable chips (not dropdown) with two options: "Inner Circle" or "Nearby Helpers"
    - **Name**: Text input field accepting only alphabetic characters
    - **Contact Number**: Input field accepting country code (dropdown) + mobile number.
    - **Relationship**: Presented as selectable chips (not dropdown) with options: Family / Partner / Close Friend / Friend / Colleague / Classmate / Neighbor / Other
    - **Stay With Me Toggle**: Disabled by default. Supporting text explains: "Contact will receive location when safety mode is activated"
    - **SOS Toggle**: Enabled by default. Supporting text explains: "Contact will receive alert when SOS is triggered"
2. **Name Validation**: Only alphabetic characters are permitted. Any non-alphabetic input is rejected.
3. **Emergency Contact Number Validation**:
    - IF the provided emergency contact number does not exist as an account on the app → THEN → Display error message below the input box stating "This contact hasn't signed up yet." AND display an error icon inside the input box
    - IF the provided emergency contact number exists as an account on the app → THEN → Display a check/correct icon inside the input box
4. **Relationship Selection**: Single selection only. Users can select only one relationship option; multi-select is not allowed.
5. **Toggle Defaults**:
    - **“Stay With Me”** toggle is disabled by default
    - **“SOS”** toggle is enabled by default
6. **Save Contact Button**:
    - On successful form submission → THEN → Redirect user to the emergency contact list screen AND display a success toast message: “contact saved successfully”.
    - On failed form submission → THEN → Display an error toast message on the current screen: “Failed to save contact”.
    

---

## Tracker Screen

**Feature Summary:-**

1.View live location on map
2.View live audio/video feed
3.A group chat window where emergency contacts will co-ordinate to help out the victim.
4.”Mark as safe” swipe button

### **Feature - 1: View Live Location on Map**

**Purpose:** Display the victim's real-time GPS coordinates on an interactive map, allowing emergency contacts to visually track the victim's location and provide context-aware assistance.

**Behavior:**

1. Location updates every 5 seconds (configurable in settings)
2. Timestamp of last update shows below map: “Last updated: 5 seconds ago”
3. Re-Center button to center the map around the victim’s location

### **Feature - 2: View Live Audio/Video Feed**

**Purpose:** Allow emergency contacts to see and hear the victim in real-time, providing situational awareness and enabling voice communication during an emergency.

**Behavior:**

1. Front facing camera is default.
2. Camera Toggle Button to switch between front and back camera.
3. Camera Turn OFF/ON Button.
4. When camera is OFF Video feed would shows an icon indicating the camera is OFF.
5. Audio Mute/Unmute Button.

### **Feature - 3: Group Chat Window**

**Purpose:** Enable emergency contacts to coordinate their response and communicate with the victim in real-time, centralizing all critical messages in one chat thread.

**Behavior:**

1. Text Input field “Send a message…”
2. Send Button activates when text is entered.
3. Show unread message count badge
4. Each message displays:
    1. **Sender Name**
    2. **Message Text**
    3. **Timestamp:**  (e.g., "14:34 PM")
    4. **Message Status**
        - `✓` = sent
        - `↻` = sending (spinner)
        - `⚠️` = failed to send; tap to retry

### Feature - 4: “Mark as Safe” Swipe Button

**Purpose:** Allow the victim to end the SOS alert with a deliberate swipe action, stopping live location/camera transmission and notifying all emergency contacts that the situation has been resolved.

**Behavior:**

1. On swipe:
    1. Confirmation modal appears: “Are you sure you want to mark as safe?”
    2. Two buttons: “Cancel” | “Confirm & End Alert”
    3. If user confirms:
        - SOS alert is cancelled
        - Live location stops transmitting
        - Camera/audio feeds stop
        - All emergency contacts receive notification: “[Victim] marked as safe”
        - Screen redirects to home screen

---

## Alert Notification Screen

**Feature Summary:-**

1. Show Title: “Someone needs help”.
2. View victim’s name and contact number with call icon.
3. View when emergency alert was triggered. (e.g., Emergency alert triggered 2 mins ago)
4. “Open Live Alert →” Button to redirect to tracker screen

### **Feature 1: View Victim's Name and Contact Number with Call Icon**

**Purpose:** Display the victim's identity and primary contact number, enabling emergency contacts to quickly identify the victim and initiate voice call without requiring them to search for contact details.

### **Feature 2: View When Emergency Alert Was Triggered**

**Purpose:** Provide context about the urgency and recency of the SOS alert by displaying elapsed time, helping emergency contacts understand how long the victim has been in distress.

**Behavior:**

1. Show elapsed time as relative in human-readable format: "Alert was triggered X mins ago", "Just now", "1 hour 25 minutes ago"
    1. **Inform User:** The screen displays a descriptive note at the bottom informing users about the offline calling capability: *"Emergency calls work without internet or mobile data”.* This reassures users that they can access these critical services regardless of their current connectivity status.
    

### **Feature 3: "Open Live Alert →" Button to Redirect to Tracker Screen**

**Purpose:** Provide a direct, call-to-action that redirects to the Tracker Screen, where they can access real-time location, video/audio feed, and group chat to actively assist the victim.

---

## Women Helpline Screen

### **Feature - 1: View and Call Helpline Numbers**

**Purpose:** To provide quick and easy access to emergency helpline numbers for women in distress, enabling them to rapidly connect with emergency services and support organizations without needing to remember phone numbers.

**Behavior:**

1. **Display Helpline Numbers**: The screen presents a curated list of four critical helpline numbers:
    - 181 Women Helpline
    - 112 National Helpline
    - 108 Ambulance
    - 100 Police
2. **Call Button Functionality**: Each helpline number has an associated call button positioned beside it. When tapped, the button triggers a direct call to the respective helpline number.

---

## Account Setup Screens

Create account setup screens with the below described flow.

!signup-login-screen.jpeg

---

!verify-otp-screen.jpeg

---

!profile-setup-screen.jpeg

---