
# User Guide: TTL-SPHINX Governance Interface

This guide explains how to operate the S.P.H.I.N.X. Governance interface to ethically ground AI outputs.

## 1. Select a Governance Framework

Upon launching the application, you are presented with the **Framework Selector**.

*   **Islamic Framework**: Uses terms like *Tafakkur* and *Shariah* principles.
*   **Jewish Framework**: Focuses on *Halacha* and *Pikuach Nefesh*.
*   **Christian Framework**: Centers on *Stewardship* and *Discernment*.
*   **Secular Humanist**: Focuses on *Peer Review* and *Human Rights*.

Click a card to select that framework for the current session. This determines the vocabulary, citation sources, and ethical constraints applied to the AI agents.

## 2. Initialize Protocol (Input)

Enter your query or ethical dilemma in the text area. 
*   **Example**: "Draft a policy for AI use in healthcare."
*   **Quick Try**: Use the sample buttons below the text area for framework-specific examples.

Click **Execute S.P.H.I.N.X.** to begin the analysis.

## 3. Monitor the S.P.H.I.N.X. Engine

The application will transition to the processing view.
*   **Left Panel**: Tracks the 6 steps (S-P-H-I-N-X).
*   **Right Panel**: Visualizes the output of the active agent.
*   **Audit Log (Bottom)**: Watch the system log every step in real-time.

### The "Sacred Consent" Check
During the **Investigate (I)** phase, the system will **PAUSE**.
A modal will appear requiring **Sacred Consent**.
*   Read the ethical finding provided by the "Ethical Alignment Agent".
*   If you agree that the action aligns with the framework's values, click **Authorize & Proceed**.
*   The protocol cannot continue without this explicit human authorization.

## 4. Review the HOB Artifact

Once complete, the system generates a **Handoff Oversight Block (HOB)**.
*   This is a YAML-formatted receipt of the governance process.
*   It contains an "Isnād Chain" (Chain of Authority) showing which agent performed which step.
*   **Download**: Click the download icon to save the `.yaml` file.
*   **Copy**: Click the copy icon to paste the result into another system.

## 5. Audit Log

The Audit Log at the bottom of the screen records every interaction.
*   **User**: Actions taken by you (Selection, Consent).
*   **System**: Operational state changes.
*   **SPHINX_AGENT**: Actions taken by the AI models.
*   **Hash**: A unique identifier for that log entry, cryptographically linked to the previous entry.
