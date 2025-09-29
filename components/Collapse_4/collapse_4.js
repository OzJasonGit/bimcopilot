"use client";



import { Collapse } from 'antd';


const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};

const panel_1 = () => (

    <h3 style={{ alignItems: "end" }}
        class="font-avant_garde_bold text-stone-500 ..."
        id={styles._H3}>
        Project Management, Delivery and Consultancy
    </h3>
);

const panel_2 = () => (
    <h3 style={{ alignItems: "end" }}
        class="font-avant_garde_bold text-stone-500 ..."
        id={styles._H3}>
        BIM Strategy, Execution Plan (BEP) and Documentation
        Digital Twin product development
    </h3>
);


const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";







const Collapsed_4 = () => {
    const items = [
        {
            key: '1',
            label: 'Accordion 1',
            children: defaultContent,
        },
        {
            key: '2',
            label: 'Accordion 2',
            children: defaultContent,
        },
        {
            key: '3',
            label: 'Accordion 3',
            children: defaultContent,
        },
    ];

    return (
        <>
        <Collapse items={items} />
        </>
    )
}


export default Collapsed_4;











