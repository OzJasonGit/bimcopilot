/**
 * Kit (formerly ConvertKit) API – add subscribers to your list.
 * Set in .env: KIT_API_KEY, KIT_FORM_ID
 * Optional: NEXT_PUBLIC_APP_URL for referrer when adding to form.
 */

const KIT_API_BASE = "https://api.kit.com";

function getAppUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * Create a subscriber in Kit (upsert by email).
 * @param {{ email: string, firstName?: string }} opts
 * @returns {Promise<{ id: number } | null>} subscriber id or null if Kit not configured / request failed
 */
export async function createKitSubscriber({ email, firstName }) {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    console.warn("Kit: KIT_API_KEY not set, skipping");
    return null;
  }

  const body = {
    email_address: email.toLowerCase().trim(),
    ...(firstName && firstName.trim() ? { first_name: firstName.trim() } : {}),
    state: "active",
  };

  try {
    const res = await fetch(`${KIT_API_BASE}/v4/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("Kit create subscriber error:", res.status, data);
      return null;
    }

    const id = data?.subscriber?.id;
    return id != null ? { id } : null;
  } catch (err) {
    console.error("Kit create subscriber error:", err);
    return null;
  }
}

/**
 * Add an existing Kit subscriber to a form (e.g. "Website signups").
 * @param {{ formId: number | string, subscriberId: number, referrer?: string }} opts
 */
export async function addKitSubscriberToForm({ formId, subscriberId, referrer }) {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey || !formId || subscriberId == null) return;

  const url = `${KIT_API_BASE}/v4/forms/${formId}/subscribers/${subscriberId}`;
  const body = { referrer: referrer || getAppUrl() };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Kit add to form error:", res.status, data);
    }
  } catch (err) {
    console.error("Kit add to form error:", err);
  }
}

/**
 * Add a subscriber to Kit and optionally to a form. Use this when someone signs up or subscribes.
 * Non-blocking: never throws; logs errors only.
 * @param {{ email: string, firstName?: string, formId?: number | string }} opts
 *   formId defaults to process.env.KIT_FORM_ID
 */
export async function addSubscriberToKit({ email, firstName, formId }) {
  const subscriber = await createKitSubscriber({ email, firstName });
  if (!subscriber) return;

  const fid = formId ?? process.env.KIT_FORM_ID;
  if (fid) {
    await addKitSubscriberToForm({
      formId: fid,
      subscriberId: subscriber.id,
      referrer: getAppUrl(),
    });
  }
}
