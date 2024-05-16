import 'module-alias/register';
// import dotenv from 'dotenv';
// dotenv.config();

import { ServerApplication } from '@application/ServerApplication';

(async (): Promise<void> => {
  await runApplication();
})();

async function runApplication(): Promise<void> {
  const serverApplication: ServerApplication = ServerApplication.new();
  await serverApplication.run();
}
