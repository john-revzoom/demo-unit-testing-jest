import { datadogRum } from '@datadog/browser-rum';
    
datadogRum.init({
    applicationId: '17a4bc98-32a3-48f1-be63-7851c8f0c10d',
    clientToken: 'pub829fc1d9af92936c5180724168185756',
    site: 'datadoghq.com',
    service:'test-app',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel: 'mask-user-input'
});
    
datadogRum.startSessionReplayRecording();