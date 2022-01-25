import Head from "next/head";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import styles from "@/pages/index.module.css";

export default function Home() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Form onFinish={onFinish} initialValues={{
          optionalText: 'testing'
        }}>
          <Form.Item name="optionalText" data-testid="optionalText">
            <Input placeholder="Optional text" data-testid="optionalText"/>
          </Form.Item>

          <Form.Item
            name="requiredText"
            rules={[
              {
                required: true,
                message: "This input is required.",
              },
            ]}
          >
            <Input placeholder="Required text"  data-testid="requiredText"/>
          </Form.Item>

          <Form.Item
            name="requiredNumber"
            rules={[
              {
                required: true,
                message: "This input is required.",
              },
            ]}
          >
            <Input placeholder="Required number"  data-testid="requiredNumber" />
          </Form.Item>

          <Form.Item
            name="requiredSpecialCharacter"
            rules={[
              {
                required: true,
                message: "This input is required.",
              },
            ]}
          >
            <Input placeholder="Type at least one special char"  data-testid="requiredSpecial" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" data-testid="submitFormBtn">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
