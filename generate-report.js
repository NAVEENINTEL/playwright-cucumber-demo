const reporter = require('cucumber-html-reporter');
const fs = require('fs');

const options = {
  theme: 'bootstrap',
  jsonFile: 'test-report/cucumber_report.json',
  output: 'test-report/cucumber_report.html',
  screenshotsDirectory: 'screenshots/',
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    "App Version":"0.3.2",
    "Test Environment": "STAGING",
    "Browser": "Chrome  54.0.2840.98",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Remote"
    },
    failedSummaryReport: true,
};

const jsonReport = require('./test-report/cucumber_report.json');
const features = jsonReport[0]?.elements || [];

// Extract console logs from each scenario and include them in the report
features.forEach((feature) => {
  feature.steps?.forEach((step) => {
    const featureName = feature.name || 'UnnamedFeature';
    const stepName = step.name || 'UnnamedStep';
    const logFileName = `test-report/logs/${featureName.replace(/\s+/g, '_')}_${stepName.replace(/\s+/g, '_')}_logs.txt`;
    const logs = step.output || [];
    if (logs.length > 0) {
      fs.writeFileSync(logFileName, logs.join('\n'));
    }
    step.embeddings = [
      {
        data: `./logs/${featureName.replace(/\s+/g, '_')}_${stepName.replace(/\s+/g, '_')}_logs.txt`,
        mime_type: 'text/plain',
        extension: '.txt'
      }
    ];
  });
});

reporter.generate(options);
