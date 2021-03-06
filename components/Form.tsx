import Input from "antd/lib/input";
import Button from "antd/lib/button";
import DatePicker from "antd/lib/date-picker";
import Checkbox from "antd/lib/checkbox";
import Select from "antd/lib/select";
import Radio from "antd/lib/radio";
import Switch from "antd/lib/switch";
import Form from "antd/lib/form";

interface CustomFormProps {
  onFinish: (values: any) => void;
}

export default function CustomForm({ onFinish }: CustomFormProps) {
  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        optionalText: "test",
      }}
      validateTrigger="onSubmit"
    >
      <Form.Item name="optionalText">
        <Input placeholder="Optional text" data-testid="optionalText" />
      </Form.Item>

      <Form.Item
        name="requiredText"
        rules={[
          {
            required: true,
            message: "Required text must not be empty.",
          },
        ]}
      >
        <Input
          name="requiredText"
          placeholder="Required text"
          data-testid="requiredText"
        />
      </Form.Item>

      <Form.Item
        name="requiredNumber"
        rules={[
          {
            required: true,
            message: "Required number must not be empty.",
          },
          {
            pattern: new RegExp(/^[0-9\b]+$/),
            message: "Input should only contain numbers",
          },
          {
            max: 10,
            message: "Only enter a maximum of 10 digits!",
          },
        ]}
      >
        <Input
          name="requiredNumber"
          placeholder="Required number"
          data-testid="requiredNumber"
        />
      </Form.Item>

      <Form.Item
        name="requiredSpecialCharacter"
        rules={[
          {
            required: true,
            message: "This input is required.",
          },
          {
            pattern: /\W|_/,
            message: "Input should have at least one special character.",
          },
        ]}
      >
        <Input
          placeholder="Type special characters"
          data-testid="requiredSpecialCharacter"
        />
      </Form.Item>

      <Form.Item
        name="dateInput"
        rules={[
          {
            required: true,
            message: "Date is required.",
          },
        ]}
      >
        <DatePicker data-testid="dateInput" />
      </Form.Item>

      <Form.Item
        name="selectInput"
        rules={[{ required: true, message: "Please select demo" }]}
      >
        <Select placeholder="Select demo" data-testid="selectInput">
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="rememberMe"
        valuePropName="checked"
        rules={[
          {
            required: true,
            message: "This checkbox is required",
          },
        ]}
      >
        <Checkbox data-testid="rememberMe">Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        name="radioGroupInput"
        rules={[
          {
            required: true,
            message: "Select one option",
          },
        ]}
      >
        <Radio.Group>
          <Radio value="radioA" data-testid="radioA">
            radioA
          </Radio>
          <Radio value="radioB" data-testid="radioB">
            radioB
          </Radio>
          <Radio value="radioC" data-testid="radioC">
            radioC
          </Radio>
          <Radio value="radioD" data-testid="radioD">
            radioD
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="switchInput"
        rules={[
          {
            required: true,
            message: "Please toggle switch",
          },
        ]}
      >
        <Switch data-testid="switchInput" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" data-testid="submitFormBtn">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
