import styles from './process.module.css'
import React, { Component } from 'react';
export default class Process extends Component {

  render() {
    return (

        <section id={styles.SHADOW_SECTION_PROCESS} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div class={styles.process_section} styles={{ position: "relative" }}>
            <div id={styles.PROCESS_TITLE}>
              <h1
                class="text-7xl ... text-neutral-700 ... font-avant_garde_bold"
                id={styles._H1}
              >
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-6xl ... text-emerald-200 ">
                  How We Work
                </a>
                <br/>
                <h4
                  class="text-xl ... text-neutral-700 ... font-avant_garde_bold"
                  id={styles._H5}>
                  This is just some text to pass the time
                </h4>

              </h1>
            </div>

            <div id={styles.PROCESS_TEXT} styles={{ gridArea: "STEPS" }}>
              
            </div>

            <div id={styles.PROCESS} styles={{ position: "absolute" }}>
              <div id={styles.PROCESS_HORIZONTAL}>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ...  border-4 border-neutral-500 ..."
                  styles={{ gridArea: "1" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-neutral-600 ... rounded-full ... text-center "
                    >
                      <span
                        class=" inline-block align-middle ..."
                        styles={{ height: "100%" }}
                      >
                        0
                      </span>
                    </div>

                    <div
                      id={styles.CARD_TITLE}
                      class="text-stone-600 drop-shadow-xl font-avant_garde_bold text-4xl ..."
                    >
                      <h1 id={styles._H1} class="text-4xl ...">
                        Discovery Call
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="       text-stone-600 ... drop-shadow-xl font-avant_garde_bold     "
                    >
                      <h3>
                        Here's where we'll define whether bimcopilot.com is the
                        right solution for your project.
                      </h3>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc font-avant_garde_bold text-sm ...">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ... bg-zinc-900 ... drop-shadow-2xl ..."
                  styles={{ gridArea: "2" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-stone-200 ... rounded-full ... text-center"
                    >
                      <h1 styles={{ position: "relative", top: "50%" }}>1</h1>
                    </div>

                    <div id={styles.CARD_TITLE} class="">
                      <h1
                        id={styles._H1}
                        class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold text-4xl ..."
                      >
                        Strategic <br />
                        Definition
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="         text-stone-200 ... drop-shadow-xl font-avant_garde_bold     "
                    >
                      <h2>This is the subtitle</h2>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc    text-stone-200 ... font-avant_garde_bold   text-sm ...  ">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ... bg-zinc-900 ... drop-shadow-2xl ..."
                  styles={{ gridArea: "3" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-stone-200 ...  rounded-full ... text-center"
                    >
                      <h1 styles={{ textAlign: "center" }}>2</h1>
                    </div>

                    <div id={styles.CARD_TITLE} class="">
                      <h1
                        id={styles._H1}
                        class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold text-4xl ..."
                      >
                        Project Brief
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="            text-stone-200 ... drop-shadow-xl font-avant_garde_bold          "
                    >
                      <h3 className="text-3xl">This is the subtitle</h3>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc    text-stone-200 ... font-avant_garde_bold text-sm ...">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ... bg-zinc-900 ... drop-shadow-2xl ..."
                  styles={{ gridArea: "4" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-stone-200 ... rounded-full ... text-center"
                    >
                      <h1 styles={{ textAlign: "center" }}>3</h1>
                    </div>

                    <div id={styles.CARD_TITLE} class="">
                      <h1
                        id={styles._H1}
                        class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold text-4xl ..."
                      >
                        Schematic Production
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="         text-stone-200 ... drop-shadow-xl font-avant_garde_bold        "
                    >
                      <h3>This is the subtitle</h3>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc text-stone-200 ... font-avant_garde_bold   text-sm ...  ">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ... bg-zinc-900 ... drop-shadow-2xl ..."
                  styles={{ gridArea: "5" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-stone-200 ... rounded-full ... text-center"
                    >
                      <h1 styles={{ textAlign: "center" }}>4</h1>
                    </div>

                    <div id={styles.CARD_TITLE} class="">
                      <h1
                        id={styles._H1}
                        class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold text-4xl ..."
                      >
                        Technical Production
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="         text-stone-200 ... drop-shadow-xl font-avant_garde_bold       "
                    >
                      <h3>This is the subtitle</h3>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc   text-stone-200 ... font-avant_garde_bold   text-sm ...  ">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ... bg-zinc-900 ... drop-shadow-2xl ..."
                  styles={{ gridArea: "6" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-stone-200 ... rounded-full ... text-center"
                    >
                      <h1 styles={{ textAlign: "center" }}>5</h1>
                    </div>

                    <div id={styles.CARD_TITLE} class="">
                      <h1
                        id={styles._H1}
                        class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold text-4xl ..."
                      >
                        This is the title
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="         text-stone-200 ... drop-shadow-xl font-avant_garde_bold       "
                    >
                      <h3>This is the subtitle</h3>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc   text-stone-200 ... font-avant_garde_bold   text-sm ...  ">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

        

    )
  }
}

