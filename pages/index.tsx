import Head from "next/head";
import styles from "@/pages/index.module.css";
import CustomForm from "@/components/Form";
import Link from "next/link";
import { datadogRum } from "@datadog/browser-rum";

datadogRum.init({
  applicationId: "17a4bc98-32a3-48f1-be63-7851c8f0c10d",
  clientToken: "pub829fc1d9af92936c5180724168185756",
  site: "datadoghq.com",
  service: "test-app",
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sampleRate: 100,
  trackInteractions: true,
  defaultPrivacyLevel: "mask-user-input",
});

datadogRum.startSessionReplayRecording();

export default function Home() {
  const onFinish = (values: any) => {
    // console.log("Received values of form: ", values);
    // try {
    //   fetch("/form", {
    //     method: "POST",
    //     body: JSON.stringify(values),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => console.log({ data }));
    // } catch (error: any) {
    //   console.log({ error });
    //   datadogRum.addError(error);
    // }
    datadogRum.addAction("onFinish")
    datadogRum.addError("This is a mocked error")
    throw new Error("This is a mocked error")
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <Link href="/about">About</Link>
      </nav>

      <CustomForm onFinish={onFinish} />
    </div>
  );
}
