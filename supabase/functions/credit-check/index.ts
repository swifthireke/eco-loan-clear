import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Dummy customer records
const validCustomerIds = [
  "1001234567",
  "1002345678",
  "1003456789",
  "1004567890",
  "1005678901",
  "258841234567",
  "258843456789",
  "258847891234",
];

// Mock data generator
const generateMockData = (customerId: string) => ({
  customerId,
  leverageScore: 72,
  totalOutstanding: 285000,
  activeLoans: 3,
  totalRepaid: 450000,
  loanHistory: [
    {
      id: 1,
      lender: "Airtel Money",
      status: "active",
      disbursedAmount: 150000,
      repaidAmount: 90000,
      outstandingAmount: 60000,
      disbursedDate: "2024-01-15",
      dueDate: "2024-04-15",
    },
    {
      id: 2,
      lender: "TNM Mpamba",
      status: "active",
      disbursedAmount: 200000,
      repaidAmount: 125000,
      outstandingAmount: 75000,
      disbursedDate: "2024-02-01",
      dueDate: "2024-05-01",
    },
    {
      id: 3,
      lender: "Standard Bank",
      status: "active",
      disbursedAmount: 300000,
      repaidAmount: 150000,
      outstandingAmount: 150000,
      disbursedDate: "2024-01-20",
      dueDate: "2024-07-20",
    },
    {
      id: 4,
      lender: "FDH Bank",
      status: "completed",
      disbursedAmount: 100000,
      repaidAmount: 100000,
      outstandingAmount: 0,
      disbursedDate: "2023-10-10",
      dueDate: "2024-01-10",
    },
    {
      id: 5,
      lender: "NBS Bank",
      status: "completed",
      disbursedAmount: 180000,
      repaidAmount: 180000,
      outstandingAmount: 0,
      disbursedDate: "2023-11-05",
      dueDate: "2024-02-05",
    },
  ],
});

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Credit check API called');
    
    const url = new URL(req.url);
    const customerId = url.searchParams.get('customerId');

    console.log('Customer ID:', customerId);

    if (!customerId) {
      return new Response(
        JSON.stringify({ 
          error: 'Customer ID is required',
          message: 'Please provide a customerId query parameter'
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if customer exists in our dummy records
    const customerExists = validCustomerIds.some(
      (id) => id.toLowerCase() === customerId.toLowerCase()
    );

    if (!customerExists) {
      return new Response(
        JSON.stringify({ 
          error: 'Customer not found',
          message: 'No records found for this customer ID'
        }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const mockData = generateMockData(customerId);
    console.log('Returning mock data for customer:', customerId);

    return new Response(
      JSON.stringify(mockData),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in credit-check function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: errorMessage
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
