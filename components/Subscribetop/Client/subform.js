'use client';


import styles from './subform.module.css'

import { Form, Input, Button, Item } from "antd";
import React, { Component } from 'react';




export default class Subform extends Component {

  render() {
    return (

        <div id={styles.SUBSCRIBE}>
            <Form
                style={{
                  marginBottom: "0",
                  height: "100%",
                  gridArea: "FORM",
                  paddingBottom: "0",
                }}
                id={styles.FORM}
                name={["user", "name"]}
                label="Email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
              <Input style={{ marginBottom: "0", height: "100%" }} />
            </Form>

            <Button id={styles.SUB_BUTTON}>
            </Button>
        </div>             
    )
  }
}

               