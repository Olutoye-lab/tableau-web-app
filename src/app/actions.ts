'use server'
import {  SalesforceOAuthClient, UserReports } from "@/components/sf-client";
import { MetadataProps, ReportProps } from "@/components/pages/reports";
import { cookies } from 'next/headers';

// ============================================================================
// SERVER ACTIONS (with OAuth)
// ============================================================================

/**
 * Get all report metadata for a user
 */
export async function getReportMetadata(userId: string): Promise<MetadataProps[]> {
  try {
    const record = await SalesforceOAuthClient.getUserRecord(userId);
    const reports = SalesforceOAuthClient.parseUserReports(record);
    
    return reports.metadata;
  } catch (error) {
    console.error('Error fetching report metadata:', error);
    throw new Error('Failed to fetch report metadata');
  }
}

/**
 * Get specific report data by report ID
 */
export async function getReportData(userId: string, reportId: string): Promise<ReportProps[] | null> {
  try {
    const record = await SalesforceOAuthClient.getUserRecord(userId);
    const reports = SalesforceOAuthClient.parseUserReports(record);
    
    return reports.data[reportId] || null;
  } catch (error) {
    console.error('Error fetching report data:', error);
    throw new Error('Failed to fetch report data');
  }
}

/**
 * Get all reports (metadata + data) for a user
 */
export async function getAllReports(userId: string): Promise<UserReports> {
  try {
    const record = await SalesforceOAuthClient.getUserRecord(userId);
    
    return SalesforceOAuthClient.parseUserReports(record);
  } catch (error) {
    console.error('Error fetching all reports:', error);
    throw new Error('Failed to fetch all reports');
  }
}

/**
 * Get report with its metadata and data combined
 */
export async function getReportById(userId: string, reportId: string) {
  try {
    const record = await SalesforceOAuthClient.getUserRecord(userId);
    const reports = SalesforceOAuthClient.parseUserReports(record);
    
    const metadata = reports.metadata.find(m => m.report_id === reportId);
    const data = reports.data[reportId];
    
    if (!metadata || !data) {
      return null;
    }
    
    return {
      ...metadata,
      data,
    };
  } catch (error) {
    console.error('Error fetching report:', error);
    throw new Error('Failed to fetch report');
  }
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('sf_tokens');
}
