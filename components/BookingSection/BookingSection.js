"use client";

import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import styles from "./BookingSection.module.css";

const CALCOM_LINK = process.env.NEXT_PUBLIC_CALCOM_LINK;
const CAL_EMBED_URL = "https://app.cal.eu/embed/embed.js";
const CAL_ORIGIN = "https://app.cal.eu";

function getCalLink(value) {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    if (trimmed.startsWith("http")) {
      const url = new URL(trimmed);
      return url.pathname.replace(/^\/+|\/+$/g, "") || null;
    }
    return trimmed.replace(/^\/+|\/+$/g, "") || null;
  } catch {
    return trimmed;
  }
}

export default function BookingSection() {
  const calLink = getCalLink(CALCOM_LINK);

  useEffect(() => {
    if (!calLink) return;
    (async function () {
      const cal = await getCalApi({ embedJsUrl: CAL_EMBED_URL });
      cal("ui", {
        theme: "dark",
        layout: "month_view",
        hideEventTypeDetails: true,
      });
    })();
  }, [calLink]);

  if (!CALCOM_LINK || !calLink) {


    /* return (
          <section id={styles.SHADOW_SECTION_TAG}>
            <div className={styles.grid_0_main}>
              <div className={styles.left}>
                <div className={styles.calendar}>
                  <div className={styles.setupHint}>
                    <p>Connect your Cal.com account to enable booking.</p>
                    <p className={styles.setupSteps}>
                      Add <code>NEXT_PUBLIC_CALCOM_LINK</code> to your <code>.env</code> with your Cal.com
                      scheduling link (e.g. <code>https://cal.com/your-username</code> or{" "}
                      <code>your-username/30min</code>).
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.right} />
            </div>
          </section>
        );*/


  }

  return (
    <section id={styles.SHADOW_SECTION_TAG}>

      <div className={styles.grid_0_main}>
        <div className={styles.grid}>

          <div className={styles.tag}>

            <div
              className={styles.text}
              style={{
                gridArea: "TEXT"
              }}>
              <h2
                class="text-6xl ... text-stone-50 ... font-avant_garde_bold">
                See if Bimcopilot is the
                right for you
              </h2>
              <br />
              <h3
                class="text-base ... text-stone-400 ... font-avant_garde_medium">
                Schedule a 15 minute discovery tour through Bimcopilot.
              </h3>
            </div>

          </div>

          <div className={styles.calendar}>
            <div className={styles.calEmbedWrapper}>
              <Cal
                calLink={calLink}
                embedJsUrl={CAL_EMBED_URL}
                calOrigin={CAL_ORIGIN}
                config={{
                  theme: "dark",
                  layout: "month_view",
                }}
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );






}
