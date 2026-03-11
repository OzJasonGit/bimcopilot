# Notion → Stories Webhook

This endpoint lets you create or update **stories** from Notion when a page is created or updated. Use an automation (Zapier, Make, n8n, etc.) to call this URL when a Notion page changes.

## Environment variables

Add to `.env`:

- **`NOTION_INTEGRATION_SECRET`** – Notion internal integration token (from [Notion Integrations](https://www.notion.so/my-integrations)). The integration must have **read** access to the pages you want to sync; share each Notion page (or its parent) with the integration.
- **`NOTION_WEBHOOK_SECRET`** – A secret string you choose. Your automation must send this in the request so we can verify the webhook (see below). If not set, verification is skipped (not recommended in production).

## Request format

**Method:** `POST`  
**URL:** `https://your-domain.com/api/webhooks/notion` (or `http://localhost:3000/api/webhooks/notion` in dev)

**Headers:**

- `Content-Type: application/json`
- `x-notion-webhook-secret: YOUR_NOTION_WEBHOOK_SECRET`  
  **or**  
  `Authorization: Bearer YOUR_NOTION_WEBHOOK_SECRET`

**Body (JSON):**

| Field        | Required | Description                                                                 |
|-------------|----------|-----------------------------------------------------------------------------|
| `page_id`   | Yes      | Notion page ID (UUID). In Notion, open the page in the browser; the ID is in the URL: `notion.so/workspace/PAGE_ID?v=...`. |
| `published` | No       | Set to `true` to publish the story; default `false` (draft).                |
| `post_number` | No    | Override post number (e.g. `"21"`).                                         |
| `author`    | No       | Override author name.                                                       |
| `slug`      | No       | Override URL slug.                                                          |
| `image`     | No       | Main image URL (required by your app for new stories; can be set in Notion or here). |

Example:

```json
{
  "page_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "published": true
}
```

## Behaviour

- **First time** (no story with this `notion_page_id` or `slug`): a new story is **created** in MongoDB.
- **Later** (story with same `notion_page_id` or `slug` exists): that story is **updated** with the latest content from Notion.

Content is mapped from the Notion page **title** and **block children** (paragraphs, headings, lists, etc.) into your story fields (`title`, `introduction`, `body1`, etc.). Optional Notion properties (e.g. **Slug**, **Author**, **Subtitle**) are used when present.

## Setting up the automation

Notion does not send webhooks directly to your server. Use one of:

1. **Zapier** – Trigger “New or Updated Page in Database” (or “Page in Workspace”), then action “Webhooks by Zapier” → POST to `https://your-domain.com/api/webhooks/notion` with the body above and the secret header.
2. **Make (Integromat)** – Notion “Watch Pages” or “Watch Database Items” → HTTP “Make a Request” to your webhook URL with the secret header.
3. **n8n** – Notion node (e.g. “Page Updated”) → HTTP Request node to your webhook URL with the secret header.

In all cases, pass the Notion **page ID** in `page_id` and set `x-notion-webhook-secret` (or `Authorization: Bearer ...`) to your `NOTION_WEBHOOK_SECRET`.

## GET /api/webhooks/notion

Returns a short message and docs; useful to confirm the endpoint is reachable.
