// ============================================================================
// OAUTH-BASED SALESFORCE CLIENT (No Password Required)
// ============================================================================

import { MetadataProps, ReportProps } from "./pages/reports";

interface SalesforceTokens {
  access_token: string;
  refresh_token?: string;
  instance_url: string;
}

export interface UserReports {
  metadata: MetadataProps[];
  data: Record<string, ReportProps[]>;
}

// ============================================================================
// TOKEN MANAGEMENT
// ============================================================================

export class SalesforceOAuthClient {
  private static storageObject = 'User_Reports__c';

  // Get tokens from environment variables
  static getTokens(): SalesforceTokens {
    const accessToken = process.env.SALESFORCE_ACCESS_TOKEN;
    const instanceUrl = process.env.SALESFORCE_INSTANCE_URL;
    const refreshToken = process.env.SALESFORCE_REFRESH_TOKEN;

    if (!accessToken || !instanceUrl) {
      throw new Error('SALESFORCE_ACCESS_TOKEN and SALESFORCE_INSTANCE_URL must be set in .env.local');
    }

    return {
      access_token: accessToken,
      instance_url: instanceUrl,
      refresh_token: refreshToken,
    };
  }

  // Refresh token and update env file (manual process)
  static async refreshToken(): Promise<SalesforceTokens> {
    const tokens = this.getTokens();

    if (!tokens.refresh_token) {
      throw new Error('No refresh token available');
    }

    const tokenUrl = `https://${process.env.SALESFORCE_DOMAIN || 'login'}.salesforce.com/services/oauth2/token`;
    
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: tokens.refresh_token,
      client_id: process.env.SALESFORCE_CLIENT_ID!,
      client_secret: process.env.SALESFORCE_CLIENT_SECRET!,
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const newTokens = await response.json();

    console.log('\n⚠ Access token refreshed!');
    console.log('Update your .env.local with:');
    console.log('SALESFORCE_ACCESS_TOKEN=' + newTokens.access_token);
    
    return {
      access_token: newTokens.access_token,
      instance_url: newTokens.instance_url,
      refresh_token: tokens.refresh_token, // Preserve original
    };
  }

  // Make authenticated query
  static async query<T = any>(soql: string): Promise<{ records: T[]; totalSize: number }> {
    let tokens = this.getTokens();
    
    let response = await this.makeRequest(
      `${tokens.instance_url}/services/data/v59.0/query?q=${encodeURIComponent(soql)}`,
      tokens.access_token
    );

    // If token expired, try to refresh
    if (response.status === 401 && tokens.refresh_token) {
      console.log('⟳ Token expired, refreshing...');
      const newTokens = await this.refreshToken();
      
      response = await this.makeRequest(
        `${newTokens.instance_url}/services/data/v59.0/query?q=${encodeURIComponent(soql)}`,
        newTokens.access_token
      );
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Query failed: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  private static async makeRequest(url: string, accessToken: string): Promise<Response> {
    return fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
  }

  static async getUserRecord(userId: string) {
    const query = `SELECT Id, Report_List__c, Report_Data__c FROM ${this.storageObject} WHERE User__c = '${userId}' LIMIT 1`;
    const result = await this.query(query);
    return result.records[0] || null;
  }

  static parseUserReports(record: any): UserReports {
    if (!record) {
      return { metadata: [], data: {} };
    }
    console.log(record.Report_List__c)
    return {
      metadata: JSON.parse(record.Report_List__c || '[]'),
      data: JSON.parse(record.Report_Data__c || '{}'),
    };
  }
}