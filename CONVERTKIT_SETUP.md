# Kit welcome email (signup)

When a user signs up in your app, they can receive a welcome email sequence from Kit. The flow uses the **Kit API v4**: create subscriber → add tag → Kit runs a Visual Automation that subscribes them to your welcome sequence.

## 1. Get your API key

Go to [Settings > Developer](https://app.kit.com/account_settings/developer_settings) in your Kit account and copy your **API key**.

## 2. Create a tag in Kit

In Kit, create a tag (e.g. **"New App Signup"**). You’ll use this tag as the trigger for your welcome automation. Note the **Tag ID** (e.g. from the tag’s URL or settings).

## 3. Set up a Visual Automation in Kit

1. Go to **Automate** → **Visual Automations**.
2. Create a new automation.
3. Set the **entry point** to **“Is added to a Tag”** and select the tag you created (e.g. "New App Signup").
4. Add an action **“Subscribe to a sequence”** and choose the sequence that contains your welcome emails.
5. Set the automation to **Active**.

Full API reference: [developers.kit.com](https://developers.kit.com/api-reference/overview)

## 4. Environment variables

Add to `.env` (or `.env.local`):

```env
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_TAG_ID=your_tag_id_here
```

Restart the app after changing env vars.

## 5. Flow summary

1. User signs up in your app → your API creates the user in the DB.
2. Your API calls the Kit API to:
   - **Create the subscriber**: `POST /v4/subscribers` (email + name).
   - **Add the tag**: `POST /v4/tags/{tag_id}/subscribers/{subscriber_id}`.
3. Kit’s automation sees “subscriber added to tag” and subscribes them to your welcome sequence, so they get the welcome emails.

If `CONVERTKIT_API_KEY` or `CONVERTKIT_TAG_ID` is missing, the app falls back to the existing SMTP welcome email (if configured).

Optional: In Kit, add a custom field **“Last name”** so the signup can send the user’s last name; the integration will send it when that field exists.

---

## Testing

### Option A: Test endpoint (development only)

With the dev server running (`npm run dev`), call the test endpoint to add a subscriber without signing up:

```bash
curl -X POST http://localhost:3000/api/test-kit \
  -H "Content-Type: application/json" \
  -d '{"email":"your-real-email@example.com","firstName":"Test","lastName":"User"}'
```

- **Success**: `{"ok":true,"message":"Subscriber created and tagged. Check Kit dashboard."}`
- **Failure**: `{"ok":false,"error":"..."}` — fix env vars or Kit setup.

Then in Kit: **Subscribers** should show the new subscriber with your tag, and your Visual Automation may send the welcome sequence (if the automation is active).

### Option B: Real signup

1. Open your app's signup page and register with a real email you can access.
2. In the **terminal** where the app is running, look for any `Kit welcome failed:` log (means the API call failed).
3. In **Kit**: **Subscribers** → find the new subscriber and confirm they have the correct tag.
4. Check the inbox for the welcome sequence (depends on your automation).

### Option C: Check env

Ensure both are set (restart the server after changing). Confirm `.env` has `CONVERTKIT_API_KEY` and `CONVERTKIT_TAG_ID` and restart the dev server.
