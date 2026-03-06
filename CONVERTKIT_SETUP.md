# Kit welcome email (signup)

When a user signs up in your app, they can receive a welcome email sequence from Kit. The flow uses the **Kit API v4**: create subscriber → add tag → Kit runs a Visual Automation that subscribes them to your welcome sequence.

## 1. Get your API key (must be V4)

Go to [Settings > Developer](https://app.kit.com/account_settings/developer_settings) in your Kit account.

- Find the **V4 Keys** section (not “API key” / “API secret” from an OAuth app or the legacy V3 section).
- Click **“Add a new key”**, give it a name (e.g. “Bimcopilot signup”), then **copy the key** right away (Kit only shows it once).
- Put that single value in `CONVERTKIT_API_KEY`.

**If you see “API key” and “API secret”:** those are usually for OAuth apps or V3. They do **not** work with this integration. You must use a key created under **V4 Keys → Add a new key**. If you don’t see “V4 Keys”, your plan might not expose it; contact Kit support or use the SMTP fallback for welcome emails instead.

## 2. Create a tag and get its ID

In Kit, go to **Subscribers → Tags** (or **Audience → Tags**). Create a tag (e.g. **"New App Signup"**). You need the **Tag ID** (a number):

- Open the tag (click it) and check the URL: `.../tags/**12345**` — the number is the tag ID.
- Or in some views the ID is shown in the tag list or tag settings.

Set `CONVERTKIT_TAG_ID` to that number only (e.g. `CONVERTKIT_TAG_ID=12345`). If the ID is wrong or the tag was deleted, you’ll get **"Not Found"** when testing.

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

---

## No email received after signup?

1. **Check the server terminal** after a signup. You should see one of:
   - `[signup] Sending welcome via Kit...` then either `Kit: subscriber added and tagged` or `Kit welcome failed: ...`
   - `[signup] Kit not configured, using SMTP...` then either `Welcome email sent via SMTP` or `SMTP welcome failed (is SMTP configured?): ...`

2. **If you use Kit:** The welcome email is sent by Kit’s **Visual Automation**, not instantly by the API. In Kit go to **Automate → Visual Automations** and ensure:
   - You have an automation whose trigger is **“Is added to a Tag”** and that tag is the one you use (`CONVERTKIT_TAG_ID`).
   - The automation has an action **“Subscribe to a sequence”** with your welcome emails.
   - The automation is **Active**. Then check **Subscribers** to confirm the new signup has that tag.

3. **If you use SMTP (no Kit or Kit failed):** Set in `.env`: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and optionally `SMTP_FROM`. Restart the server and sign up again; check the terminal for `Welcome email sent via SMTP` or the error message.

4. **“The API key is invalid”:** You must use a **V4** API key from **Developer → V4 Keys → Add a new key**. The “API key” and “API secret” shown elsewhere (e.g. for an app or V3) are not the same and will be rejected. Create a new key under **V4 Keys** and set that value as `CONVERTKIT_API_KEY`.
