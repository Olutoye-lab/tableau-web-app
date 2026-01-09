// import { SalesforceOAuthClient } from "@/components/sf-client";

//   // File: app/api/auth/callback/route.ts
//   // Handles OAuth callback
  
// export async function GET_AuthCallback(request: Request) {
//     const { searchParams } = new URL(request.url);
//     const code = searchParams.get('code');
//     const error = searchParams.get('error');
  
//     if (error) {
//         return Response.redirect(`/auth/error?error=${error}`);
//     }
  
//     if (!code) {
//         return Response.redirect('/auth/error?error=no_code');
//     }
  
//     try {
//       const client = new SalesforceOAuthClient();
//       const tokens = await client.exchangeCodeForTokens(code);
//       await client.saveTokens(tokens);
      
//       return Response.redirect('/dashboard');
//     } catch (error) {
//       console.error('OAuth callback error:', error);
//       return Response.redirect('/auth/error?error=token_exchange_failed');
//     }
// }

// export { GET_AuthCallback as GET };
