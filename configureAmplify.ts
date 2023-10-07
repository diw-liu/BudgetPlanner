import { Amplify } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import awsmobile from './src/aws-exports';
import { BudgetServiceStack } from './src/cdk-exports.json'

const CDKConfig = {
  aws_appsync_graphqlEndpoint: BudgetServiceStack.BudgetAppSync,
  aws_user_pools_id: BudgetServiceStack.BudgetUserpool,
  aws_user_pools_web_client_id: BudgetServiceStack.BudgetApps
}

Amplify.configure({...awsmobile, ...CDKConfig})
Auth.configure({...CDKConfig})