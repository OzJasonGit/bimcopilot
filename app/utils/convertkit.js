/**
 * Kit (ConvertKit) integration for app signups.
 * 1. Creates a subscriber via Kit API v4.
 * 2. Adds a tag to the subscriber (e.g. "New App Signup").
 * In Kit, set up a Visual Automation: "Is added to a Tag" → that tag → "Subscribe to a sequence"
 * with your welcome emails.
 *
 * Set in .env:
 *   CONVERTKIT_API_KEY - From Settings > Developer in Kit
 *   CONVERTKIT_TAG_ID  - Tag ID for "New App Signup" (or similar)
 * @see https://developers.kit.com/api-reference/overview
 */

const KIT_API_BASE = "https://api.kit.com/v4";

function getApiKey() {
  return process.env.CONVERTKIT_API_KEY;
}

/**
 * Create a subscriber (Kit API v4). Upserts by email.
 * @returns {Promise<{ success: boolean, subscriberId?: number, error?: string }>}
 */
async function createSubscriber({ email, firstName, lastName }) {
  const apiKey = getApiKey();
  if (!apiKey) return { success: false, error: "CONVERTKIT_API_KEY is not set" };

  const url = `${KIT_API_BASE}/subscribers`;
  const body = {
    email_address: email.trim().toLowerCase(),
    first_name: firstName && firstName.trim() ? firstName.trim() : null,
    state: "active",
    ...(lastName && lastName.trim() && {
      fields: { "Last name": lastName.trim() },
    }),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.errors?.[0] || data?.message || res.statusText || "Create subscriber failed";
    return { success: false, error: msg };
  }

  const id = data?.subscriber?.id;
  if (id == null) return { success: false, error: "No subscriber id in response" };
  return { success: true, subscriberId: id };
}

/**
 * Add a tag to an existing subscriber (Kit API v4).
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
async function addTagToSubscriber(subscriberId, tagId) {
  const apiKey = getApiKey();
  if (!apiKey) return { success: false, error: "CONVERTKIT_API_KEY is not set" };

  const url = `${KIT_API_BASE}/tags/${tagId}/subscribers/${subscriberId}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({}),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok && res.status !== 200) {
    const raw = data?.errors?.[0] || data?.message || res.statusText || "Add tag failed";
    const msg =
      res.status === 404
        ? `Tag not found. Check that CONVERTKIT_TAG_ID (${tagId}) exists in your Kit account under Subscribers → Tags.`
        : raw;
    return { success: false, error: msg };
  }

  return { success: true };
}

/**
 * Create subscriber and add signup tag. Used when someone signs up in your app.
 * Kit can then trigger a Visual Automation (e.g. welcome sequence) when "Is added to a Tag".
 *
 * @param {Object} options
 * @param {string} options.email - Subscriber email
 * @param {string} [options.firstName] - First name
 * @param {string} [options.lastName] - Last name (custom field "Last name" in Kit if you use it)
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function addSignupSubscriberToKit({ email, firstName, lastName }) {
  const tagId = process.env.CONVERTKIT_TAG_ID;
  if (!tagId) {
    return { success: false, error: "ConvertKit not configured (CONVERTKIT_TAG_ID)" };
  }

  try {
    const create = await createSubscriber({ email, firstName, lastName });
    if (!create.success) return create;

    const tag = await addTagToSubscriber(create.subscriberId, tagId);
    if (!tag.success) return tag;

    return { success: true };
  } catch (err) {
    console.error("Kit add signup subscriber error:", err);
    return { success: false, error: err.message || "Kit request failed" };
  }
}
